import { MISCONCEPTIONS_BY_ID } from "./misconceptions";
import { SCENARIOS } from "./scenarios";
import type { Scenario } from "./types";

export interface ContentIssue {
  level: "error" | "warning";
  where: string;
  message: string;
}

/**
 * Structural checks on the authored content.
 *
 * This exists because the failure modes here are silent: a choice pointing at
 * a misconception id that no longer exists still renders fine to the student
 * and simply vanishes from the teacher rollup. Run this in CI once content
 * lands.
 */
export function validateScenario(scenario: Scenario): ContentIssue[] {
  const issues: ContentIssue[] = [];
  const stepIds = new Set(scenario.steps.map((s) => s.id));
  const at = (rest: string) => `${scenario.id}/${rest}`;

  if (!stepIds.has(scenario.entryStepId)) {
    issues.push({
      level: "error",
      where: at("entryStepId"),
      message: `Entry step "${scenario.entryStepId}" does not exist.`,
    });
  }

  const reachable = new Set<string>();
  const walk = (stepId: string) => {
    if (reachable.has(stepId) || !stepIds.has(stepId)) return;
    reachable.add(stepId);
    scenario.steps
      .find((s) => s.id === stepId)
      ?.choices.forEach((c) => c.next && walk(c.next));
  };
  walk(scenario.entryStepId);

  for (const step of scenario.steps) {
    if (!reachable.has(step.id)) {
      issues.push({
        level: "warning",
        where: at(step.id),
        message: "Step is unreachable from the entry step.",
      });
    }

    if (step.choices.length < 2) {
      issues.push({
        level: "error",
        where: at(step.id),
        message: "A step needs at least two choices to carry any signal.",
      });
    }

    // A step where nothing maps to a misconception is a step that tells the
    // teacher nothing -- it is decoration, not diagnosis.
    if (step.choices.length > 0 && step.choices.every((c) => c.reveals === null)) {
      issues.push({
        level: "warning",
        where: at(step.id),
        message:
          "No choice on this step reveals a misconception, so it produces no diagnostic signal.",
      });
    }

    for (const choice of step.choices) {
      if (choice.reveals !== null && !MISCONCEPTIONS_BY_ID.has(choice.reveals)) {
        issues.push({
          level: "error",
          where: at(`${step.id}/${choice.id}`),
          message: `Maps to unknown misconception "${choice.reveals}".`,
        });
      }
      if (choice.next !== null && !stepIds.has(choice.next)) {
        issues.push({
          level: "error",
          where: at(`${step.id}/${choice.id}`),
          message: `Points at unknown step "${choice.next}".`,
        });
      }
    }
  }

  return issues;
}

export function validateContent(): ContentIssue[] {
  const issues = SCENARIOS.flatMap(validateScenario);

  const referenced = new Set(
    SCENARIOS.flatMap((s) =>
      s.steps.flatMap((st) =>
        st.choices.map((c) => c.reveals).filter((r): r is string => r !== null),
      ),
    ),
  );

  for (const id of MISCONCEPTIONS_BY_ID.keys()) {
    if (!referenced.has(id)) {
      issues.push({
        level: "warning",
        where: `misconceptions/${id}`,
        message:
          "Defined but never reachable from any choice, so it can never be measured.",
      });
    }
  }

  return issues;
}
