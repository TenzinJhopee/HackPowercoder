# Implementation Plan: Voice Finance Advisor ("Interrupt, ask, continue")

**Audience:** Claude Code (and the 5-person team driving it).
**Goal:** Turn the single-file HTML prototype into a working hackathon demo in 8 hours.
**Reference prototype:** the "Interrupt, ask, continue" artifact (English) and "Every grain is 100 francs". Treat the prototype HTML as the reference implementation: copy its algorithms, not its single-file structure.

Read this whole file before writing code. Sections 3 and 4 are contracts: freeze them in the first 45 minutes and do not change them without telling the whole team.

---

## 0. What we are building

A bank app feature where a **voice advisor** presents the customer's year (Jeanine, 2025, two accounts, about 500 transactions) and the screen acts as its whiteboard:

1. **Shows what happened:** 500 transactions reduced to a few big decisions.
2. **Shows what is missing:** payments that never happened (no pillar 3a, no savings, a missing insurance payment). This is the differentiator.
3. **Gives insight and one option**, confirmed by touch, never by voice.
4. **Can be interrupted:** the user asks "Wait, why is September so high?", the advisor answers from the current screen without resetting, then resumes where it stopped when the user says "OK, let's continue".

Visual language: **one living world of grains, each grain = CHF 100.** Scenes rearrange the same grains; there are no cuts.

---

## 1. Stack and repo layout

- **Frontend:** Vite + TypeScript, no UI framework required. Canvas 2D for the grain world, plain DOM for captions, chips and controls.
- **Backend:** Node 22 + Hono (or Express). Only two jobs: proxy ElevenLabs and Claude so no API key reaches the browser, and serve `facts.json` and cached audio.
- **Data pipeline:** Python 3 + pandas (or TS). Runs once, writes `facts.json`.
- **Env vars:** `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`, `ANTHROPIC_API_KEY`, `CLAUDE_MODEL` (default `claude-sonnet-5-5`; switch to `claude-haiku-5-5` if side answers are too slow).

```
/data/raw/                      # the two CSVs (do not commit if the organisers say so)
/pipeline/build_facts.py        # CSV -> facts.json
/pipeline/test_facts.py         # asserts the known numbers (section 5)
/server/index.ts                # /api/tts, /api/director, /api/facts, /audio/*
/server/prompts.ts              # director prompts (section 9)
/web/src/contracts.ts           # section 3 types, shared by everyone
/web/src/world/engine.ts        # grains, motion, camera, render loop
/web/src/world/scenes/*.ts      # one file per scene
/web/src/player/player.ts       # beats, cues, captions, figure counter
/web/src/player/voice.ts        # ElevenLabs playback + word timings, fallbacks
/web/src/conversation/state.ts  # state machine, snapshot/restore, intents
/web/src/conversation/scripts.ts# MAIN presentation + prepared side answers
/web/src/ui/*.ts                # shell, chips, stop button, offer card, script panel
/web/public/audio/              # pre-generated audio + timings for prepared scripts
CONTRACTS.md                    # copy of sections 3-4, the team's single source of truth
```

---

## 2. Team split (5 people, each with a coding agent)

| # | Owner of | Folders |
|---|---|---|
| 1 | Data and facts | `/pipeline`, `facts.json` |
| 2 | Grain world and scenes | `/web/src/world` |
| 3 | Voice, player, director | `/web/src/player`, `/server` |
| 4 | Conversation state, UI shell, integration, backup mode | `/web/src/conversation`, `/web/src/ui` |
| 5 | Scripts, tone, tests, demo, pitch, backup video | `scripts.ts`, `/docs`, rehearsal |

Each person works only in their folders. Everyone imports types from `contracts.ts`.

---

## 3. Contracts (freeze in the first 45 minutes)

### 3.1 Script (what the advisor says and shows)

