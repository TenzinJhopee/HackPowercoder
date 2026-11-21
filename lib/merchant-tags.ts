/**
 * Merchant tags: tag the merchant once, every transaction inherits it.
 *
 * necessity — how much choice the user has:
 *   compulsory    obligations (rent, health insurance, tax, energy)
 *   reducible     needed, but the amount can come down (canteen, fuel, phone, streaming)
 *   discretionary free choice (shopping, travel, hobbies)
 * Toward the user these read as "fixed / adjustable / flexible", never "unnecessary".
 *
 * group — the spending pool shown in scenes (finer than `category`, which is keyword-guessed).
 *
 * Seeded rules below were written from Jeanine's 2025 data and are meant to be reviewed;
 * user corrections are stored with source "manual" and win over rules.
 */
export const necessities = ["compulsory", "reducible", "discretionary"] as const;
export type Necessity = (typeof necessities)[number];

export const spendingGroups = [
  "Housing", "Electronics", "Travel", "Health", "Bike", "Online shopping", "Clothing", "Transport", "Food and drink", "Tax", "Other"
] as const;
export type SpendingGroup = (typeof spendingGroups)[number];

export interface MerchantTag {
  merchant: string;
  necessity: Necessity;
  group: SpendingGroup;
  source: "rule" | "manual" | "fallback";
  /** One line the agent can use to explain the tag. */
  reason: string;
  /** Set when the tag is uncertain: the agent asks this instead of asserting. */
  askUser?: string;
}

/** The only user-facing wording for necessity; the model must not invent its own. */
export const necessityLabels: Record<Necessity, string> = {
  compulsory: "fixed",
  reducible: "adjustable",
  discretionary: "flexible"
};

/** Group keys are already the display names (the plan's category map). */
export const groupLabels: Record<SpendingGroup, string> = Object.fromEntries(spendingGroups.map((group) => [group, group])) as Record<SpendingGroup, string>;

const defaultReasons: Record<Necessity, string> = {
  compulsory: "An obligation; the amount can't be changed in the short term.",
  reducible: "Needed, but the amount can come down.",
  discretionary: "The user's free choice."
};

type Rule = [Necessity, SpendingGroup, { reason?: string; askUser?: string }?];

