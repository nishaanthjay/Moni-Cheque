# Content inventory

Updated 2026-08-26.

## Status: DEMO CONTENT

The scenarios, misconception taxonomy, and page copy in this build were
**written by Claude to demonstrate the tool**. They are not derived from
student data, not reviewed by a financial-literacy educator, and not
classroom-tested.

The repository was empty at clone time (one commit, `README.md` and `LICENSE`),
so there was no prior site content to inventory or preserve. Nothing here was
restored from a previous version — all of it is new and provisional.

## What exists

| Item | Count | Status |
|---|---|---|
| Misconceptions | 13 | demo, unreviewed |
| Scenarios | 3 | demo, unreviewed |
| Scenario steps | 12 | demo, unreviewed |
| Choices | 37 | every one mapped to a misconception or to `null` |
| Page copy strings | all filled | demo, unreviewed |
| Pilot / results data | 0 | **none — no pilot has been run** |

`npm run validate:content` passes with 0 errors and 0 warnings: every
`reveals` points at a real misconception, every `next` points at a real step,
no step is unreachable, no step is signal-free, and all 13 misconceptions are
reachable from at least one choice.

## Misconceptions

| Id | Domain |
|---|---|
| `BANK_DEBIT_CANNOT_OVERDRAFT` | banking |
| `BANK_PENDING_MEANS_SETTLED` | banking |
| `BANK_CHECKING_GROWS` | banking |
| `CREDIT_MINIMUM_AVOIDS_INTEREST` | credit |
| `CREDIT_IS_EXTRA_MONEY` | credit |
| `CREDIT_NO_HISTORY_IS_GOOD_HISTORY` | credit |
| `SAVE_SMALL_AMOUNTS_POINTLESS` | saving |
| `SAVE_INTEREST_IS_LINEAR` | saving |
| `SPEND_DISCOUNT_IS_SAVINGS` | spending |
| `SPEND_CHEAPEST_UPFRONT_IS_CHEAPEST` | spending |
| `SPEND_SMALL_RECURRING_INVISIBLE` | spending |
| `INCOME_GROSS_EQUALS_TAKE_HOME` | income |
| `RISK_UNLIKELY_MEANS_IGNORABLE` | risk |

## Scenarios

| Id | Title | Steps |
|---|---|---|
| `twenty-dollars` | Twenty dollars | 5 |
| `first-paycheck` | Your first paycheck | 3 |
| `the-phone` | The phone | 4 |

The runner plays all three in sequence: 11–12 steps depending on the path
taken, roughly five minutes.

## Before any real classroom use

1. **Have an educator review the taxonomy.** Confirm each entry is a
   misconception 12–14 year-olds actually hold, and cut anything that is really
   a preference or an adult framing.
2. **Review the scenarios for reading level and assumptions.** They currently
   assume allowance money, phone ownership, and a first hourly job. Not every
   class will fit that.
3. **Check no option is accidentally the obvious answer.** If students can
   pattern-match the "good" choice, the instrument measures test-taking, not
   understanding.
4. **Have the privacy copy reviewed.** `home.privacy` and `join.privacyNote`
   describe what the code does today, but no one qualified has signed off on
   whether it meets what a district would be agreeing to.
5. **Run a pilot.** Everything numeric in the app right now is either withheld
   or explicitly simulated.

## Preserve-verbatim tier

Once content is reviewed and in use, these are content and not styling. A UI
pass must never paraphrase, retitle, or renumber them:

- every `Misconception.id` and `Misconception.name`
- every `ScenarioStep.prompt`, `.detail`, and `Choice.label`
- the privacy and COPPA disclosure strings in `copy.ts`

Ids are load-bearing: the dashboard aggregates on them, so renaming one after a
class has run silently drops it from that rollup.

## Two claims deliberately not made

Both were checked against the original pitch and found weaker than presented.
The guardrails are repeated in the header of `src/content/copy.ts`.

1. **No sweeping multi-state mandate claim.** The New York detail is real but
   narrower than pitched. Nothing in the copy asserts broad multi-state
   middle-school requirements.
2. **No competitive-vacuum framing.** The FAQ names NGPF and EverFi, calls them
   widely used, and positions this as a diagnostic layer that runs alongside
   them rather than replacing them.

The FAQ also states plainly that no pilot has been run and that the content is
unreviewed, rather than letting a visitor infer otherwise.
