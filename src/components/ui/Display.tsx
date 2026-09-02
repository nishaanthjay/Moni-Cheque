import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The reference design's defining typographic move: a display heading in the
 * geometric grotesque whose closing phrase is set in italic Instrument Serif
 * at the same size. Without this pairing the page reads as generic dark mode.
 */
export function Display({
  children,
  accent,
  as: Tag = "h2",
  size = "h1",
  className,
}: {
  children: ReactNode;
  /** The closing phrase, rendered in italic serif. */
  accent?: ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  size?: "display" | "h1" | "h2" | "h3";
  className?: string;
}) {
  const SIZES: Record<string, string> = {
    display: "text-h3 sm:text-h2 lg:text-display",
    h1: "text-h3 sm:text-h2 lg:text-h1",
    h2: "text-h4 sm:text-h3 lg:text-h2",
    h3: "text-lg sm:text-h4 lg:text-h3",
  };

  return (
    <Tag className={cn(SIZES[size], "text-ink", className)}>
      {children}
      {accent && (
        <>
          {" "}
          <span className="font-serif italic font-normal">{accent}</span>
        </>
      )}
    </Tag>
  );
}

/** Centred eyebrow + display heading + subhead, the standard section opener. */
export function SectionHeader({
  eyebrow,
  headline,
  accent,
  subhead,
  align = "center",
  size = "h1",
}: {
  eyebrow?: ReactNode;
  headline: ReactNode;
  accent?: ReactNode;
  subhead?: ReactNode;
  align?: "center" | "left";
  size?: "display" | "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
      )}
    >
      {eyebrow}
      <Display size={size} accent={accent}>
        {headline}
      </Display>
      {subhead && (
        <p className={cn("max-w-lg text-ink-muted", align === "center" && "mx-auto")}>
          {subhead}
        </p>
      )}
    </div>
  );
}
