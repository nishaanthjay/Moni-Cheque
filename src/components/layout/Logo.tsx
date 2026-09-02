import { Link } from "react-router-dom";

export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2.5 text-ink">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="var(--color-accent)" />
        <path
          d="M16 7.5 19.1 13 24.6 16 19.1 19 16 24.5 12.9 19 7.4 16 12.9 13Z"
          fill="var(--color-ink-inverted)"
        />
      </svg>
      <span className="text-md">Moni-Cheque</span>
    </Link>
  );
}