const rules: Record<string, Rule> = {
  // compulsory
  "Rent": ["compulsory", "Housing", { reason: "Monthly rent." }],
  "BKW": ["compulsory", "Housing", { reason: "Electricity bill." }],
  "Krankenkasse": ["compulsory", "Health", { reason: "Mandatory health insurance premium." }],
  "Hügi Optik": ["compulsory", "Health", { reason: "Glasses; a health expense." }],
  "Steuerverwaltung": ["compulsory", "Tax", { reason: "Tax payment." }],
  "Bundesamts für Zoll und Grenzsicherheit (BAZG)": ["compulsory", "Transport", { reason: "Customs fee." }],
  "Libero-Tarifverbund": ["compulsory", "Transport", { reason: "Annual public transport pass.", askUser: "Do you use the Libero pass for commuting to work?" }],
  // reducible
  "Kantine AG": ["reducible", "Food and drink", { reason: "Lunch at work; needed, but the amount is flexible." }],
  "Coop Tankstelle Talgut Zentrum": ["reducible", "Transport"],
  "SBB CFF FSS Ticket Shop": ["reducible", "Transport"],
  "Schweizerische Bundesbahnen": ["reducible", "Transport"],
  "Taxi": ["reducible", "Travel"],
  "Mobile Provider": ["reducible", "Electronics"],
  "Netflix": ["reducible", "Electronics"],
  "Spotify": ["reducible", "Electronics"],
  "Teleboy": ["reducible", "Electronics"],
  "iTunes.com": ["reducible", "Electronics"],
  "Microsoft": ["reducible", "Electronics"],
  // discretionary: travel
  "Swiss Intl. Airlines": ["discretionary", "Travel"],
  "SWISS International Airlines": ["discretionary", "Travel"],
  "Lufthansa Köln": ["discretionary", "Travel"],
  "Mondrian London": ["discretionary", "Travel"],
  "Mandarin Oriental, Las Vegas": ["discretionary", "Travel"],
  "Yellowstone": ["discretionary", "Travel"],
  "AirBnB": ["discretionary", "Travel"],
  "Hotel Waldhof": ["discretionary", "Travel"],
  "VisitBritain Shop": ["discretionary", "Travel"],
  "La Salle, Terminal 2": ["discretionary", "Travel"],
  "WH Smith Travel, Heathrow T2": ["discretionary", "Travel"],
  // discretionary: electronics
  "Apple Online Store": ["discretionary", "Electronics"],
  "Digitec Galaxus": ["discretionary", "Electronics"],
  "Galaxus AG": ["discretionary", "Electronics"],
  "Mediamarkt AG": ["discretionary", "Electronics"],
  "Mouser Electronics": ["discretionary", "Electronics"],
  "Omni Development Inc": ["discretionary", "Travel"],
  // discretionary: bike & sport
  "Veloshop": ["discretionary", "Bike"],
  "Mika Timing GmbH": ["discretionary", "Other"],
  "www.ochsner-sport.ch": ["discretionary", "Clothing"],
  // discretionary: clothing
  "Abercrombie & Fitch": ["discretionary", "Clothing"],
  "Tommy Hilfiger": ["discretionary", "Clothing"],
  "H&M": ["discretionary", "Clothing"],
  "Superdry.com": ["discretionary", "Clothing"],
  "Zalando": ["discretionary", "Clothing"],
  "Nike.com": ["discretionary", "Clothing"],
  "Manor AG": ["discretionary", "Clothing"],
  "Globus": ["discretionary", "Clothing"],
  "Companys Retail AG": ["discretionary", "Clothing"],
  "Tally Weijl": ["discretionary", "Clothing"],
  "Mango": ["discretionary", "Clothing"],
  "s.Oliver.com": ["discretionary", "Clothing"],
  // discretionary: online shopping
  "Amazon": ["discretionary", "Online shopping"],
  "Amazon.com": ["discretionary", "Online shopping"],
  "Paypal": ["discretionary", "Online shopping"],
  "Cairo.de": ["discretionary", "Online shopping"],
  "Unitedprint": ["discretionary", "Online shopping"],
  "shop.heinigerag.ch": ["discretionary", "Clothing"],
  "www.post.ch": ["discretionary", "Online shopping"],
  // discretionary: food & leisure
  "Ristorante Luce": ["discretionary", "Food and drink"],
  "Ristorante & Pizzeria Da Rasso": ["discretionary", "Food and drink"],
  "Pizzeria & Grill, Samedan": ["discretionary", "Food and drink"],
  "Molino Zürich": ["discretionary", "Food and drink"],
  "Carlton Zürich Agloft": ["discretionary", "Food and drink"],
  "Orell Fuessli": ["discretionary", "Online shopping"],
  "Orell Füssli": ["discretionary", "Online shopping"],
  "Gurten Festival": ["discretionary", "Other"],
  "petcenter.ch": ["discretionary", "Online shopping"]
};

export function ruleTags(): MerchantTag[] {
  return Object.entries(rules).map(([merchant, [necessity, group, extra]]) => ({
    merchant,
    necessity,
    group,
    source: "rule",
    reason: extra?.reason ?? defaultReasons[necessity],
    askUser: extra?.askUser
  }));
}

/** Untagged merchant: treated as flexible "Other" and reported as unreviewed, never silently guessed as compulsory. */
export function fallbackTag(merchant: string): MerchantTag {
  return { merchant, necessity: "discretionary", group: "Other", source: "fallback", reason: "Not tagged yet.", askUser: `What was the spending at ${merchant} for?` };
}
