import type { Misconception } from "./types";

/**
 * ============================================================
 * DEMO CONTENT -- WRITTEN TO DEMONSTRATE THE TOOL, NOT VALIDATED
 * ============================================================
 * These entries were authored by Claude to make the app runnable end to end.
 * They are plausible, commonly-cited middle-school finance misconceptions --
 * NOT a taxonomy derived from student data, classroom observation, or any
 * literature review, and NOT reviewed by a financial-literacy educator.
 *
 * Before this is used with real students, someone qualified has to:
 *   - confirm each of these is actually a misconception 12-14 year-olds hold
 *   - cut the ones that are really just preferences or adult framings
 *   - check the wording is age-appropriate and not leading
 *   - decide whether the domain grouping matches how the class is taught
 *
 * Ids are stable and the dashboard aggregates on them. Once a class has run a
 * session, never rename or renumber one -- doing so silently drops it from
 * every past rollup.
 */
export const MISCONCEPTIONS: readonly Misconception[] = [
  // -- banking ------------------------------------------------------------
  {
    id: "BANK_DEBIT_CANNOT_OVERDRAFT",
    name: "Thinks a debit card simply declines when the account is empty",
    description:
      "Believes a debit card cannot spend money that is not there, so overdraft fees come as a surprise. Often paired with the idea that the bank is 'checking' every purchase for you.",
    domain: "banking",
  },
  {
    id: "BANK_PENDING_MEANS_SETTLED",
    name: "Reads a pending balance as money already gone or already arrived",
    description:
      "Treats the displayed balance as final, so a deposit that has not cleared feels spendable and a charge that has not posted feels like it never happened.",
    domain: "banking",
  },
  {
    id: "BANK_CHECKING_GROWS",
    name: "Expects a checking account to grow money on its own",
    description:
      "Assumes any bank account pays meaningful interest, so leaving cash in checking feels equivalent to saving it.",
    domain: "banking",
  },

  // -- credit -------------------------------------------------------------
  {
    id: "CREDIT_MINIMUM_AVOIDS_INTEREST",
    name: "Believes paying the minimum avoids interest",
    description:
      "Treats the minimum payment as the amount the card company says you owe this month, rather than the floor that keeps the account current while interest accrues on the rest.",
    domain: "credit",
  },
  {
    id: "CREDIT_IS_EXTRA_MONEY",
    name: "Treats a credit limit as money you have",
    description:
      "Understands a $500 limit as $500 of available funds rather than $500 of debt you are pre-approved to take on.",
    domain: "credit",
  },
  {
    id: "CREDIT_NO_HISTORY_IS_GOOD_HISTORY",
    name: "Assumes never borrowing produces a good credit score",
    description:
      "Reasons that avoiding debt entirely must look responsible, not realising a score is built from a record of repayment that no-history cannot supply.",
    domain: "credit",
  },

  // -- saving -------------------------------------------------------------
  {
    id: "SAVE_SMALL_AMOUNTS_POINTLESS",
    name: "Believes saving only counts once the amount is large",
    description:
      "Dismisses small or irregular saving as not worth doing, so the habit never starts. Frequently stated as 'I'll save when I actually earn something.'",
    domain: "saving",
  },
  {
    id: "SAVE_INTEREST_IS_LINEAR",
    name: "Expects savings to grow in a straight line",
    description:
      "Estimates growth by multiplying, so the effect of starting earlier looks small and compounding over years is badly underestimated.",
    domain: "saving",
  },

  // -- spending -----------------------------------------------------------
  {
    id: "SPEND_DISCOUNT_IS_SAVINGS",
    name: "Counts money off as money saved",
    description:
      "Treats the difference between the original and sale price as a gain, so buying something unneeded at 40% off registers as coming out ahead.",
    domain: "spending",
  },
  {
    id: "SPEND_CHEAPEST_UPFRONT_IS_CHEAPEST",
    name: "Compares sticker prices instead of cost over time",
    description:
      "Picks the lower upfront price without weighing how long it lasts or what it costs to run, so the cheaper option is often the more expensive one.",
    domain: "spending",
  },
  {
    id: "SPEND_SMALL_RECURRING_INVISIBLE",
    name: "Does not add up small repeating charges",
    description:
      "Judges a subscription or daily purchase on its individual price rather than its annual total, so recurring costs escape the budget entirely.",
    domain: "spending",
  },

  // -- income -------------------------------------------------------------
  {
    id: "INCOME_GROSS_EQUALS_TAKE_HOME",
    name: "Expects take-home pay to equal rate times hours",
    description:
      "Has not accounted for withholding, so the first paycheck is smaller than budgeted and the gap is read as an error rather than as deductions.",
    domain: "income",
  },

  // -- risk ---------------------------------------------------------------
  {
    id: "RISK_UNLIKELY_MEANS_IGNORABLE",
    name: "Plans only for what is likely to happen",
    description:
      "Treats low-probability events as not worth preparing for, so there is no buffer for the one expense that actually breaks a budget.",
    domain: "risk",
  },
];

export const MISCONCEPTIONS_BY_ID: ReadonlyMap<string, Misconception> = new Map(
  MISCONCEPTIONS.map((m) => [m.id, m]),
);

export function getMisconception(id: string): Misconception | undefined {
  return MISCONCEPTIONS_BY_ID.get(id);
}