```ts
type Figure = { label: string; value: number };              // the big number on screen

type Cue = {
  word: string;            // must appear verbatim in `say`, never its first word
  target?: string | number;// scene-specific: category name, month 1-12, part name, "3a", "13"
  action?: "breakdown";    // open the current month's column into parts
  figure?: Figure;         // the big number changes at this word
};

type Breakdown = { month: number; parts: { name: string; value: number; aliases?: string[] }[] };

type Beat = {
  say: string;                                  // one sentence, max 18 words
  scene?: { type: SceneType; focus?: string | number; breakdown?: Breakdown };
  figure?: Figure;
  cues?: Cue[];                                 // max 2 per beat
  offer?: boolean;                              // show the touch-to-confirm card
  bridge?: string;                              // main beats only: said when resuming here
};

type Script = Beat[];
type SceneType = "galaxy" | "river" | "pools" | "travel" | "jars" | "level" | "monthly";
```

Rules:
- Every number in a script comes from `facts.json`. The model never computes; it calls the `total` tool.
- A cue fires at the **measured start time of its word** (section 7). Without timings, the player estimates.
- Wording: say "francs" in speech; captions write 14,363; the big number on screen uses Swiss format 14'363.

### 3.2 Scene interface

```ts
interface Scene {
  type: SceneType;
  enter(prev: SceneType | null): void;     // retarget grains from their current positions
  relayout(): void;                         // on resize: re-enter and re-apply focus/breakdown
  focus(target: string | number): void;    // camera + dim others; unknown target = no-op
  unfocus(): void;                          // back to the scene's neutral view (keeps breakdown open)
  breakdown?(b: Breakdown): void;           // monthly only; idempotent for the same month
  collapse?(): void;                        // monthly only; parts fly back into the column
  drawUnder?(ctx: CanvasRenderingContext2D, now: number): void;
  drawOver?(ctx: CanvasRenderingContext2D, now: number): void;   // labels, jars, axes
  currentFocus(): string | number | null;  // used by snapshot
  aria: string;                             // canvas aria-label for this scene
}
```

### 3.3 Conversation states

```
idle -> presenting -> (interrupt) -> listening -> side -> waiting -> returning -> presenting -> finished
                         ^                         |                     |
                         |---- "continue" ---------+---------------------+
```

| State | Entered when | UI |
|---|---|---|
| `idle` | page load | chip "Start the presentation" |
| `presenting` | main script plays | Stop button, interrupt chips |
| `listening` | Stop pressed, mic opened, or "wait" | input focused, suggested questions, "OK, let's continue" |
| `side` | a question is being answered | "OK, let's continue" (skips the side answer) |
| `waiting` | side answer finished | "OK, let's continue", "One more question" |
| `returning` | restoring and speaking the bridge | Stop button |
| `finished` | main script ended | "Start over" |

### 3.4 Snapshot (saved at the moment of interruption)

```ts
type Snapshot = {
  scene: SceneType;
  focus: string | number | null;
  figure: Figure;
  mainIndex: number;        // which main beat was interrupted
  sentence: string;         // its text (sent to the director as context)
  wordsSpoken: number;      // for display and analytics only
};
```

Depth limit is one: a question asked inside a side answer starts a new side answer but keeps the **original** snapshot.

---

## 4. Facts file (`facts.json`)

Produced by the pipeline, read by the frontend and sent to the director. Keys (English):

```
year, currency, salary_monthly, payday, yearly_income_incl_13th_salary,
year_end_net_vs_start, without_13th_salary,
categories_yearly_net_of_refunds {Housing, Electronics, Travel, Health, Bike, Online shopping, Clothing, Transport, Food and drink, Tax},
travel_breakdown {USA_approx, London_July, Copenhagen_May, London_Cologne_April, Other},
month_end_balance_vs_start_jan_dec [12],
monthly_spending_jan_dec [12],
card_bill_jan_dec [12],
monthly_breakdown_by_category {"1": {...}, ..., "12": {...}},
notable_items {"9": ["18 September four plane tickets 7458", "Apple 2273"], ...},
gaps [...], refunds {...}
```

---

## 5. Module 1: data pipeline (owner 1)

