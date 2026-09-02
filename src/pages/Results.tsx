import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Display } from "@/components/ui/Display";
import { DomainChip } from "@/components/ui/DomainChip";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/layout/Container";
import { getMisconception, MISCONCEPTIONS } from "@/content/misconceptions";
import { clearRun, loadRun } from "@/lib/session";
import { exposureFor } from "@/lib/exposure";

/**
 * Student-facing result.
 *
 * Deliberately not a score. A percentage would put this straight back into
 * right/wrong framing, which is the thing the product exists to avoid. What a
 * student sees is which ideas are worth another look, in plain language.
 */
export function Results() {
  const [params] = useSearchParams();
  const code = params.get("code") ?? "";
  const run = code ? loadRun(code) : null;
  const responses = run?.responses ?? [];

  const revealedIds = [
    ...new Set(responses.map((r) => r.reveals).filter((r): r is string => !!r)),
  ];
  const revealed = revealedIds
    .map(getMisconception)
    .filter((m) => m !== undefined);

  const asked = exposureFor(responses).size;
  const minutes = Math.max(
    1,
    Math.round(responses.reduce((n, r) => n + r.elapsedMs, 0) / 60000),
  );

  return (
    <Section className="pt-16">
      <Container width="narrow">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <Pill dot="positive">Session {code || "--"}</Pill>
            <Display as="h1" size="h1" accent="finished.">
              You're
            </Display>
            <p className="max-w-md text-ink-muted">
              Nothing here is a score and nothing was marked right or wrong.
              These are the ideas your choices suggest are worth another look.
            </p>
          </div>
        </Reveal>

        {responses.length > 0 && (
          <Reveal delay={70} className="mt-10">
            <div className="grid grid-cols-3 gap-3">
              <Tile label="Decisions" value={responses.length} tone="accent" />
              <Tile label="Ideas checked" value={asked} tone="positive" />
              <Tile label="Minutes" value={minutes} tone="muted" />
            </div>
          </Reveal>
        )}

        <Reveal delay={140} className="mt-6">
          <Card className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-h4 text-ink">Worth another look</h2>
              {responses.length > 0 && (
                <span data-numeric className="text-sm text-ink-faint">
                  {revealed.length} of {MISCONCEPTIONS.length} tracked
                </span>
              )}
            </div>

            {responses.length === 0 ? (
              <p className="text-ink-muted">
                No run was found for this code in this browser. If you started on
                a different device, your answers are there instead.
              </p>
            ) : revealed.length === 0 ? (
              <p className="text-ink-muted">
                Nothing came up. Your choices didn't point at any of the
                misconceptions this set looks for.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {revealed.map((m) => (
                  <li key={m.id}>
                    <Card nested className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-md text-ink">{m.name}</h3>
                        <DomainChip domain={m.domain} />
                      </div>
                      <p className="text-ink-muted">{m.description}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </Reveal>

        <Reveal delay={200} className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              if (code) clearRun(code);
              window.location.href = `/run?code=${encodeURIComponent(code)}`;
            }}
          >
            Run it again
          </Button>
          <Button to="/" variant="ghost">
            Back to overview
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

function Tile({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "accent" | "positive" | "muted";
}) {
  const TONE = {
    accent: "text-accent",
    positive: "text-positive",
    muted: "text-ink",
  } as const;
  return (
    <Card nested className="flex flex-col items-center gap-1 py-5">
      <span data-numeric className={`text-h3 ${TONE[tone]}`}>
        {value}
      </span>
      <span className="text-sm text-ink-faint">{label}</span>
    </Card>
  );
}
