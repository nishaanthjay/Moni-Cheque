# Moni-Cheque

A behaviour-based financial-literacy diagnostic: short branching scenarios
that infer what middle schoolers actually misunderstand about personal finance
from the choices they make, rolled up into a class-wide view so a teacher knows
what to reteach.

> **Status: working demo, unreviewed content.** The interface, session
> handling, branching runner, and dashboard aggregation are built and run end
> to end. The 13 misconceptions, 3 scenarios, and all page copy were **written
> to demonstrate the tool** — not derived from student data, not reviewed by a
> financial-literacy educator, not classroom-tested. No pilot has been run and
> there is no results data in this repo. See
> [`CONTENT-INVENTORY.md`](CONTENT-INVENTORY.md) for what needs review before
> real use.

## Run it

```bash
npm install
npm run dev               # http://localhost:5173
npm run build             # typecheck + production build
npm run validate:content  # dangling refs, unreachable steps, signal-free steps
```

Vite + React 19 + TypeScript + Tailwind v4. Runs entirely in the browser with
no install, which is the Chromebook constraint.

## What's here

```
src/
  content/       product content -- currently unwritten, read its README first
    types.ts         schema: Misconception, Choice, ScenarioStep, Scenario
    misconceptions.ts  the taxonomy (13, demo)
    scenarios.ts       the branching trees (3, demo)
    copy.ts            page copy, with claim guardrails in the header
    validate.ts        dangling refs, unreachable steps, signal-free steps
  lib/
    session.ts     anonymous session codes -- the zero-PII enforcement point
    aggregate.ts   class rollup and prevalence maths
    exposure.ts    which misconceptions a run could have revealed
    demo.ts        simulated class -- DELETE before any real deployment
  components/    design-system primitives and layout
  pages/         Home, Join, Run, Results, Teacher
```

## Routes

| Route | What it is |
|---|---|
| `/` | Overview / landing |
| `/join` | Student enters a class session code |
| `/run` | Scenario runner (branching, timing, resume) |
| `/results` | What the student's run revealed |
| `/teacher` | Session code generator + class rollup |
| any other | 404 |

### Trying it

1. Open `/teacher` and hit **Generate code**.
2. Open `/join`, type the code, and work through the scenarios — 11–12
   decisions across three scenarios, about five minutes.
3. `/results` shows which misconceptions your choices surfaced. There is no
   score, deliberately.
4. Back on `/teacher`, hit **Load a simulated class** to see a rollup. It runs
   24 synthetic students through the real scenario trees and through the real
   aggregation — the numbers are computed, but the students are not real and
   the panel says so.

## Three things worth knowing before changing anything

**1. Content and styling are separate jobs.** Restyling must not rewrite copy
or rename data fields. Misconception ids and names, scenario text, and privacy
disclosures are preserve-verbatim tier — the teacher dashboard aggregates on
those exact ids, so renaming one after a class has run drops it from the
rollup silently.

**2. No pilot has been run and there is no real results data.** The dashboard's
empty state withholds values rather than sampling them. The only numbers it
will ever show come from **Load a simulated class**, which is generated,
labelled on screen, and produced by `src/lib/demo.ts`. Nothing in this repo may
be quoted as evidence of anything.

**3. Zero PII is a code property, not a promise.** `src/lib/session.ts` is
where it holds: no name, email, or username field exists anywhere in the app,
session codes identify a class run rather than a student, and no analytics or
fingerprinting is loaded. Adding an identifying field makes the privacy copy
false and must change it too.

## Design

Structure is documented in [`DESIGN.md`](DESIGN.md), extracted from a reference
site with Firecrawl. Three signatures carry it — everything at weight 500 with
no bold, `-0.02em` tracking at every size, and display headings that close in
italic Instrument Serif.

Colour is Moni-Cheque's own palette, and `src/index.css` is the source of truth:

| Token | Value | Role |
|---|---|---|
| `--color-accent` | `#2DE1FC` | actions, active state. **Fills take dark text** — white on this cyan is 1.58:1 |
| `--color-positive` | `#2AFC98` | live dots, positive deltas |
| `--color-sev-mid` | `#09E85E` | prevalence ramp, middle |
| `--color-sev-low` | `#16C172` | prevalence ramp, low |
| `--color-track` | `#214F4B` | bar tracks, inset surfaces. Too dark for text (2.11:1) |
| `--color-danger` | `#FF6B5E` | **system colour, not brand.** Form errors only |

The ramp separates by lightness (0.40 → 0.59 → 0.72), not hue. The palette has
no warm tone, so "most of the class holds this misconception" cannot be
coloured as a warning — bar length, rank order, and the printed percentage
carry severity, and colour is deliberately redundant. `--color-danger` exists
because form validation needs a signal that is unmistakably *wrong*, and every
brand colour is a green or cyan that means "good" elsewhere in the UI.

Contrast is checked against the rendered pages, not the tokens: 305 text nodes
across 6 routes, 0 below WCAG AA.

The **banner** at the bottom of the screen marks this build as demo content.
Delete `src/components/layout/BuildBar.tsx` — and `src/lib/demo.ts`, which
generates the simulated class — once the content is real.

Domain chips use the palette categorically (`--color-domain-*`), which is
legitimate because domains are nominal. Prevalence deliberately does not:
see the note in `RollupTable.tsx`.