Steps:
1. Load both CSVs. Use `base_amount` (CHF).
2. **Drop transfers from spending.** The card payment appears in both files (`type == "transfer"`); counting it double-counts spending.
3. Net refunds: `income` rows from shops are refunds; subtract them from the shop's spending (e.g. Abercrombie 3'397 bought, 2'491 refunded, net 906).
4. Exclude salary (`Employer AG`) from spending.
5. Categorise by counterparty with the regex map from the prototype (Housing: `Rent|BKW`; Health: `Krankenkasse|Hügi`; Travel: `Swiss|SWISS|Lufthansa|AirBnB|Mondrian|Mandarin|Yellowstone|Waldhof|VisitBritain|Heathrow|La Salle|Taxi|Omni`; Bike: `Veloshop`; Electronics: `Apple|Digitec|Galaxus|Microsoft|Mediamarkt|Mouser|iTunes|Teleboy|Spotify|Netflix|Mobile`; Clothing: `Abercrombie|Tommy|H&M|Zalando|Superdry|Nike|Mango|Oliver|Tally|Companys|Manor|Globus|ochsner|heiniger`; Food and drink: `Kantine|Ristorante|Pizzeria|Molino|Carlton`; Transport: `Libero|Tankstelle|Bundesbahnen|SBB|BAZG`; Online shopping: `Amazon|Paypal|Cairo|Unitedprint|post\.ch|petcenter|Orell`; Tax: `Steuer`; everything else Other). Flag this map as rough in the README.
6. EUR rows carry `exchange_rate = 1.0`. Keep as-is for the demo and note it.
7. Balance: cumulative signed sum on the private account (income +, expenses and card payment −), month-end values relative to 1 January.
8. Gap detection: a recurring monthly payment missing in a month (health insurance in February); categories that never occur (pillar 3a, savings transfer); tax paid far below expectation.

**Acceptance (`test_facts.py` must pass):**

| Check | Expected |
|---|---|
| yearly income incl. 13th salary | 97'032 |
| year-end net vs. start | 8'816 |
| without 13th salary | 1'352 |
| month-end balance, September | −5'640 |
| monthly spending Jan–Dec | 5994, 7063, 6028, 6626, 6435, 10365, 12363, 4565, 14363, 3845, 7390, 3342 |
| total spending | 88'379 |
| Housing / Electronics / Travel / Health / Bike | 22'462 / 13'160 / 12'938 / 12'335 / 11'523 |
| September breakdown | Plane tickets 7'458, Apple 2'273, Rent and electricity 2'030, Health insurance 982, Other 1'620 |
| July breakdown | Bike 5'329, Rent 1'820, London trip 1'746, Clothing 1'136, Health insurance 982, Other 1'350 |
| Abercrombie net | 906 |
| February health insurance | missing |

---

## 6. Module 2: grain world and scenes (owner 2)

### 6.1 Engine (port from the prototype)

- ~971 grains, one per CHF 100 of the year's money: categories by `round(value/100)` plus "Left over" (8'816 → 88 grains).
- Grain state: position, start, bezier control point, target, start time, duration, colour from/to, alpha from/to, radius from/to, dim multiplier, optional `orbit` (galaxy rotation) or `flow` (jars stream).
- `moveTo(g, x, y, opts)`: quadratic bezier from the current position, cubic in-out easing, per-grain delay, optional late colour change (river: grains turn their category colour on arrival).
- Camera: `{x, y, s}` eased toward a target every frame; `focus` = centre on a point and zoom (1.0–2.6). Screen anchor is the centre of the area below the big number.
- Render: clear, `scene.drawUnder`, grains (skip alpha < 0.01 and off-screen), `scene.drawOver`. Cap DPR at 2.
- `prefers-reduced-motion`: durations ×0.25, no delays, no rotation.
- Use a **seeded RNG** for anything visible (needed later to record the backup video).

### 6.2 Layout helpers

- Phyllotaxis cluster: `angle = k·2.39996`, `r = c·√(k+0.5)`.
- Greedy circle packing with label gap, then fit into a region by lowering `c` from max to min until the bounding box fits.
- `pick(list, text)`: case-insensitive match on name and aliases (both directions). Do not use aliases shorter than 3 letters that appear inside common words (the prototype had a bug with "ev" matching "devam").

