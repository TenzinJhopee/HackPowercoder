import { measureAgainstSurplus, parseAmount, parseMonth, replayPurchase, type BalancePoint } from "../lib/afford";
import { savingsPlan, type Keepsake } from "../lib/savings-plan";
import { DEFAULT_BRIDGE, DIRECTOR_FAILURE_LINE, FILLER_LINE, FILLER_LINES, type Breakdown, type Script } from "../lib/contracts";
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

// ---------- Main presentation (10 beats) ----------

export const MAIN: Script = [
  {
    say: "This is your 2025, Jeanine: 97,032 francs came in, and each banknote is a hundred francs.",
    scene: { type: "galaxy" },
    figure: { label: "Income in 2025", value: 97032 },
    bridge: "We had just started with your year as a whole."
  },
  {
    say: "Here is every month of spending, twelve columns that together add up to 88,379 francs.",
    scene: { type: "monthly" },
    cues: [{ word: "88,379", figure: { label: "Spent in 2025", value: 88379 } }],
    bridge: "We were looking at your twelve months of spending."
  },
  {
    say: "I see no groceries or cash withdrawals here; do you shop from another account or card?",
    scene: { type: "monthly" },
    cues: [{ word: "groceries" }, { word: "account" }],
    bridge: "I had asked whether these accounts are everything.",
    question: {
      subject: "accounts_complete",
      label: "Other accounts or cards",
      assume: "I treat what's left each month as an upper bound, since some spending may be paid another way.",
      answers: [
        { id: "has_other", label: "Yes, I have another account", kind: "yes", recall: "I see no groceries or cash withdrawals here, and you told me you use another account." },
        { id: "complete", label: "No, this is everything", kind: "no", recall: "I see no groceries or cash withdrawals here, and you told me this account covers everything." }
      ]
    }
  },
  {
    say: "The summer was heavy: June cost 10,365 francs, July 12,363, largely the bike and London.",
    scene: { type: "monthly" },
    cues: [
      { word: "June", target: 6, figure: { label: "June", value: 10365 } },
      { word: "July", target: 7, figure: { label: "July", value: 12363 } }
    ],
    bridge: "We were talking about your summer months."
  },
  {
    say: "Four things took most: housing 22,462 francs, electronics 13,160, travel 12,938 and health 12,335.",
    scene: { type: "pools" },
    cues: [
      { word: "housing", target: "Housing", figure: { label: "Housing", value: 22462 } },
      { word: "electronics", target: "Electronics", figure: { label: "Electronics", value: 13160 } }
    ],
    bridge: "We were looking at where the money went."
  },
  {
    say: "By October you sat 2,720 francs below the start; December's thirteenth salary lifts you to 8,816, otherwise 1,352.",
    scene: { type: "level" },
    cues: [
      { word: "October", target: 10, figure: { label: "October, compared with the start of the year", value: -2720 } },
      { word: "thirteenth", target: "13", figure: { label: "Year end, compared with the start", value: 8816 } }
    ],
    bridge: "We were following the balance of your account."
  },
  {
    say: "In February I don't see your 982 francs health insurance payment; was it paid elsewhere?",
    scene: { type: "monthly", focus: 2 },
    cues: [{ word: "insurance", target: 2, action: "ghost", figure: { label: "Health insurance, usually", value: 982 } }],
    bridge: "We were at the February payment I could not find.",
    question: {
      subject: "missing_payment:Krankenkasse:2025-02",
      label: "February health insurance",
      assume: "I don't count it as missed; February simply shows no payment here.",
      answers: [
        { id: "paid_elsewhere", label: "Yes, from another account", kind: "yes", recall: "February's 982 francs health insurance is not in these accounts; you told me another account paid it." },
        { id: "missed", label: "No, it was missed", kind: "no", recall: "February's 982 francs health insurance is not in these accounts; you told me it was missed." }
      ]
    }
  },
  {
    say: "I see three tax payments, 630 francs in all; is tax taken from your salary or paid elsewhere?",
    scene: { type: "pools" },
    cues: [{ word: "tax", target: "Tax", figure: { label: "Tax paid in 2025", value: 630 } }],
    bridge: "I had asked about your tax payments.",
    question: {
      subject: "tax_provision",
      label: "How tax is paid",
      assume: "I only count the tax payments I can see and never estimate what you owe.",
      answers: [
        { id: "handled_elsewhere", label: "Yes, it is handled elsewhere", kind: "yes", recall: "I see three tax payments, 630 francs in all; you told me your tax is handled elsewhere." },
        { id: "not_yet", label: "No, not yet", kind: "no", recall: "I see three tax payments, 630 francs in all; you told me it is not settled yet." }
      ]
    }
  },
  {
    say: "I also see no pillar 3a payment and no savings transfer this year; do you keep them elsewhere?",
    scene: { type: "jars" },
    cues: [
      { word: "pillar", target: "3a" },
      { word: "savings", target: "Savings" }
    ],
    bridge: "We were looking at what did not start this year.",
    question: {
      subject: "no_pillar_3a",
      label: "Pillar 3a and savings",
      assume: "Until you tell me, I keep the pillar 3a option in the plan.",
      answers: [
        { id: "has_elsewhere", label: "Yes, at another bank", kind: "yes", skipOffer: true, recall: "I see no pillar 3a payment or savings transfer; you told me they are at another bank." },
        { id: "none", label: "No, I have none", kind: "no", recall: "I see no pillar 3a payment or savings transfer; you told me you have none yet." }
      ]
    }
  },
  {
    say: "If you like, 200 francs a month into pillar 3a adds up to 2,400 francs in a year.",
    scene: { type: "jars", focus: "3a" },
    cues: [
      { word: "pillar", target: "3a" },
      { word: "2,400", figure: { label: "In pillar 3a after one year", value: 2400 } }
    ],
    offer: true,
    bridge: "I was about to show you one option."
  }
];

