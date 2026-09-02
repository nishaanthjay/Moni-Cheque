import { SCENARIOS } from "@/content/scenarios";
import type { Response } from "@/content/types";
import type { ParticipantResponses } from "./aggregate";

/**
 * ============================================================
 * SIMULATED CLASS -- NOT PILOT DATA
 * ============================================================
 * Generates synthetic students walking the real scenario trees so the rollup,
 * the denominator handling, and the severity banding can be seen working on
 * actual numbers.
 *
 * No pilot has been run. Nothing produced here came from a real student, and
 * no figure it generates may be quoted as evidence of anything. Every screen
 * that renders it is labelled.
 *
 * Delete this file, and the control that calls it, before any real deployment.
 */

/** Deterministic PRNG so a given seed always yields the same class. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

/**
 * Rough per-misconception likelihood, used only to make the simulated
 * distribution uneven enough to be legible. These are invented weights, not
 * measured rates.
 */
const LIKELIHOOD: Record<string, number> = {
  SPEND_DISCOUNT_IS_SAVINGS: 0.72,
  CREDIT_MINIMUM_AVOIDS_INTEREST: 0.68,
  BANK_DEBIT_CANNOT_OVERDRAFT: 0.61,
  SAVE_INTEREST_IS_LINEAR: 0.58,
  INCOME_GROSS_EQUALS_TAKE_HOME: 0.54,
  SPEND_SMALL_RECURRING_INVISIBLE: 0.47,
  CREDIT_IS_EXTRA_MONEY: 0.41,
  SAVE_SMALL_AMOUNTS_POINTLESS: 0.36,
  SPEND_CHEAPEST_UPFRONT_IS_CHEAPEST: 0.33,
  BANK_CHECKING_GROWS: 0.29,
  RISK_UNLIKELY_MEANS_IGNORABLE: 0.24,
  CREDIT_NO_HISTORY_IS_GOOD_HISTORY: 0.21,
  BANK_PENDING_MEANS_SETTLED: 0.18,
};

function runOne(rand: () => number): Response[] {
  const responses: Response[] = [];

  for (const scenario of SCENARIOS) {
    let stepId: string | null = scenario.entryStepId;
    let guard = 0;

    while (stepId && guard++ < 40) {
      const step = scenario.steps.find((s) => s.id === stepId);
      if (!step) break;

      // Weight each option by how likely a student is to hold the
      // misconception it reveals; unmapped options get a flat baseline.
      const weights = step.choices.map((c) =>
        c.reveals ? (LIKELIHOOD[c.reveals] ?? 0.3) : 0.45,
      );
      const total = weights.reduce((a, b) => a + b, 0);
      let pick = rand() * total;
      let chosen = step.choices[step.choices.length - 1];
      for (let i = 0; i < step.choices.length; i++) {
        pick -= weights[i];
        if (pick <= 0) { chosen = step.choices[i]; break; }
      }

      responses.push({
        scenarioId: scenario.id,
        stepId: step.id,
        choiceId: chosen.id,
        reveals: chosen.reveals,
        elapsedMs: Math.round(4000 + rand() * 16000),
      });

      stepId = chosen.next;
    }
  }

  return responses;
}

export function simulateClass(size = 24, seed = 20260826): ParticipantResponses[] {
  const rand = rng(seed);
  return Array.from({ length: size }, () => {
    const responses = runOne(rand);
    // A few students in any class do not finish.
    const finished = rand() > 0.12;
    return {
      responses: finished
        ? responses
        : responses.slice(0, Math.max(1, Math.floor(responses.length * rand()))),
      completed: finished,
    };
  });
}
