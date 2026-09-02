import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Accordion({ items }: { items: { q: ReactNode; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex w-full flex-col gap-3">
      {items.map((item, i) => (
        <AccordionRow
          key={i}
          question={item.q}
          answer={item.a}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  );
}

function AccordionRow({
  question,
  answer,
  open,
  onToggle,
}: {
  question: ReactNode;
  answer: ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();

  return (
    <div className="rounded-[16px] bg-surface ring-hairline">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-ink"
      >
        <span>{question}</span>
        <span
          aria-hidden="true"
          className={cn(
            "relative size-4 shrink-0 text-ink-muted transition-transform duration-200 ease-out",
            open && "rotate-45",
          )}
        >
          <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
          <span className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current" />
        </span>
      </button>
      <div
        id={id}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-ink-muted">{answer}</p>
        </div>
      </div>
    </div>
  );
}
