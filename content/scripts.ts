import { DEFAULT_BRIDGE, DIRECTOR_FAILURE_LINE, FILLER_LINE, type Breakdown, type Script } from "../lib/contracts";
import type { FactsExport } from "../lib/facts-export";
import rawFacts from "../public/facts.json";

/**
 * The advisor's words (docs/IMPLEMENTATION_PLAN.md section 10).
 *
 * Rules: every number comes from public/facts.json (checked in tests/facts-export.test.ts); `say` is one sentence of at
 * most 18 words with at most 2 cues, cue words appear verbatim and never first; speech says "francs"; calm, no shaming;
 * missing payments are asked, never asserted; one option at most. MAIN deliberately never mentions September (the tallest
 * bar) so that is the natural moment for the audience to interrupt.
 */

const facts = rawFacts as unknown as FactsExport;

/** Breakdown for a month, taken from facts.json so the parts always add up to the month's spending. */
const breakdown = (month: number): Breakdown => ({ month, parts: facts.monthly_breakdown_parts[String(month)] });

// ---------- Main presentation (8 beats) ----------

export const MAIN: Script = [
  {
    say: "This is your 2025, Jeanine: 97,032 francs came in, and each grain is a hundred francs.",
    scene: { type: "galaxy" },
    figure: { label: "Income in 2025", value: 97032 },
    bridge: "Back to the start of your year."
  },
  {
    say: "Here is every month of spending, twelve columns that together add up to 88,379 francs.",
    scene: { type: "monthly" },
    cues: [{ word: "88,379", figure: { label: "Spent in 2025", value: 88379 } }],
    bridge: "Back to the twelve months of spending."
  },
  {
    say: "The summer was heavy: June cost 10,365 francs, July 12,363, largely the bike and London.",
    scene: { type: "monthly" },
    cues: [
      { word: "June", target: 6, figure: { label: "June", value: 10365 } },
      { word: "July", target: 7, figure: { label: "July", value: 12363 } }
    ],
    bridge: "Picking up where we left off: the summer months."
  },
  {
    say: "Four things took most: housing 22,462 francs, electronics 13,160, travel 12,938 and health 12,335.",
    scene: { type: "pools" },
    cues: [
      { word: "housing", target: "Housing", figure: { label: "Housing", value: 22462 } },
      { word: "electronics", target: "Electronics", figure: { label: "Electronics", value: 13160 } }
    ],
    bridge: "Back to where the money went."
  },
  {
    say: "By October you sat 2,720 francs below the start; December's thirteenth salary lifts you to 8,816, otherwise 1,352.",
    scene: { type: "level" },
    cues: [
      { word: "October", target: 10, figure: { label: "October, compared with the start of the year", value: -2720 } },
      { word: "thirteenth", target: "13", figure: { label: "Year end, compared with the start", value: 8816 } }
    ],
    bridge: "Picking up with the balance of your account."
  },
  {
    say: "In February I don't see your 982 francs health insurance payment; was it paid elsewhere?",
    scene: { type: "monthly", focus: 2 },
    cues: [{ word: "insurance", target: 2, action: "ghost", figure: { label: "Health insurance, usually", value: 982 } }],
    bridge: "Back to the February payment."
  },
  {
    say: "I also see no pillar 3a payment and no savings transfer this year; do you keep them elsewhere?",
    scene: { type: "jars" },
    cues: [
      { word: "pillar", target: "3a" },
      { word: "savings", target: "Savings" }
    ],
    bridge: "Back to what never started this year."
  },
  {
    say: "If you like, 200 francs a month into pillar 3a adds up to 2,400 francs in a year.",
    scene: { type: "jars", focus: "3a" },
    cues: [
      { word: "pillar", target: "3a" },
      { word: "2,400", figure: { label: "In pillar 3a after one year", value: 2400 } }
    ],
    offer: true,
    bridge: "Back to the one option I wanted to show you."
  }
];

// ---------- Prepared side answers (June, July, September, November) ----------

export type SideAnswer = { id: string; match(question: string): boolean; script: Script };

const asks = (pattern: RegExp) => (question: string) => pattern.test(question.toLocaleLowerCase("en"));