### 6.3 Scenes

| Scene | Layout | `focus(target)` | Notes |
|---|---|---|---|
| galaxy | all grains in one rotating phyllotaxis disc | ripple ring | opening scene |
| river | same targets as pools, grains spawn at a source top-right in 13 waves (one per salary) | as pools | labels fade in after ~4.5 s |
| pools | one organic cluster per category, packed | category name or alias | "Left over" is green |
| travel | travel grains split into trips; all others become faint dust | trip name | USA ≈ 8'000 |
| jars | all grains flow down a central band; two jars (Pillar 3a, Savings) stay empty, dashed coral outline | jar name: zoom + pulse | `fill()` drops 24 green grains into the 3a jar after touch confirm |
| level | 12 columns of balance grains, green above the start-of-year line, coral below; December's 13th salary in paper colour | month 1–12, or "13": salary grains fly out | |
| monthly | 12 columns of spending grains (4 per row) | month 1–12; or, while a breakdown is open, a part name | `breakdown(b)`: grains of that column fly into part clusters beside it (left side for July–December), other columns dim to 0.1, a dashed ghost outline stays where the column was. Part grain counts use largest remainder so they sum to the column. `collapse()`: back into the column |

**Acceptance:** every scene can be entered from every other scene without a reset or jump; resizing re-lays out without losing focus or breakdown; 60 fps on a mid-range phone.

---

## 7. Module 3: voice and player (owner 3)

### 7.1 Player

- For each beat: reset focus if the beat stays in the same scene and has no `focus`; enter the scene; open a breakdown immediately unless a cue has `action: "breakdown"`; apply `focus`; set the figure; show the offer card if `offer`.
- Captions: one span per word; spoken words turn from grey to paper colour; cue words turn amber.
- Figure: count from the old to the new value in about 1.1 s, ease-out cubic.
- Every async flow carries a `run` token. Any interruption increments `run`; every `await` re-checks it and stops if it changed. This is what makes interrupting safe.

### 7.2 ElevenLabs

- Server endpoint `/api/tts` calls `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/with-timestamps` (use `/stream/with-timestamps` for live side answers to cut latency).
- Response: base64 audio plus `alignment.characters`, `alignment.character_start_times_seconds`, `character_end_times_seconds`. Also `normalized_alignment`; **use `alignment`** (the original text) because cue words are taken from the original text; the normalised one spells numbers out.
- Character → word: group characters by whitespace; a word's start time is its first character's start time. Match cue words case-insensitively after stripping punctuation and apostrophes.
- Playback: `<audio>`; a `requestAnimationFrame` loop compares `audio.currentTime` to word start times; lead elements that must be read by 0.02–0.06 s; fire hits exactly on the word.
- Stop: `audio.pause()`, mark the line as over.
- **Pre-generate** audio and timings for every prepared beat (main script, prepared side answers, bridges, filler "Let me check.") with a script into `/web/public/audio/{hash}.mp3|json`. The demo must not depend on the network for prepared content.
- Fallbacks in order: browser `speechSynthesis` with `onboundary` word events; then a silent clock at ~60 ms per character (digits weighted ×3.5). The prototype implements all three; port them.
- Test pronunciation of "francs", "pillar 3a", "Copenhagen" with the chosen voice before the demo.

---

## 8. Module 4: conversation and UI (owner 4)

### 8.1 Interrupt and resume (port from the prototype)