// ---------- Prepared side answers (June, July, September, November) ----------

/** `script` may be built from the question (the affordability answer); every other answer is fixed. */
export type SideAnswer = {
  id: string;
  match(question: string): boolean;
  script: Script | ((question: string) => Script);
  /** Scripts a built answer produces for its fixed example (for voice pre-generation and the number test). */
  examples?: () => Script[];
  /** What stays on screen after the answer (the savings slip), built from the same question. */
  keep?: (question: string) => Keepsake | null;
  /** Short spoken reactions before the answer (rotated); no numbers. */
  lead?: readonly string[];
  /** True when the question asks for more than the fixed answer tells: the live director goes first, this is the fallback. */
  live?: (question: string) => boolean;
};

const asks = (pattern: RegExp) => (question: string) => pattern.test(question.toLocaleLowerCase("en"));

/**
 * A month question the fixed month story does not answer: an amount, a merchant ("at Digitec"), a day, the card bill,
 * a category, saving or what comes next. "Why was June so high?" stays with the fixed story.
 */
const beyondMonthStory = asks(
  /\bhow\s+(much|many|often)\b|(?<!\blook\s)\bat\s+(?!all\b)\w|\bon\s+(the\s+)?\d|\b(between|before|after|until|since|when|compared?|versus|vs|card|bill|statement|budget|forecast|next|subscriptions?|recurring|regular|fixed|sav(e|ing|ings)|cut|afford|refund(s|ed)?|travel|trips?|flights?|cloth(es|ing)|food|restaurants?|rent|insurance|tax(es)?)\b/
);

// ---------- "Can I afford this?" (built from the question; measured against what she kept last year, not a forecast) ----------

/** The chip's fixed example; its lines are pre-generated and its numbers are in facts.json (afford_example). */
export const AFFORD_EXAMPLE = "Can I afford a 3,000 franc laptop?";
export const AFFORD_ASK_AMOUNT_LINE = "How much is it?";
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daily: BalancePoint[] = facts.private_balance_daily.map(([date, balance]) => ({ date, balance }));
const francs = (value: number) => Math.round(Math.abs(value)).toLocaleString("en-US");

/**
 * Two or three beats: the amount against what she kept last year ("in these accounts", since they may not hold all her
 * spending), then, for a named month before December, how low last year's balance would have gone. Consequences only.
 */
