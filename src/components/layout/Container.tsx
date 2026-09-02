import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const WIDTHS = {
    narrow: "max-w-2xl",
    default: "max-w-[1180px]",
    wide: "max-w-[1400px]",
  };
  return (
    <div className={cn("mx-auto w-full px-6", WIDTHS[width], className)}>
      {children}
    </div>
  );
}

/** Sections carry the generous vertical rhythm; the air is load-bearing. */
export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28 lg:py-36", className)}>
      {children}
    </section>
  );
}
