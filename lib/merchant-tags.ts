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
  "housing", "health", "tax", "transport", "travel", "electronics", "bike", "clothing",
  "online", "food", "books", "subscriptions", "leisure", "other"
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

export const groupLabels: Record<SpendingGroup, string> = {
  housing: "Housing", health: "Health", tax: "Tax", transport: "Transport", travel: "Travel",
  electronics: "Electronics", bike: "Cycling", clothing: "Clothing", online: "Online shopping",
  food: "Food & drink", books: "Books", subscriptions: "Subscriptions", leisure: "Leisure", other: "Other"
};

const defaultReasons: Record<Necessity, string> = {
  compulsory: "An obligation; the amount can't be changed in the short term.",
  reducible: "Needed, but the amount can come down.",
  discretionary: "The user's free choice."
};

type Rule = [Necessity, SpendingGroup, { reason?: string; askUser?: string }?];

const rules: Record<string, Rule> = {
  // compulsory
  "Rent": ["compulsory", "housing", { reason: "Monthly rent." }],
  "BKW": ["compulsory", "housing", { reason: "Electricity bill." }],
  "Krankenkasse": ["compulsory", "health", { reason: "Mandatory health insurance premium." }],
  "Hügi Optik": ["compulsory", "health", { reason: "Glasses; a health expense." }],
  "Steuerverwaltung": ["compulsory", "tax", { reason: "Tax payment." }],
  "Bundesamts für Zoll und Grenzsicherheit (BAZG)": ["compulsory", "tax", { reason: "Customs fee." }],
  "Libero-Tarifverbund": ["compulsory", "transport", { reason: "Annual public transport pass.", askUser: "Do you use the Libero pass for commuting to work?" }],
  // reducible
  "Kantine AG": ["reducible", "food", { reason: "Lunch at work; needed, but the amount is flexible." }],
  "Coop Tankstelle Talgut Zentrum": ["reducible", "transport"],
  "SBB CFF FSS Ticket Shop": ["reducible", "transport"],
  "Schweizerische Bundesbahnen": ["reducible", "transport"],
  "Taxi": ["reducible", "transport"],
  "Mobile Provider": ["reducible", "subscriptions"],
  "Netflix": ["reducible", "subscriptions"],
  "Spotify": ["reducible", "subscriptions"],
  "Teleboy": ["reducible", "subscriptions"],
  "iTunes.com": ["reducible", "subscriptions"],
  "Microsoft": ["reducible", "subscriptions"],
  // discretionary: travel
  "Swiss Intl. Airlines": ["discretionary", "travel"],
  "SWISS International Airlines": ["discretionary", "travel"],
  "Lufthansa Köln": ["discretionary", "travel"],
  "Mondrian London": ["discretionary", "travel"],
  "Mandarin Oriental, Las Vegas": ["discretionary", "travel"],
  "Yellowstone": ["discretionary", "travel"],
  "AirBnB": ["discretionary", "travel"],
  "Hotel Waldhof": ["discretionary", "travel"],
  "VisitBritain Shop": ["discretionary", "travel"],
  "La Salle, Terminal 2": ["discretionary", "travel"],
  "WH Smith Travel, Heathrow T2": ["discretionary", "travel"],
  // discretionary: electronics
  "Apple Online Store": ["discretionary", "electronics"],
  "Digitec Galaxus": ["discretionary", "electronics"],
  "Galaxus AG": ["discretionary", "electronics"],
  "Mediamarkt AG": ["discretionary", "electronics"],
  "Mouser Electronics": ["discretionary", "electronics"],
  "Omni Development Inc": ["discretionary", "electronics"],
  // discretionary: bike & sport
  "Veloshop": ["discretionary", "bike"],
  "Mika Timing GmbH": ["discretionary", "bike"],
  "www.ochsner-sport.ch": ["discretionary", "bike"],
  // discretionary: clothing
  "Abercrombie & Fitch": ["discretionary", "clothing"],
  "Tommy Hilfiger": ["discretionary", "clothing"],
  "H&M": ["discretionary", "clothing"],
  "Superdry.com": ["discretionary", "clothing"],
  "Zalando": ["discretionary", "clothing"],
  "Nike.com": ["discretionary", "clothing"],
  "Manor AG": ["discretionary", "clothing"],
  "Globus": ["discretionary", "clothing"],
  "Companys Retail AG": ["discretionary", "clothing"],
  "Tally Weijl": ["discretionary", "clothing"],
  "Mango": ["discretionary", "clothing"],
  "s.Oliver.com": ["discretionary", "clothing"],
  // discretionary: online shopping
  "Amazon": ["discretionary", "online"],
  "Amazon.com": ["discretionary", "online"],
  "Paypal": ["discretionary", "online"],
  "Cairo.de": ["discretionary", "online"],
  "Unitedprint": ["discretionary", "online"],
  "shop.heinigerag.ch": ["discretionary", "online"],
  "www.post.ch": ["discretionary", "online"],
  // discretionary: food & leisure
  "Ristorante Luce": ["discretionary", "food"],
  "Ristorante & Pizzeria Da Rasso": ["discretionary", "food"],
  "Pizzeria & Grill, Samedan": ["discretionary", "food"],
  "Molino Zürich": ["discretionary", "food"],
  "Carlton Zürich Agloft": ["discretionary", "food"],
  "Orell Fuessli": ["discretionary", "books"],
  "Orell Füssli": ["discretionary", "books"],
  "Gurten Festival": ["discretionary", "leisure"],
  "petcenter.ch": ["discretionary", "leisure"]
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

/** Untagged merchant: treated as flexible "other" and reported as unreviewed, never silently guessed as compulsory. */
export function fallbackTag(merchant: string): MerchantTag {
  return { merchant, necessity: "discretionary", group: "other", source: "fallback", reason: "Not tagged yet.", askUser: `What was the spending at ${merchant} for?` };
}
