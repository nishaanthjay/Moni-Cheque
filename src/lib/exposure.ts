import { getScenario } from "@/content/scenarios";
import type { Response } from "@/content/types";

/**
 * Which misconceptions a given run had the CHANCE to reveal.
 *
 * A student was "asked" about misconception M if they reached a step where at
 * least one option maps to M. This is the denominator the rollup divides by --
 * see the note in aggregate.ts for why dividing by the whole class instead
 * silently understates anything sitting deep in a branch.
 */
export function exposureFor(responses: readonly Response[]): ReadonlySet<string> {
  const exposed = new Set<string>();
  for (const r of responses) {
    const step = getScenario(r.scenarioId)?.steps.find((s) => s.id === r.stepId);
    if (!step) continue;
    for (const choice of step.choices) {
      if (choice.reveals) exposed.add(choice.reveals);
    }
  }
  return exposed;
}
