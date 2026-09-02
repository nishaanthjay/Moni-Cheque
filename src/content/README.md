# Filling in the content

This directory holds everything that is *product content* rather than UI.

**Everything in it right now is demo content**, written to make the app
runnable end to end. It is not derived from student data, not reviewed by a
financial-literacy educator, and not classroom-tested. Treat it as a worked
example of the right *shape*, not as the content.

## Order of work

Author in this order. Doing it backwards produces scenarios written for
narrative effect and mapped to misconceptions afterwards, which is how the
diagnostic quietly degrades into a right/wrong quiz.

1. **`misconceptions.ts`** — the taxonomy. Each entry names one specific belief
   a student may hold. State a belief, not a topic.
2. **`scenarios.ts`** — the branching decision trees, written to elicit the
   misconceptions above.
3. **`copy.ts`** — page copy.
4. Run `npm run validate:content` and clear every error and warning.

## Preserve-verbatim tier

Once written, these are content and not styling. A UI or design pass must
never paraphrase, retitle, tighten, or renumber them:

- every `Misconception.id` and `Misconception.name`
- every `ScenarioStep.prompt`, `ScenarioStep.detail`, and `Choice.label`
- the privacy / COPPA disclosure slots in `copy.ts`

Ids in particular are load-bearing: the teacher dashboard aggregates on them,
so renaming one after a class has run silently drops that misconception out of
the rollup.

## Two claims that must not be written into `copy.ts`

Both were checked against the original pitch and found weaker than presented.
They are repeated in the header comment of `copy.ts`, next to the slots where
they would get written by accident.

1. **No sweeping "multi-state mandate" claim.** The New York mandate detail is
   real but narrower than the pitch implies. Any assertion of broad multi-state
   middle-school requirements needs a citation next to the sentence.
2. **No competitive-vacuum framing.** NGPF and EverFi are free,
   sponsor-subsidised, and already widely adopted. Copy should position this as
   a diagnostic layer that complements an existing curriculum — which is both
   accurate and the stronger pitch.

The framing recorded as most defensible, if positioning copy is needed: a
compliance artifact for New York districts that must submit implementation
verification.

## No fabricated results

There is no pilot data in this repo and no seeded sample results. The teacher
dashboard renders withheld values rather than mock percentages, so nothing here
can be mistaken later for evidence. Keep it that way until a pilot actually
runs.