export function affordScript(amount: number, month: number | null = null): Script {
  const kept = facts.afford_example;
  if (!kept) return [{ say: AFFORD_ASK_AMOUNT_LINE, scene: { type: "level" } }];
  const m = measureAgainstSurplus(amount, kept);
  const price = francs(amount);
  const perMonth = francs(m.monthlySurplus);
  const ordinaryMonths =
    m.monthsOfSurplus === null ? null : m.monthsOfSurplus < 1 ? "less than one ordinary month" : m.monthsOfSurplus === 1 ? "about one ordinary month" : `about ${m.monthsOfSurplus} ordinary months`;
  const thirteenth = { word: "thirteenth", target: "13" };
  let script: Script;
  if (m.tier === 1) {
    script = [
      { say: `In these accounts you kept about ${perMonth} francs a month last year, without the thirteenth salary.`, scene: { type: "level" } },
      { say: `So ${price} francs is ${ordinaryMonths} of that, and it fits without December's extra salary.`, scene: { type: "level" } }
    ];
  } else if (m.tier === 2) {
    script = [
      ordinaryMonths === null
        ? { say: "In these accounts, ordinary months left nothing over last year; only the thirteenth salary did.", scene: { type: "level" }, cues: [thirteenth] }
        : { say: `In these accounts, ${price} francs is ${ordinaryMonths} of what you kept, ${perMonth} a month.`, scene: { type: "level" } },
      {
        say: `With December's thirteenth salary it is covered, and ${francs(m.leftOfYearNet)} francs of the year's surplus remain.`,
        scene: { type: "level", focus: 12 },
        cues: [thirteenth]
      }
    ];
  } else {
    script = [
      { say: `In these accounts, the whole of last year left you ${francs(kept.yearNet)} francs, thirteenth salary included.`, scene: { type: "level" } },
      { say: `So ${price} francs is ${francs(m.aboveYearNet)} francs more than everything you kept last year.`, scene: { type: "level" } }
    ];
  }
  if (month === null) {
    if (m.tier === 2) script.push({ say: "Bought before December, it would lower your balance until the thirteenth salary arrives.", scene: { type: "level", focus: 12 } });
    return script;
  }
  if (month < 12) {
    const r = replayPurchase(daily, amount, month, facts.card_payment_dates);
    const lowMonth = Number(r.newLowest.date.slice(5, 7));
    const bought = MONTH_NAMES[month - 1];
    if (r.newLowest.balance < 0) {
      script.push({
        say: `Paid in ${bought}, it would have taken last year's balance to ${francs(r.newLowest.balance)} francs below its start by ${MONTH_NAMES[lowMonth - 1]}.`,
        scene: { type: "level", focus: lowMonth },
        cues: [{ word: bought, target: month }, { word: francs(r.newLowest.balance), target: lowMonth, figure: { label: "Lowest point with the purchase, compared with the start", value: Math.round(r.newLowest.balance) } }]
      });
    }
  }
  return script;
}

