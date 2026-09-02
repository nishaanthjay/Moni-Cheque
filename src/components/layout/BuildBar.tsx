import { MISCONCEPTIONS } from "@/content/misconceptions";
import { SCENARIOS } from "@/content/scenarios";

/**
 * Demo-content banner.
 *
 * The scenarios and misconception taxonomy in this build were written to
 * demonstrate the tool, not derived from student data or reviewed by an
 * educator. That has to be visible while anyone is looking at it.
 *
 * Delete this component once the content is real.
 */
export function BuildBar() {
  const steps = SCENARIOS.reduce((n, s) => n + s.steps.length, 0);

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 px-4">
      <div className="flex items-center gap-2.5 rounded-pill bg-glass px-4 py-2 text-sm whitespace-nowrap shadow-lifted ring-hairline backdrop-blur-[10px]">
        <span className="size-1.5 shrink-0 rounded-pill bg-accent" />
        <span className="text-ink">Demo content</span>
        <span className="text-ink-faint">&middot;</span>
        <span className="text-ink-muted">
          <span data-numeric>{MISCONCEPTIONS.length}</span> misconceptions,{" "}
          <span data-numeric>{SCENARIOS.length}</span> scenarios,{" "}
          <span data-numeric>{steps}</span> steps
        </span>
        <span className="hidden text-ink-faint sm:inline">&middot;</span>
        <span className="hidden text-ink-faint sm:inline">not classroom-tested</span>
      </div>
    </div>
  );
}
