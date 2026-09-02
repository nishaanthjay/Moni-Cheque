import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap " +
  "transition-[background-color,box-shadow,opacity,transform] duration-150 ease-out " +
  "disabled:opacity-40 disabled:pointer-events-none active:translate-y-px";

const VARIANTS: Record<Variant, string> = {
  // 12px radius + the accent-tinted ring from the reference. Text is
  // --color-ink-inverted, not white: white on this cyan measures 1.58:1,
  // dark ink measures 11.5:1.
  primary:
    "bg-accent text-ink-inverted rounded-[12px] ring-accent hover:brightness-110",
  // 50px pill + hairline ring.
  secondary:
    "bg-surface text-ink rounded-pill ring-hairline hover:bg-surface-2",
  ghost:
    "bg-transparent text-ink-muted rounded-ctl hover:bg-white/5 hover:text-ink",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-5 text-base",
  lg: "h-12 px-6 text-base",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  to?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  to,
  className,
  children,
  ...rest
}: Props) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