const affordAnswer: SideAnswer = {
  id: "afford",
  lead: ["Let's test that against your year."],
  examples: () => affordExampleScripts(),
  match: (question) =>
    /\b(afford|can i (buy|spend))\b/i.test(question) || /^\s*(about\s+)?[\d.,'’]+\s*(k|thousand)?\s*(francs?|chf)?\s*[.?!]?\s*$/i.test(question),
  script: (question) => {
    const amount = parseAmount(question);
    if (amount === null) return [{ say: AFFORD_ASK_AMOUNT_LINE, scene: { type: "level" } }];
    return affordScript(amount, parseMonth(question));
  }
};

/** The afford script the fixed example produces (it names no month, so there is one). */
export const affordExampleScripts = (): Script[] => [affordScript(parseAmount(AFFORD_EXAMPLE)!)];

/** The scripts a side answer can play: the fixed one, or the fixed example's. */
export const sideScripts = (answer: SideAnswer): Script[] => (typeof answer.script === "function" ? (answer.examples?.() ?? []) : [answer.script]);

// ---------- "How can I save X a month?" (concrete cuts sized to the target; built from the question) ----------

/** The chip's fixed example; its lines are pre-generated and its numbers are in facts.json (savings.example). */
export const SAVE_EXAMPLE = "How can I save 100 francs a month?";
const SAVE_QUESTION =
  /\b(save|saving|spend\s+less|cut|reduce|lower|put\s+aside|set\s+aside)\b/i;
/** What one purchase is called, singular and plural; other merchants are named as they are. */
const PURCHASE_NAMES: Record<string, [string, string]> = {
  "Kantine AG": ["canteen lunch", "canteen lunches"],
  "Orell Fuessli": ["Orell Fuessli purchase", "Orell Fuessli purchases"]
};
const oneOffs = facts.insights.find((i) => i.id === "one_off_pot")?.figures as { oneOffTotal?: number; purchases?: number } | undefined;

/** A target that is really an amount of money: "3a" and tiny numbers are not. */
function saveTarget(question: string): number | null {
  const amount = parseAmount(question.replace(/\b3a\b/gi, ""));
  return amount !== null && amount >= 20 ? amount : null;
}

const purchaseName = (merchant: string): [string, string] => PURCHASE_NAMES[merchant] ?? [`${merchant} purchase`, `${merchant} purchases`];
/** Subscriptions she could cancel and payments worth comparing, from the recurring payments and the merchant tags (lib/facts.ts). */
const cancellable = facts.savings.cancel ?? [];
const switchable = facts.savings.switch ?? [];
/** Below this a cancellation is called small, plainly. */
const SMALL_MONTHLY = 50;
const capital = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
const cancelName = (merchant: string) => cancellable.find((c) => c.merchant === merchant)?.name ?? merchant;
const planFor = (target: number) => savingsPlan(target, facts.savings.habits, facts.savings.months, facts.savings.excluded, cancellable);

/** The plan the savings answer speaks, with each cut's display name (plural), for the slip that stays on screen. */
export function saveKeepsake(target: number): Keepsake {
  const plan = planFor(target);
  return { kind: "savings", plan, names: plan.cuts.map((cut) => (cut.kind === "cancel" ? `Cancel ${cancelName(cut.merchant)}` : purchaseName(cut.merchant)[1])) };
}

/**
 * One beat per change (a cancellation first, then habit cuts), then the total. When the target is out of reach that
 * is said plainly, then the switch lever (no saving figure), then the big purchases.
 */
export function saveScript(target: number): Script {
  const plan = planFor(target);
  const script: Script = plan.cuts.map((cut) => {
    if (cut.kind === "cancel") {
      const name = cancelName(cut.merchant);
      return {
        say: `Cancelling ${name}, if you rarely use it, saves ${francs(cut.saves)} francs a month${cut.saves < SMALL_MONTHLY ? ": small, but one decision" : ""}.`,
        scene: { type: "pools", focus: cut.group },
        cues: [{ word: name.split(" ")[0], target: cut.group, figure: { label: `Saved a month: cancel ${name}`, value: cut.saves } }]
      };
    }
    const [one, many] = purchaseName(cut.merchant);
    const cueWord = (cut.fewer === 1 ? one : many).split(" ")[0];
    return {
      say: `${cut.fewer} fewer ${cut.fewer === 1 ? one : many} a month, of your usual ${cut.usualPerMonth}, saves about ${francs(cut.saves)} francs.`,
      scene: { type: "pools", focus: cut.group },
      cues: [{ word: cueWord, target: cut.group, figure: { label: `Saved a month: ${one}`, value: cut.saves } }]
    };
  });
  if (plan.cuts.length && plan.shortfall === 0) {
    script.push({
      say: `Together that is about ${francs(plan.monthly)} francs a month, or ${francs(plan.yearly)} over a year.`,
      scene: { type: "pools" },
      cues: [{ word: "month", figure: { label: "Saved a month", value: plan.monthly } }]
    });
    return script;
  }
  script.push({
    say: `These changes give about ${francs(plan.reachable)} francs a month at most, not ${francs(target)}.`,
    scene: { type: "pools" },
    cues: [{ word: "changes", figure: { label: "From these changes, a month", value: plan.reachable } }]
  });
  const compare = switchable[0];
  if (compare) {
    // We do not know market prices: what it costs, never what switching would save.
    script.push({
      say: `Beyond that, your ${compare.name} at ${francs(compare.costsMonthly)} francs a month is worth comparing for a cheaper option.`,
      scene: { type: "pools", focus: compare.group },
      cues: [{ word: compare.name.split(" ")[0], target: compare.group, figure: { label: `${capital(compare.name)} a month`, value: compare.costsMonthly } }]
    });
  }
  if (oneOffs?.oneOffTotal && oneOffs.purchases) {
    script.push({
      say: `The rest would come from big purchases: ${oneOffs.purchases} of them cost ${francs(oneOffs.oneOffTotal)} francs last year.`,
      scene: { type: "monthly" },
      cues: [{ word: "purchases", figure: { label: "Big one-off purchases in 2025", value: Math.round(oneOffs.oneOffTotal) } }]
    });
  }
  return script;
}

/**
 * "How can I save money?": something she could do first, never statistics. The cancel and switch beats are built
 * from facts.savings (the largest subscription, then up to two payments worth comparing, largest first; never a
 * saving figure for a switch), then the repeated habits, then the one option, last.
 */
function saveAdviceScript(): Script {
  const script: Script = [];
  const drop = cancellable[0];
  if (drop) {
    script.push({
      say: `If you rarely use ${drop.name}, cancelling it saves ${francs(drop.savesMonthly)} francs a month, ${francs(drop.savesYearly)} a year${drop.savesMonthly < SMALL_MONTHLY ? ": small, but simple" : ""}.`,
      scene: { type: "pools", focus: drop.group },
      cues: [
        { word: drop.name.split(" ")[0], target: drop.group, figure: { label: `${capital(drop.name)} a month`, value: drop.savesMonthly } },
        { word: francs(drop.savesYearly), figure: { label: `Saved a year: cancel ${drop.name}`, value: drop.savesYearly } }
      ]
    });
  }
  const [first, second] = switchable;
  if (first) {
    const lead = { word: first.name.split(" ")[0], target: first.group, figure: { label: `${capital(first.name)} a month`, value: first.costsMonthly } };
    script.push(
      second
        ? {
            say: `Your ${first.name} costs ${francs(first.costsMonthly)} francs a month, your ${second.name} ${francs(second.costsMonthly)}; comparing offers could lower both.`,
            scene: { type: "pools", focus: first.group },
            cues: [lead, { word: second.name.split(" ")[0], target: second.group, figure: { label: `${capital(second.name)} a month`, value: second.costsMonthly } }]
          }
        : {
            say: `Your ${first.name} costs ${francs(first.costsMonthly)} francs a month; ${first.how} could bring that down.`,
            scene: { type: "pools", focus: first.group },
            cues: [lead]
          }
    );
  }
  script.push(
    {
      say: "You could also cut back a little: the canteen cost 1,616 francs, Orell Fuessli 1,747 this year.",
      scene: { type: "pools", focus: "Food and drink" },
      cues: [
        { word: "canteen", target: "Food and drink", figure: { label: "Canteen in 2025", value: 1616 } },
        { word: "Orell", target: "Online shopping", figure: { label: "Orell Fuessli in 2025", value: 1747 } }
      ]
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
  );
  return script;
}

const saveTargetAnswer: SideAnswer = {
  id: "save-target",
  lead: ["Let's see where that could come from."],
  match: (question) => SAVE_QUESTION.test(question) && saveTarget(question) !== null,
  script: (question) => saveScript(saveTarget(question)!),
  examples: () => [saveScript(saveTarget(SAVE_EXAMPLE)!)],
  keep: (question) => saveKeepsake(saveTarget(question)!)
};

export const SIDE_ANSWERS: SideAnswer[] = [
  affordAnswer,
  saveTargetAnswer,
  {
    id: "june",
    lead: ["Sure, let's look at June.", "June, yes, good question."],
    match: asks(/\bjun(e)?\b/),
    live: beyondMonthStory,
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
        say: "The bike alone took your card past its monthly budget of 3,600 francs.",
        scene: { type: "monthly", focus: 6 },
        cues: [{ word: "card", target: "Bike", figure: { label: "Card budget per month", value: 3600 } }]
      }
    ]
  },
  {
    id: "july",
    lead: ["Sure, let's look at July.", "July, yes, let me show you."],
    match: asks(/\bjul(y)?\b/),
    live: beyondMonthStory,
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
        say: "Then clothing added 1,136 francs, and health insurance 982.",
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
    lead: ["Ah, September, the tall one.", "Good eye, let's look at September."],
    match: asks(/\bsep(t|tember)?\b/),
    live: beyondMonthStory,
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
    lead: ["Sure, let's look at November.", "November, yes, let me show you."],
    match: asks(/\bnov(ember)?\b/),
    live: beyondMonthStory,
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
        say: "The largest part was Apple, with 3,189 francs.",
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
    // Savings advice: a subscription to cancel, payments worth comparing, the habits, then the one option (touch-confirmed).
    id: "save",
    lead: ["Happy to, let's look for room together."],
    match: asks(
      /\bhow\s+(can|could|do|should|would)\s+i\s+(save|spend\s+less|cut|put\s+aside|set\s+aside)|\b(save|saving)\s+(more\s+|some\s+)?money\b|\bwhere\s+(can|could|should)\s+i\s+(cut|save|spend\s+less|reduce)|\bwhat\s+(can|could|should)\s+i\s+do\s+(better|differently)|\b(cut|reduce|lower)\s+(down\s+)?(my\s+)?(spending|costs|expenses)\b|\bspend\s+less\b/
    ),
    script: saveAdviceScript()
  },
  {
    // Habits: what the list hides, what changed, the big one-offs and an honest small item. No offer.
    id: "habits",
    lead: ["Let's look at how you tend to spend."],
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

export { DEFAULT_BRIDGE, DIRECTOR_FAILURE_LINE, FILLER_LINE, FILLER_LINES };
/** Spoken after the touch confirmation of the offer. The demo makes no real payment and says so. */
export const OFFER_CONFIRMED_LINE = "Thank you. This is a demo, so no money has moved.";
/** Spoken in backup mode when a question has no prepared answer. */
export const BACKUP_NO_ANSWER_LINE = "In this mode I only have prepared answers: try June, July, September or November.";
/** Spoken when speech recognition returns nothing usable. */
export const NOT_UNDERSTOOD_LINE = "I did not catch that. Could you ask again?";
/** Spoken when the main presentation ends. */
export const FINISHED_LINE = "That was your year. Ask me about any month, or start over whenever you like.";

/** Said when a side answer ends, handing the choice back (rotated). Skipped after a question or the offer. */
export const CLOSING_LINES = [
  "Does that answer it, or shall I stay here a little longer?",
  "Shall I go on with your year?",
  "Is that clearer now, or shall we dig a little deeper?"
] as const;
/** Said first when the user chooses to continue, before the interrupted beat's bridge (rotated). */
export const REENTRY_LINES = ["Alright, back to your year.", "Good, where were we?", "Okay, let's pick up again."] as const;
/** Said after the Stop button (never the mic), inviting the question (rotated). */
export const INVITE_LINES = ["Yes?", "Go ahead."] as const;

export const FIXED_LINES: string[] = [
  ...FILLER_LINES,
  ...CLOSING_LINES,
  ...REENTRY_LINES,
  ...INVITE_LINES,
  DEFAULT_BRIDGE,
  DIRECTOR_FAILURE_LINE,
  OFFER_CONFIRMED_LINE,
  BACKUP_NO_ANSWER_LINE,
  NOT_UNDERSTOOD_LINE,
  FINISHED_LINE,
  AFFORD_ASK_AMOUNT_LINE
];

/** Every spoken line, deduplicated, in demo order. Used by the pre-generation script and the tests. */
export function allLines(): string[] {
  const lines = [
    ...MAIN.flatMap((beat) => [beat.say, beat.bridge ?? ""]),
    ...SIDE_ANSWERS.flatMap((answer) => [...(answer.lead ?? []), ...sideScripts(answer).flat().map((beat) => beat.say)]),
    ...FIXED_LINES
  ].filter(Boolean);
  return [...new Set(lines)];
}
