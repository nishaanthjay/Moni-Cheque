import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/Display";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/layout/Container";
import { DashboardMock } from "@/components/sections/DashboardMock";
import { DomainStrip, RollupTable } from "@/components/sections/RollupTable";
import { teacherCopy } from "@/content/copy";
import { MISCONCEPTIONS } from "@/content/misconceptions";
import { SCENARIOS } from "@/content/scenarios";
import { rollUpClass } from "@/lib/aggregate";
import { simulateClass } from "@/lib/demo";
import { exposureFor } from "@/lib/exposure";
import { generateSessionCode } from "@/lib/session";

const CLASS_SIZE = 24;

export function Teacher() {
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  // Runs the real aggregation over simulated students -- same code path a
  // real class would take.
  const rollup = useMemo(
    () => (showDemo ? rollUpClass(simulateClass(CLASS_SIZE), exposureFor) : null),
    [showDemo],
  );

  async function copyCode(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Section className="pt-16">
      <Container>
        <Reveal>
          <SectionHeader
            align="left"
            size="h1"
            eyebrow={<Pill>Teacher</Pill>}
            headline={teacherCopy.headline}
            accent={teacherCopy.headlineAccent}
            subhead={teacherCopy.subhead}
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
          <Reveal delay={70} className="flex flex-col gap-6 lg:sticky lg:top-24">
            <Card className="flex flex-col gap-5">
              <span className="text-sm text-ink-faint">Start a class session</span>

              {code ? (
                <>
                  <p
                    data-numeric
                    className="rounded-[16px] bg-surface-2 py-4 text-center text-h2 text-accent ring-hairline"
                    aria-live="polite"
                  >
                    {code}
                  </p>
                  <p className="text-sm text-ink-muted">
                    Read this out or put it on the board. It identifies the class
                    run, not a student.
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={() => copyCode(code)} className="flex-1">
                      {copied ? "Copied" : "Copy code"}
                    </Button>
                    <Button variant="secondary" onClick={() => setCode(null)}>
                      Reset
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-ink-muted">
                    Generates a six-character code. Nothing about the class or
                    the students is stored with it.
                  </p>
                  <Button size="lg" onClick={() => setCode(generateSessionCode())}>
                    Generate code
                  </Button>
                </>
              )}
            </Card>

            <Card className="flex flex-col gap-4">
              <span className="text-sm text-ink-faint">Content loaded</span>
              <dl className="flex flex-col gap-2.5">
                <Row label="Misconceptions" value={MISCONCEPTIONS.length} />
                <Row label="Scenarios" value={SCENARIOS.length} />
                <Row
                  label="Steps"
                  value={SCENARIOS.reduce((n, s) => n + s.steps.length, 0)}
                />
              </dl>
              <p className="text-sm text-ink-faint">
                Demo content, written to show the tool working. Not reviewed by
                an educator and not classroom-tested.
              </p>
            </Card>
          </Reveal>

          <Reveal delay={140} className="flex flex-col gap-6">
            {rollup ? (
              <>
                <div className="flex items-center justify-between gap-4 rounded-[16px] bg-sev-mid/10 px-5 py-4 ring-1 ring-sev-mid/25">
                  <p className="text-sm text-ink-muted">
                    <span className="text-ink">Simulated class of {CLASS_SIZE}.</span>{" "}
                    Generated to exercise the rollup. No pilot has been run and
                    none of these figures describe real students.
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => setShowDemo(false)}>
                    Clear
                  </Button>
                </div>
                <RollupTable
                  rollup={rollup}
                  note="Percentages are computed by the same aggregation a real class would use, over simulated responses."
                />
                <DomainStrip rollup={rollup} />
              </>
            ) : (
              <>
                <Card className="flex flex-col items-start gap-4">
                  <h2 className="text-h3 text-ink">No results yet</h2>
                  <p className="max-w-xl text-ink-muted">{teacherCopy.emptyState}</p>
                  <Button className="mt-2" onClick={() => setShowDemo(true)}>
                    Load a simulated class
                  </Button>
                  <p className="text-sm text-ink-faint">
                    Runs {CLASS_SIZE} synthetic students through the real
                    scenarios so you can see how a rollup reads.
                  </p>
                </Card>
                <DashboardMock />
              </>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-ink-muted">{label}</dt>
      <dd data-numeric className={value === 0 ? "text-ink-faint" : "text-ink"}>
        {value}
      </dd>
    </div>
  );
}
