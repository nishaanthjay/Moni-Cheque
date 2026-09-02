/**
 * Moni-Cheque content schema.
 *
 * IMPORTANT — read before editing:
 * These types are ARCHITECTURE. The values that fill them are CONTENT.
 * Content lives in `misconceptions.ts` and `scenarios.ts` and is currently
 * empty on purpose: this repo was scaffolded as a UI shell, and no scenario
 * text or misconception taxonomy has been authored or verified yet.
 *
 * Once real content is added, `Misconception.id`, `Misconception.name`, and all
 * `ScenarioStep.prompt` / `Choice.label` strings are "preserve verbatim" tier.
 * A UI or styling change must never paraphrase, retitle, or renumber them --
 * the teacher dashboard aggregates on these exact ids.
 */

/** Grouping used only to organise the teacher dashboard rollup. */
export type Domain =
  | "banking"
  | "credit"
  | "saving"
  | "spending"
  | "income"
  | "risk";

export const DOMAIN_LABELS: Record<Domain, string> = {
  banking: "Banking",
  credit: "Credit",
  saving: "Saving",
  spending: "Spending",
  income: "Income",
  risk: "Risk",
};

export type MisconceptionId = string;

/**
 * A specific, named thing a student may believe that is not true.
 *
 * This is the product's whole differentiation claim: a choice maps to one of
 * these, NOT to right/wrong. If this registry ever collapses into a boolean,
 * the differentiation is gone.
 */
export interface Misconception {
  /** Stable id. The dashboard aggregates on this -- never renumber it. */
  id: MisconceptionId;
  /** Display name shown to teachers. Preserve verbatim. */
  name: string;
  /** What the student actually believes, in plain language. */
  description: string;
  domain: Domain;
}

export interface Choice {
  id: string;
  /** Answer text shown to the student. Preserve verbatim. */
  label: string;
  /**
   * The misconception this choice reveals, or `null` for a choice that
   * reveals no misconception.
   *
   * `null` deliberately does NOT mean "correct answer". It means this path
   * carries no diagnostic signal. Keeping that distinction is what stops the
   * scoring model from silently degrading back into right/wrong.
   */
  reveals: MisconceptionId | null;
  /** Id of the next step, or `null` to end the scenario here. */
  next: string | null;
}

export interface ScenarioStep {
  id: string;
  /** Question text shown to the student. Preserve verbatim. */
  prompt: string;
  /** Optional supporting sentence under the prompt. Preserve verbatim. */
  detail?: string;
  choices: Choice[];
}

export interface Scenario {
  id: string;
  title: string;
  estimatedMinutes: number;
  entryStepId: string;
  steps: ScenarioStep[];
}

/** One student's answer to one step. Carries no identity of any kind. */
export interface Response {
  scenarioId: string;
  stepId: string;
  choiceId: string;
  reveals: MisconceptionId | null;
  /** Milliseconds spent on the step. Behavioural signal, not identifying. */
  elapsedMs: number;
}
