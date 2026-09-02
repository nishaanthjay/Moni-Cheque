import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The eyebrow pill that precedes nearly every section heading on the
 * reference design: 999px radius, surface fill, hairline ring, 12px muted
 * text, optional status dot.
 */
export function Pill({
  children,
  dot,
  className,
}: {
  children: ReactNode;
  dot?: "positive" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill bg-surface px-3 py-1.5",
        "text-sm text-ink-muted ring-hairline",
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            "size-1.5 rounded-pill",
            dot === "positive"
              ? "bg-positive glow-positive"
              : "bg-accent",
          )}
        />
      )}
      {children}
    </span>
  );
}

/** Small numeric delta chip used on stat tiles. */
export function DeltaPill({
  children,
  tone = "positive",
}: {
  children: ReactNode;
  tone?: "positive" | "neutral";
}) {
  return (
    <span
      data-numeric
      className={cn(
        "rounded-pill px-2 py-0.5 text-sm",
        tone === "positive"
          ? "bg-positive-soft text-positive"
          : "bg-white/5 text-ink-faint",
      )}
    >
      {children}
    </span>
  );
}
