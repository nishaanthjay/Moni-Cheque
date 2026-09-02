import type { ReactNode } from "react";

/**
 * Icon set.
 *
 * Icons are UI chrome, not product content, so these are real rather than
 * placeholders. Drawn on a 24px grid at 1.5px stroke to match the reference
 * design's light monoline treatment -- nothing filled, nothing heavy.
 */

export type IconName =
  | "branch"
  | "chart"
  | "shield"
  | "clock"
  | "layers"
  | "export";

const PATHS: Record<IconName, ReactNode> = {
  /* branching decision tree -- the scenario model */
  branch: (
    <>
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="19" cy="6" r="1.8" />
      <circle cx="19" cy="18" r="1.8" />
      <path d="M6.8 12h2.7a2 2 0 0 0 2-2V8a2 2 0 0 1 2-2h3.7" />
      <path d="M6.8 12h2.7a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h3.7" />
    </>
  ),
  /* prevalence bars -- the rollup */
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 17V9M12 17V5M17 17v-5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.2l2.6 1.6" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 17 8 4 8-4" />
    </>
  ),
  export: (
    <>
      <path d="M12 3v11" />
      <path d="m8 7 4-4 4 4" />
      <path d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" />
    </>
  ),
};

export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

/** Icon in the reference design's small rounded chip. */
export function IconChip({ name }: { name: IconName }) {
  return (
    <span className="flex size-10 items-center justify-center rounded-ctl bg-white/5 text-ink-muted ring-hairline">
      <Icon name={name} />
    </span>
  );
}
