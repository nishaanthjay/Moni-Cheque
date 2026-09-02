import type { Scenario } from "./types";

/**
 * ============================================================
 * DEMO CONTENT -- WRITTEN TO DEMONSTRATE THE TOOL, NOT VALIDATED
 * ============================================================
 * Authored by Claude so the runner, the mapping, and the rollup can be seen
 * working end to end. These are NOT classroom-tested items. Before real use,
 * an educator needs to check reading level, cultural assumptions (allowance,
 * phone ownership, a first job), whether each distractor genuinely elicits the
 * misconception it claims, and whether any option is accidentally the
 * "obviously right" one.
 *
 * Design rules these follow, and that new scenarios should follow too:
 *   - Every choice maps to a named misconception or to `null`.
 *   - `null` means "no diagnostic signal", NOT "correct". A student can take a
 *     sensible action for a wrong reason -- that path still reveals something.
 *   - No option is scored. There is no right answer key anywhere in this file.
 *   - Branch on the misconception, so a student who reveals one gets a
 *     follow-up that tests whether it holds.
 */
export const SCENARIOS: readonly Scenario[] = [
  {
    id: "twenty-dollars",
    title: "Twenty dollars",
    estimatedMinutes: 2,
    entryStepId: "start",
    steps: [
      {
        id: "start",
        prompt: "You have $20 and nothing you have to spend it on.",
        detail:
          "A game you have wanted for a while is $18 this week, marked down from $25.",
        choices: [
          {
            id: "buy-saving",
            label: "Buy it. It's $7 off, so I'm coming out ahead.",
            reveals: "SPEND_DISCOUNT_IS_SAVINGS",
            next: "discount-followup",
          },
          {
            id: "buy-want",
            label: "Buy it. I want it and I can afford it.",
            reveals: null,
            next: "leftover",
          },
          {
            id: "skip",
            label: "Skip it. That's almost everything I have.",
            reveals: null,
            next: "leftover",
          },
          {
            id: "save-dismissive",
            label: "Put it away, though $20 isn't really enough to matter.",
            reveals: "SAVE_SMALL_AMOUNTS_POINTLESS",
            next: "small-amounts-followup",
          },
        ],
      },
      {
        id: "discount-followup",
        prompt: "The same shop has a jacket for $60, down from $100.",
        detail: "You were not planning to buy a jacket.",
        choices: [
          {
            id: "buy-40",
            label: "That's $40 off. Hard to pass up.",
            reveals: "SPEND_DISCOUNT_IS_SAVINGS",
            next: "leftover",
          },
          {
            id: "still-60",
            label: "It's still $60 leaving my pocket, and I don't need it.",
            reveals: null,
            next: "leftover",
          },
          {
            id: "budget",
            label: "Depends whether I have $60 spare, not on the discount.",
            reveals: null,
            next: "leftover",
          },
        ],
      },
      {
        id: "small-amounts-followup",
        prompt: "You could put $5 away each week instead.",
        detail: "Over a school year that's about 40 weeks.",
        choices: [
          {
            id: "not-worth",
            label: "$5 a week is too small to be worth tracking.",
            reveals: "SAVE_SMALL_AMOUNTS_POINTLESS",
            next: "leftover",
          },
          {
            id: "adds-up",
            label: "That's around $200 by summer, which is real money.",
            reveals: null,
            next: "leftover",
          },
          {
            id: "wait-for-job",
            label: "I'd rather wait and save properly once I have a job.",
            reveals: "SAVE_SMALL_AMOUNTS_POINTLESS",
            next: "leftover",
          },
        ],
      },
      {
        id: "leftover",
        prompt: "Whatever is left, you decide to keep somewhere.",
        detail: "Your options are the same ones most people have.",
        choices: [
          {
            id: "checking-grows",
            label: "Leave it in a checking account so it grows a bit.",
            reveals: "BANK_CHECKING_GROWS",
            next: "compounding",
          },
          {
            id: "savings",
            label: "Move it to a savings account, which pays more.",
            reveals: null,
            next: "compounding",
          },
          {
            id: "cash",
            label: "Keep it as cash where I can see it.",
            reveals: null,
            next: "compounding",
          },
        ],
      },
      {
        id: "compounding",
        prompt: "Say you put away $200 and leave it somewhere paying 5% a year.",
        detail: "You don't add anything else to it.",
        choices: [
          {
            id: "linear",
            label: "About $300 after ten years — $10 a year, ten times.",
            reveals: "SAVE_INTEREST_IS_LINEAR",
            next: null,
          },
          {
            id: "compound",
            label: "More than that, because each year earns on the year before.",
            reveals: null,
            next: null,
          },
          {
            id: "flat-rate",
            label: "Exactly $300 — 5% of $200 is $10, so it's $10 every year.",
            reveals: "SAVE_INTEREST_IS_LINEAR",
            next: null,
          },
        ],
      },
    ],
  },

  {
    id: "first-paycheck",
    title: "Your first paycheck",
    estimatedMinutes: 2,
    entryStepId: "expect",
    steps: [
      {
        id: "expect",
        prompt: "You worked 10 hours last week at $15 an hour.",
        detail: "Your first paycheck is about to arrive.",
        choices: [
          {
            id: "gross",
            label: "$150. That's the arithmetic.",
            reveals: "INCOME_GROSS_EQUALS_TAKE_HOME",
            next: "shortfall",
          },
          {
            id: "less",
            label: "Less than $150 — some gets taken out before I see it.",
            reveals: null,
            next: "shortfall",
          },
          {
            id: "unsure",
            label: "Around $150, but I'm not sure what comes out.",
            reveals: "INCOME_GROSS_EQUALS_TAKE_HOME",
            next: "shortfall",
          },
        ],
      },
      {
        id: "shortfall",
        prompt: "The deposit is $128.",
        detail: "You had already told a friend you'd cover $140 of a shared ticket.",
        choices: [
          {
            id: "mistake",
            label: "Something went wrong with my hours.",
            reveals: "INCOME_GROSS_EQUALS_TAKE_HOME",
            next: "buffer",
          },
          {
            id: "deductions",
            label: "That's the deductions. I budgeted from the wrong number.",
            reveals: null,
            next: "buffer",
          },
          {
            id: "pending",
            label: "The rest is probably still pending and will show up.",
            reveals: "BANK_PENDING_MEANS_SETTLED",
            next: "buffer",
          },
        ],
      },
      {
        id: "buffer",
        prompt: "You're $12 short and the ticket is due tonight.",
        detail: "Your debit card is linked to the account.",
        choices: [
          {
            id: "will-decline",
            label: "Try the card. If there isn't enough it'll just decline.",
            reveals: "BANK_DEBIT_CANNOT_OVERDRAFT",
            next: null,
          },
          {
            id: "ask",
            label: "Tell my friend I'm short and sort it tomorrow.",
            reveals: null,
            next: null,
          },
          {
            id: "no-buffer",
            label: "I'd never have planned for being short in the first place.",
            reveals: "RISK_UNLIKELY_MEANS_IGNORABLE",
            next: null,
          },
        ],
      },
    ],
  },

  {
    id: "the-phone",
    title: "The phone",
    estimatedMinutes: 2,
    entryStepId: "choose",
    steps: [
      {
        id: "choose",
        prompt: "You need a phone and there are two options.",
        detail:
          "One is $180 and people say it lasts about two years. One is $320 and lasts about four.",
        choices: [
          {
            id: "cheaper",
            label: "The $180 one. It's cheaper.",
            reveals: "SPEND_CHEAPEST_UPFRONT_IS_CHEAPEST",
            next: "plan",
          },
          {
            id: "per-year",
            label: "The $320 one works out to less per year.",
            reveals: null,
            next: "plan",
          },
          {
            id: "afford-now",
            label: "Whichever I can actually pay for right now.",
            reveals: null,
            next: "plan",
          },
        ],
      },
      {
        id: "plan",
        prompt: "The plan is $12 a month, plus $8 for the app you use daily.",
        detail: "Both charge automatically.",
        choices: [
          {
            id: "small",
            label: "That's small enough that I don't need to track it.",
            reveals: "SPEND_SMALL_RECURRING_INVISIBLE",
            next: "card",
          },
          {
            id: "annual",
            label: "That's $240 a year, so it belongs in the budget.",
            reveals: null,
            next: "card",
          },
          {
            id: "cancel-later",
            label: "I'll cancel if it ever becomes a problem.",
            reveals: "SPEND_SMALL_RECURRING_INVISIBLE",
            next: "card",
          },
        ],
      },
      {
        id: "card",
        prompt: "You're offered a card with a $500 limit to pay for it.",
        detail: "There is no charge to open it.",
        choices: [
          {
            id: "extra-money",
            label: "That's $500 I can use.",
            reveals: "CREDIT_IS_EXTRA_MONEY",
            next: "minimum",
          },
          {
            id: "debt",
            label: "That's $500 I'd be allowed to borrow and have to repay.",
            reveals: null,
            next: "minimum",
          },
          {
            id: "no-card-good",
            label: "I'll avoid cards entirely — that's better for my credit.",
            reveals: "CREDIT_NO_HISTORY_IS_GOOD_HISTORY",
            next: "minimum",
          },
        ],
      },
      {
        id: "minimum",
        prompt: "The statement says: balance $320, minimum payment $25.",
        detail: "You have $320 available.",
        choices: [
          {
            id: "pay-min",
            label: "Pay the $25. That's what they're asking for.",
            reveals: "CREDIT_MINIMUM_AVOIDS_INTEREST",
            next: null,
          },
          {
            id: "pay-full",
            label: "Pay the full $320 so nothing carries over.",
            reveals: null,
            next: null,
          },
          {
            id: "min-no-interest",
            label: "Pay the minimum — as long as I pay something there's no interest.",
            reveals: "CREDIT_MINIMUM_AVOIDS_INTEREST",
            next: null,
          },
        ],
      },
    ],
  },
];

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}