```ts
function interrupt() {
  if (mode === "presenting" || mode === "returning") snap = snapshot();
  if (mode === "presenting" || mode === "returning" || mode === "side") {
    run++; voice.stop(); currentLine.over = true; setMode("listening");
  }
}

async function resume() {
  if (!snap) return playMain(mode === "finished" || mode === "idle" ? 0 : mainIndex);
  const my = ++run; voice.stop(); const s = snap; snap = null; setMode("returning");
  restore(s);                                   // scene, collapse breakdown, focus, figure
  if (!await speak({ say: MAIN[s.mainIndex].bridge ?? "Where were we." }, my)) return;
  playMain(s.mainIndex);                        // replay the interrupted beat from its start
}

function restore(s: Snapshot) {
  if (world.scene.type !== s.scene) world.enter(s.scene); else world.scene.collapse?.();
  s.focus != null ? world.scene.focus(s.focus) : world.scene.unfocus();
  figure.set(s.figure);
}
```

### 8.2 Side answer

1. Interrupt (if not already listening).
2. **Fast path, before any model call:** find a month or category in the question; "this month / that bar" means the current focus. If the current scene shows it, focus it immediately.
3. If a prepared side answer exists (June, July, September), play it.
4. Otherwise speak the filler "Let me check." while calling `/api/director` with the question and the screen context (section 9). Validate the result (section 9.3). On failure say one short sentence and go to `waiting`.
5. When the side answer ends: `waiting`.

### 8.3 Intent classification (rules first, model only if needed)

```ts
const isQuestion = /\?/.test(t) || monthIn(t) >= 0 || categoryIn(t) || /\b(why|how|what|which|when|explain)\b/.test(t);
if (!isQuestion && /\b(continue|go on|carry on|ok|okay|sure|got it|yes|resume|keep going)\b/.test(t)) return "continue";
if (!isQuestion && /(one more|another question|i have a question|^wait|^stop$|hold on)/.test(t)) return "wait";
if (!isQuestion && /^(enough|end|quit|that'?s all|finish)/.test(t)) return "end";
return "question";
```
Lowercase with `toLocaleLowerCase('en')` (with `'tr'` an English "I" becomes a dotless "ı").

### 8.4 Listening

- Default: push-to-talk. The Stop button and the mic button both call `interrupt()` first.
- STT: browser `SpeechRecognition` (Chrome) with interim results, or any STT with partial results. Always-on listening needs echo cancellation, because the advisor's own voice can trigger it: do not ship it for the demo.

### 8.5 UI shell

- Layout top to bottom: status + Sound + Script buttons; step bar (amber for main, green for side answers); stage (canvas + big number + "1 grain = CHF 100"; while paused, a green pill "↩ Paused at 3/8"); caption; chips; input row (text, mic, Stop, Ask); a fine-print line showing whether live answers, voice and mic are available.
- **Caption height is fixed at three lines.** In the prototype a growing caption resized the stage and re-laid out the whole scene mid-sentence.
- Offer card: "CHF 200 a month, into pillar 3a", "Tap to confirm". Money moves are confirmed by touch only; on confirm call `jars.fill()` and set figure "In pillar 3a after one year: 2'400". The demo makes no real payment and says so.
- Script panel: shows the saved snapshot and the playing script as JSON (useful for the jury).

---

## 9. Director (LLM) (owner 3)

### 9.1 Endpoint

`POST /api/director {question, screen, mode: "side" | "answer"}` → `{script}`. The server calls Claude with the prompt below and one tool:

```json
{"name":"total","description":"Adds up the chosen months of a series. Use it whenever you need a total.",
 "input_schema":{"type":"object","properties":{"series":{"type":"string","enum":["monthly_spending","card_bill"]},
 "months":{"type":"array","items":{"type":"integer","minimum":1,"maximum":12}}},"required":["series","months"]}}
```

### 9.2 Side-answer prompt (port verbatim from the prototype, then tune)

