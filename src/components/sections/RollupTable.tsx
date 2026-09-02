import { Card } from "@/components/ui/Card";
import { DomainChip } from "@/components/ui/DomainChip";
import { formatPrevalence, severity, type ClassRollup } from "@/lib/aggregate";
import { cn } from "@/lib/cn";

/**
 * The class rollup -- the screen the whole product exists to produce.
 *
 * Prevalence is `revealed / exposed`: of the students who actually reached a
 * step where this could surface, how many revealed it. Not `/ class size`,
 * which would understate anything deep in a branch.
 *
 * Bar colour is deliberately REDUNDANT with bar length. The brand palette is
 * entirely cool greens and cyan, so a hue ramp cannot say "this one is bad" --
 * a bright green 78% would read as good news. Rank, length, and the printed
 * percentage carry severity; colour only reinforces the ordering.
 */

const SEV_BAR: Record<string, string> = {
  high: "bg-sev-high",
  mid: "bg-sev-mid",
  low: "bg-sev-low",
  none: "bg-ink-faint",
};

export function RollupTable({
  rollup,
  note,
}: {
  rollup: ClassRollup;
  note?: string;
}) {
  const rows = rollup.byMisconception;

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-h4 text-ink">Most common misconceptions</h2>
          <p className="text-sm text-ink-faint">
            Share of the students who were asked, not of the whole class
          </p>
        </div>
        <div className="flex gap-6">
          <Stat label="Students" value={rollup.classSize} />
          <Stat label="Finished" value={rollup.completed} />
          <Stat label="Found" value={rows.filter((r) => r.revealed > 0).length} />
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="text-ink-muted">Nothing recorded yet.</p>
      ) : (
        <ol className="flex flex-col">
          {rows.map((row, i) => (
            <li
              key={row.misconception.id}
              className={cn(
                "flex flex-col gap-3 py-5",
                i > 0 && "border-t border-hairline-soft",
              )}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex min-w-0 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      data-numeric
                      className="text-sm text-ink-faint tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-md text-ink">{row.misconception.name}</h3>
                    <DomainChip domain={row.misconception.domain} />
                  </div>
                  <p className="max-w-xl text-ink-muted">
                    {row.misconception.description}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end">
                  <span data-numeric className="text-h3 text-ink">
                    {formatPrevalence(row.prevalence)}
                  </span>
                  <span data-numeric className="text-sm text-ink-faint">
                    {row.revealed} of {row.exposed} asked
                  </span>
                </div>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-pill bg-track/50">
                <div
                  className={cn(
                    "h-full rounded-pill transition-[width] duration-700 ease-out",
                    SEV_BAR[severity(row.prevalence)],
                  )}
                  style={{ width: `${(row.prevalence ?? 0) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ol>
      )}

      {note && <p className="text-sm text-ink-faint">{note}</p>}
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-end">
      <span data-numeric className="text-h4 text-ink">
        {value}
      </span>
      <span className="text-sm text-ink-faint">{label}</span>
    </div>
  );
}

/** Domain summary strip -- uses the categorical palette. */
export function DomainStrip({ rollup }: { rollup: ClassRollup }) {
  if (rollup.byDomain.length === 0) return null;
  return (
    <Card className="flex flex-col gap-4">
      <span className="text-sm text-ink-faint">By topic</span>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rollup.byDomain.map((d) => (
          <li
            key={d.domain}
            className="flex items-center justify-between gap-3 rounded-[16px] bg-surface-2 px-4 py-3 ring-hairline"
          >
            <DomainChip domain={d.domain} />
            <span data-numeric className="text-md text-ink">
              {formatPrevalence(d.prevalence)}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
