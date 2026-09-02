import { getMisconception } from "@/content/misconceptions";
import type { Domain, Misconception, Response } from "@/content/types";

/**
 * Class-wide rollup for the teacher dashboard.
 *
 * The denominator question matters more than it looks. "38% of this class
 * thinks a debit card can't overdraft" is only true if the 38% is
 *
 *     students who revealed it / students who were ASKED
 *
 * and not "/ every student in the session". Those differ as soon as scenarios
 * branch, because a branching tree means not every student reaches every step.
 * Dividing by the whole class silently understates every misconception that
 * sits deep in a branch.
 *
 * So `exposed` is tracked per misconception and used as the denominator, with
 * `classSize` reported alongside it so a teacher can see the difference.
 */

export interface MisconceptionRollup {
  misconception: Misconception;
  /** Students who reached a step where this could be revealed. */
  exposed: number;
  /** Students who actually revealed it. */
  revealed: number;
  /** revealed / exposed, 0-1. `null` when nobody was exposed. */
  prevalence: number | null;
}

export interface DomainRollup {
  domain: Domain;
  items: MisconceptionRollup[];
  /** Mean prevalence across measured misconceptions in this domain. */
  prevalence: number | null;
}

export interface ClassRollup {
  classSize: number;
  completed: number;
  byMisconception: MisconceptionRollup[];
  byDomain: DomainRollup[];
}

/** One participant's full set of responses. Identity-free by construction. */
export interface ParticipantResponses {
  responses: Response[];
  completed: boolean;
}

/**
 * @param participants  one entry per student who started
 * @param exposureFor   which misconceptions a given response set had the
 *                      chance to reveal. Supplied by the caller because it
 *                      depends on the authored scenario tree, which is empty
 *                      until content lands.
 */
export function rollUpClass(
  participants: readonly ParticipantResponses[],
  exposureFor: (r: readonly Response[]) => ReadonlySet<string>,
): ClassRollup {
  const exposed = new Map<string, number>();
  const revealed = new Map<string, number>();

  for (const participant of participants) {
    for (const id of exposureFor(participant.responses)) {
      exposed.set(id, (exposed.get(id) ?? 0) + 1);
    }

    // Count each misconception at most once per student -- a student who hits
    // the same misconception on three steps is one student, not three.
    const seen = new Set<string>();
    for (const response of participant.responses) {
      if (response.reveals && !seen.has(response.reveals)) {
        seen.add(response.reveals);
        revealed.set(response.reveals, (revealed.get(response.reveals) ?? 0) + 1);
      }
    }
  }

  const ids = new Set([...exposed.keys(), ...revealed.keys()]);

  const byMisconception: MisconceptionRollup[] = [];
  for (const id of ids) {
    const misconception = getMisconception(id);
    // A response referencing an unknown id means content drifted out from
    // under stored results. Drop it here; `validateContent()` reports it.
    if (!misconception) continue;

    const exposedCount = exposed.get(id) ?? 0;
    const revealedCount = revealed.get(id) ?? 0;
    byMisconception.push({
      misconception,
      exposed: exposedCount,
      revealed: revealedCount,
      prevalence: exposedCount === 0 ? null : revealedCount / exposedCount,
    });
  }

  byMisconception.sort((a, b) => (b.prevalence ?? -1) - (a.prevalence ?? -1));

  const domains = new Map<Domain, MisconceptionRollup[]>();
  for (const item of byMisconception) {
    const list = domains.get(item.misconception.domain) ?? [];
    list.push(item);
    domains.set(item.misconception.domain, list);
  }

  const byDomain: DomainRollup[] = [...domains.entries()].map(
    ([domain, items]) => {
      const measured = items.filter(
        (i): i is MisconceptionRollup & { prevalence: number } =>
          i.prevalence !== null,
      );
      return {
        domain,
        items,
        prevalence: measured.length
          ? measured.reduce((sum, i) => sum + i.prevalence, 0) / measured.length
          : null,
      };
    },
  );

  byDomain.sort((a, b) => (b.prevalence ?? -1) - (a.prevalence ?? -1));

  return {
    classSize: participants.length,
    completed: participants.filter((p) => p.completed).length,
    byMisconception,
    byDomain,
  };
}

export function formatPrevalence(value: number | null): string {
  return value === null ? "--" : `${Math.round(value * 100)}%`;
}

/** Severity band, used only to colour the prevalence bars. */
export function severity(value: number | null): "none" | "low" | "mid" | "high" {
  if (value === null) return "none";
  if (value >= 0.5) return "high";
  if (value >= 0.25) return "mid";
  return "low";
}