export const SIDE_ANSWERS: SideAnswer[] = [
  {
    id: "june",
    match: asks(/\bjun(e)?\b/),
    script: [
      {
        say: "Let me open June: the bike alone cost 6,000 francs.",
        scene: { type: "monthly", focus: 6, breakdown: breakdown(6) },
        cues: [
          { word: "open", action: "breakdown" },
          { word: "6,000", target: "Bike", figure: { label: "Bike", value: 6000 } }
        ]
      },
      {
        say: "Rent was 1,820 francs, health insurance 982, and Digitec orders another 742.",
        scene: { type: "monthly", focus: 6 },
        cues: [{ word: "insurance", target: "Health insurance" }, { word: "Digitec", target: "Digitec" }]
      },
      {
        say: "Together that took your card past its monthly budget of 3,600 francs.",
        scene: { type: "monthly", focus: 6 },
        cues: [{ word: "card", figure: { label: "Card budget per month", value: 3600 } }]
      }
    ]
  },
  {
    id: "july",
    match: asks(/\bjul(y)?\b/),
    script: [
      {
        say: "July reached 12,363 francs; let me open the column.",
        scene: { type: "monthly", focus: 7, breakdown: breakdown(7) },
        cues: [
          { word: "12,363", figure: { label: "July", value: 12363 } },
          { word: "open", action: "breakdown" }
        ]
      },
      {
        say: "The bike came to 5,329 francs, and the London trip, hotel included, 1,746.",
        scene: { type: "monthly", focus: 7 },
        cues: [{ word: "bike", target: "Bike" }, { word: "London", target: "London trip" }]
      },
      {
        say: "Then clothing added 1,136 francs, and health insurance 982 as every month.",
        scene: { type: "monthly", focus: 7 },
        cues: [{ word: "clothing", target: "Clothing" }, { word: "insurance", target: "Health insurance" }]
      },
      {
        say: "The London hotel charged 743.20 francs twice on one day; were those two rooms?",
        scene: { type: "monthly", focus: 7 },
        cues: [{ word: "hotel", target: "London trip" }]
      }
    ]
  },
  {
    id: "september",
    match: asks(/\bsep(t|tember)?\b/),
    script: [
      {
        say: "September is your tallest bar at 14,363 francs; let me open it.",
        scene: { type: "monthly", focus: 9, breakdown: breakdown(9) },
        cues: [
          { word: "14,363", figure: { label: "September", value: 14363 } },
          { word: "open", action: "breakdown" }
        ]
      },
      {
        say: "Four plane tickets bought on one day came to 7,458 francs.",
        scene: { type: "monthly", focus: 9 },
        cues: [{ word: "tickets", target: "Plane tickets", figure: { label: "Plane tickets", value: 7458 } }]
      },
      {
        say: "Then Apple added 2,273 francs, rent and electricity 2,030, health insurance 982.",
        scene: { type: "monthly", focus: 9 },
        cues: [{ word: "Apple", target: "Apple" }, { word: "electricity", target: "Rent and electricity" }]
      },
      {
        say: "That is why the card statement came to 10,019 francs, above your monthly card budget of 3,600.",
        scene: { type: "monthly", focus: 9 }
      }
    ]
  },
  {
    id: "november",
    match: asks(/\bnov(ember)?\b/),
    script: [
      {
        say: "November came to 7,390 francs; let me open it.",
        scene: { type: "monthly", focus: 11, breakdown: breakdown(11) },
        cues: [
          { word: "7,390", figure: { label: "November", value: 7390 } },
          { word: "open", action: "breakdown" }
        ]
      },
      {
        say: "Most of it was Apple, with 3,189 francs.",
        scene: { type: "monthly", focus: 11 },
        cues: [{ word: "Apple", target: "Apple", figure: { label: "Apple", value: 3189 } }]
      },
      {
        say: "Rent was 1,820 francs and health insurance 982, as in other months.",
        scene: { type: "monthly", focus: 11 },
        cues: [{ word: "insurance", target: "Health insurance" }]
      }
    ]
  },
  {
    // Savings advice: fixed / adjustable / flexible, the realistic levers, then the one option (touch-confirmed).
    id: "save",
    match: asks(
      /\bhow\s+(can|could|do|should|would)\s+i\s+(save|spend\s+less|cut|put\s+aside|set\s+aside)|\b(save|saving)\s+(more\s+|some\s+)?money\b|\bwhere\s+(can|could|should)\s+i\s+(cut|save|spend\s+less|reduce)|\bwhat\s+(can|could|should)\s+i\s+do\s+(better|differently)|\b(cut|reduce|lower)\s+(down\s+)?(my\s+)?(spending|costs|expenses)\b|\bspend\s+less\b/
    ),
    script: [
      {
        say: "Each month, 3,081 francs are fixed, 297 adjustable and 3,988 flexible.",
        scene: { type: "pools" },
        cues: [
          { word: "fixed", target: "Housing" },
          { word: "flexible", target: "Electronics" }
        ]
      },
      {
        say: "After the fixed costs, 4,383 francs of your salary are left each month.",
        scene: { type: "pools" },
        cues: [{ word: "left", target: "Left over", figure: { label: "Left each month after fixed costs", value: 4383 } }]
      },
      {
        say: "Small levers: the canteen, 1,616 francs, and habits like Orell Fuessli, 1,747 in 24 purchases.",
        scene: { type: "pools" },
        cues: [{ word: "canteen", target: "Food and drink", figure: { label: "Canteen in 2025", value: 1616 } }]
      },
      {
        say: "If you have no 3a yet, 200 francs a month into pillar 3a makes 2,400 in a year.",
        scene: { type: "jars", focus: "3a" },
        cues: [
          { word: "pillar", target: "3a" },
          { word: "2,400", figure: { label: "In pillar 3a after one year", value: 2400 } }
        ],
        offer: true
      }
    ]
  },
  {
    // Habits: what the list hides, what changed, the big one-offs and an honest small item. No offer.
    id: "habits",
    match: asks(
      /\bhabits?\b|\bpatterns?\b|\bwhat\s+do\s+you\s+think\s+(of|about)\s+my\s+(spending|money|finances)\b/
    ),
    script: [
      {
        say: "Abercrombie & Fitch shows 3,397 francs in purchases, but 2,491 came back; the real cost is 906.",
        scene: { type: "pools" },
        cues: [{ word: "real", target: "Clothing", figure: { label: "Abercrombie & Fitch, real cost", value: 906 } }]
      },
      {
        say: "Digitec was a habit: 18 purchases, 4,462 francs, then nothing after June.",
        scene: { type: "pools" },
        cues: [{ word: "habit", target: "Electronics", figure: { label: "Digitec until June", value: 4462 } }]
      },
      {
        say: "Six big one-off purchases cost 24,540 francs; they are behind your tallest months.",
        scene: { type: "monthly" },
        cues: [{ word: "24,540", figure: { label: "Big one-off purchases", value: 24540 } }]
      },
      {
        say: "The canteen is a small item at 1,616 francs, nothing to worry about.",
        scene: { type: "pools" },
        cues: [{ word: "canteen", target: "Food and drink" }]
      }
    ]
  }
];

