import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

/**
 * Teacher-dashboard preview used as the hero visual.
 *
 * Every value is deliberately REDACTED rather than mocked. The product brief
 * warns that seed data in a repo gets mistaken for real pilot results, and no
 * pilot has run. Showing bars with no numbers demonstrates the layout without
 * putting a single fabricated percentage on screen.
 */

const ROWS = [
  { width: "78%", severity: "high" },
  { width: "64%", severity: "high" },
  { width: "45%", severity: "mid" },
  { width: "31%", severity: "mid" },
  { width: "19%", severity: "low" },
  { width: "12%", severity: "low" },
] as const;

const SEV_BG: Record<string, string> = {
  high: "bg-sev-high",
  mid: "bg-sev-mid",
  low: "bg-sev-low",
};

function Redacted({ w = "100%" }: { w?: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-2.5 rounded-pill bg-white/10 align-middle"
      style={{ width: w }}
    />
  );
}

export function DashboardMock() {
  return (
    <Card className="w-full">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-ink-faint">Class rollup</span>
          <Redacted w="150px" />
        </div>
        <Pill dot="positive">Preview &mdash; no data</Pill>
      </div>

      {/* Summary tiles: labels are UI chrome, figures are withheld. */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {["Students completed", "Misconceptions found", "Median time"].map(
          (label) => (
            <Card key={label} nested className="flex flex-col gap-3">
              <span className="text-sm text-ink-faint">{label}</span>
              <Redacted w="60%" />
            </Card>
          ),
        )}
      </div>

      {/* Prevalence rows -- the core of the dashboard. */}
      <Card nested className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-muted">
            Most common misconceptions
          </span>
          <span className="text-sm text-ink-faint">% of students asked</span>
        </div>

        <div className="flex flex-col gap-3.5">
          {ROWS.map((row, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <Redacted w={`${38 + ((i * 13) % 34)}%`} />
                <span className="text-sm text-ink-faint">&ndash;&ndash;</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-pill bg-track/50">
                <div
                  className={cn("h-full rounded-pill opacity-70", SEV_BG[row.severity])}
                  style={{ width: row.width }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <p className="mt-5 text-sm text-ink-faint">
        Values are withheld, not sampled. No pilot has been run and this repo
        contains no results data.
      </p>
    </Card>
  );
}
