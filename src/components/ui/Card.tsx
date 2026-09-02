import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The workhorse surface: #0d0d0d, 24px radius, separated from the ground by a
 * hairline box-shadow ring rather than a border.
 */
export function Card({
  children,
  className,
  nested = false,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  /** Nested cards sit on a slightly lighter fill at a smaller radius. */
  nested?: boolean;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "ring-hairline",
        nested
          ? "rounded-[16px] bg-surface-2 p-4"
          : "rounded-card bg-surface p-6 sm:p-8",
        interactive &&
          "transition-colors duration-150 ease-out hover:bg-surface-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Card with a violet bloom behind it, for hero-adjacent visuals. */
export function BloomCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="bloom">
      <div className="bloom-layer" aria-hidden="true" />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