- You are the voice of a bank's personal finance advisor speaking English with Jeanine.
- She interrupted the presentation. Do not go back to the start: continue from SCREEN.
- Answer in 2–4 steps using only FACTS. Do not ask "shall we continue"; the UI does.
- The first step's `scene.type` must be the current scene.
- Scene and target vocabulary (section 6.3); breakdown rules (max 5 parts, values from `monthly_breakdown_by_category` and `notable_items`, never more than the month's total, opened by a cue with `action: "breakdown"`).
- `say` ≤ 18 words, says "francs", writes 7,458; 1–2 cues per step, cue word verbatim and not first; no product advice.
- Return only `{"script":[...]}`.
- SCREEN = `{scene, focus, last_sentence, visible: <the data the scene shows>, open_bar}`; FACTS = `facts.json`; QUESTION.

### 9.3 Validation (never trust the model's JSON)

- Max 5 beats; drop beats without `say`; truncate `say` to 260 chars.
- Unknown `scene.type` → keep the current scene.
- Breakdown: month 1–12; parts with a name and value > 0; drop it if the sum exceeds the month total by more than 3 %; add "Other" if the remainder is ≥ 100.
- Cues: max 2, `word` non-empty; drop cues whose word is not in `say` (if at least one cue matches).
- On any failure: one short sentence ("I could not put an answer together right now.") and go to `waiting`.

---

## 10. Scripts (owner 5)

Port `MAIN` (8 beats), the prepared side answers for June, July and September, and their bridges from the prototype unchanged as the starting point. The main script deliberately mentions June, July, October and December but **not September**, which is the tallest bar: that is the natural moment for the jury to interrupt.

Tone and truth rules:
- Calm and trustworthy. No glitch, bounce or elastic motion; no shaming language.
- Something missing may be paid from another account: the advisor asks, it does not accuse.
- One option at most, confirmed by touch. No product advice.
- Never a number that is not in `facts.json`.
- Variety: no cue effect twice in a row; a surprise every 10–15 s.

---

## 11. Milestones

| Time | Milestone | Done when |
|---|---|---|
| 0:00–0:45 | Contracts frozen | `contracts.ts`, `CONTRACTS.md`, `facts.json` stub, MAIN script text agreed |
| 0:45–2:00 | Parts on mock data | each module runs alone against the stub |
| **2:00** | **First end-to-end moment** | one main beat is spoken by ElevenLabs and its cue zooms a real column |
| 2:00–4:00 | Full main presentation | all 8 beats with pre-generated audio |
| 4:00–5:30 | Interrupt flow | September question → breakdown → continue → bridge, all with audio |
| 5:30–6:00 | Live side answers | one unprepared question works end to end |
| **6:00** | **Feature freeze** | bug fixes only |
| 6:00–7:00 | Rehearsal + backup video | backup mode plays the whole demo with no network |
| 7:00–8:00 | Pitch rehearsal | |

---

## 12. Backup mode and demo safety

- `?backup=1`: everything from pre-generated audio; live side answers replaced by the prepared ones; no network calls.
- If audio fails: captions plus the silent clock still drive cues.
- Record a backup video of the full demo (deterministic rendering with the seeded RNG; frame = function of time if rendering offline).
- Demo checklist: phone in Do Not Disturb, volume set, close-talk mic, Chrome, cache warmed, backup URL open in a second tab.

---

## 13. Acceptance test (run before the freeze)

1. Load → galaxy, figure 97'032, chip "Start the presentation".
2. Start → beat 2 sorts grains into 12 columns; beat 3 zooms June then July exactly on the spoken words.
3. Tap "Wait, why is September so high?" → voice stops within 150 ms, camera reaches September before any new speech, pill shows "↩ Paused at 3/8".
4. On "open" the column splits into five clusters; on "tickets" the figure shows 7'458.
5. Side answer ends → status "Shall we continue?".
6. "OK, let's continue" → parts fly back, camera returns to July focus, figure 12'363, bridge "Picking up where we left off: the summer months.", beat 3 replays, presentation continues to the offer card.
7. Ask "Why was November high?" during beat 2 → filler, live side answer opens November's column, continue works.
8. Tap the offer → 24 green grains fall into the 3a jar, figure 2'400.
9. Resize the window at any point → no reset, focus kept.
10. Turn off the network with `?backup=1` → steps 1–6 still work.

---

## 14. Out of scope for the hackathon

Login, real payments, a database, multi-user, a second language, always-on listening, the "My file" memory (stretch only: store answers like "3a is at another bank" so the advisor never asks twice), lighthouse, UV and Isotype scenes (stretch).