// ---------- Fixed lines (constants) ----------

export { DEFAULT_BRIDGE, DIRECTOR_FAILURE_LINE, FILLER_LINE };
/** Spoken after the touch confirmation of the offer. The demo makes no real payment and says so. */
export const OFFER_CONFIRMED_LINE = "Thank you. This is a demo, so no money has moved.";
/** Spoken in backup mode when a question has no prepared answer. */
export const BACKUP_NO_ANSWER_LINE = "In this mode I only have prepared answers: try June, July, September or November.";
/** Spoken when speech recognition returns nothing usable. */
export const NOT_UNDERSTOOD_LINE = "I did not catch that. Could you ask again?";
/** Spoken when the main presentation ends. */
export const FINISHED_LINE = "That was your year. Ask me about any month, or start over whenever you like.";

export const FIXED_LINES: string[] = [
  FILLER_LINE,
  DEFAULT_BRIDGE,
  DIRECTOR_FAILURE_LINE,
  OFFER_CONFIRMED_LINE,
  BACKUP_NO_ANSWER_LINE,
  NOT_UNDERSTOOD_LINE,
  FINISHED_LINE
];

/** Every spoken line, deduplicated, in demo order. Used by the pre-generation script and the tests. */
export function allLines(): string[] {
  const lines = [
    ...MAIN.flatMap((beat) => [beat.say, beat.bridge ?? ""]),
    ...SIDE_ANSWERS.flatMap((answer) => answer.script.map((beat) => beat.say)),
    ...FIXED_LINES
  ].filter(Boolean);
  return [...new Set(lines)];
}
