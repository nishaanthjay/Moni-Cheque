import { DOMAIN_LABELS, type Domain } from "@/content/types";

/**
 * Domain identity chip.
 *
 * Domains are nominal categories, so hue is a legitimate encoding here.
 * Prevalence is the opposite case -- see RollupTable, where colour is
 * deliberately redundant because a green "78%" would read as good news.
 */
const TINT: Record<Domain, string> = {
  banking: "var(--color-domain-banking)",
  credit: "var(--color-domain-credit)",
  spending: "var(--color-domain-spending)",
  saving: "var(--color-domain-saving)",
  income: "var(--color-domain-income)",
  risk: "var(--color-domain-risk)",
};

export function DomainChip({ domain }: { domain: Domain }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-pill px-2 py-0.5 text-sm"
      style={{
        color: TINT[domain],
        backgroundColor: `color-mix(in srgb, ${TINT[domain]} 12%, transparent)`,
      }}
    >
      <span
        className="size-1.5 rounded-pill"
        style={{ backgroundColor: TINT[domain] }}
        aria-hidden="true"
      />
      {DOMAIN_LABELS[domain]}
    </span>
  );
}
