import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Display } from "@/components/ui/Display";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/layout/Container";
import { SCENARIOS } from "@/content/scenarios";
import type { Choice, Response } from "@/content/types";
import { loadRun, saveRun, startRun, type SessionRun } from "@/lib/session";
import { cn } from "@/lib/cn";

/** Total steps across every scenario -- used for the progress bar. */
const TOTAL_STEPS = SCENARIOS.reduce((n, s) => n + s.steps.length, 0);

/** Where the student currently is: which scenario, which step inside it. */
interface Cursor {
  scenarioIndex: number;
  stepId: string;
}

const FIRST: Cursor | null = SCENARIOS.length
  ? { scenarioIndex: 0, stepId: SCENARIOS[0].entryStepId }
  : null;

/**
 * Advance past a choice.
 *
 * A `null` next ends the current scenario rather than the whole run -- the
 * student rolls on into the next scenario, and only falls off the end when
 * there are none left.
 */
function advance(cursor: Cursor, choice: Choice): Cursor | null {
  if (choice.next) return { ...cursor, stepId: choice.next };
  const nextIndex = cursor.scenarioIndex + 1;
  const next = SCENARIOS[nextIndex];
  return next ? { scenarioIndex: nextIndex, stepId: next.entryStepId } : null;
}

/** Replays stored answers to work out where a returning student left off. */
function resume(responses: readonly Response[]): Cursor | null {
  let cursor = FIRST;
  for (const r of responses) {
    if (!cursor) return null;
    const scenario = SCENARIOS[cursor.scenarioIndex];
    const step = scenario?.steps.find((s) => s.id === r.stepId);
    const choice = step?.choices.find((c) => c.id === r.choiceId);
    if (!choice) return cursor;
    cursor = advance(cursor, choice);
  }
  return cursor;
}

export function Run() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const code = params.get("code") ?? "";

  const [run, setRun] = useState<SessionRun | null>(null);
  const [cursor, setCursor] = useState<Cursor | null>(null);
  const [ready, setReady] = useState(false);
  const enteredAt = useRef<number>(Date.now());

  useEffect(() => {
    if (!code || !FIRST) { setReady(true); return; }
    const existing = loadRun(code) ?? startRun(code);
    setRun(existing);
    setCursor(resume(existing.responses));
    setReady(true);
  }, [code]);

  const scenario = cursor ? SCENARIOS[cursor.scenarioIndex] : undefined;
  const step = useMemo(
    () => scenario?.steps.find((s) => s.id === cursor?.stepId),
    [scenario, cursor],
  );

  useEffect(() => { enteredAt.current = Date.now(); }, [cursor?.stepId]);

  const answered = run?.responses.length ?? 0;

  function choose(choice: Choice) {
    if (!run || !scenario || !step || !cursor) return;

    const next = advance(cursor, choice);
    const updated: SessionRun = {
      ...run,
      responses: [
        ...run.responses,
        {
          scenarioId: scenario.id,
          stepId: step.id,
          choiceId: choice.id,
          reveals: choice.reveals,
          elapsedMs: Date.now() - enteredAt.current,
        },
      ],
      completedAt: next === null ? Date.now() : null,
    };

    saveRun(updated);
    setRun(updated);

    if (next === null) navigate(`/results?code=${encodeURIComponent(code)}`);
    else setCursor(next);
  }

  if (!ready) return null;

  if (!code) {
    return (
      <Empty
        title="No session code"
        body="This screen needs a session code. Head back and enter the one your teacher gave the class."
        action={<Button to="/join">Enter a code</Button>}
      />
    );
  }

  if (!SCENARIOS.length) {
    return (
      <Empty
        title="No scenarios loaded"
        body="The scenario set is empty, so there is nothing to run."
        action={<Button to="/" variant="secondary">Back to overview</Button>}
      />
    );
  }

  if (!step || !scenario) {
    return (
      <Empty
        title="Run complete"
        body="Every scenario in this set has been answered."
        action={
          <Button to={`/results?code=${encodeURIComponent(code)}`}>
            See results
          </Button>
        }
      />
    );
  }

  const pct = Math.round((answered / TOTAL_STEPS) * 100);

  return (
    <Section className="pt-12">
      <Container width="narrow">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Pill>Session {code}</Pill>
            <span className="text-sm text-ink-faint">{scenario.title}</span>
          </div>
          <span data-numeric className="text-sm text-ink-faint">
            {answered + 1} of {TOTAL_STEPS}
          </span>
        </div>

        <div
          className="mb-12 h-1 w-full overflow-hidden rounded-pill bg-track/50"
          role="progressbar"
          aria-valuenow={answered}
          aria-valuemin={0}
          aria-valuemax={TOTAL_STEPS}
          aria-label="Progress through the scenarios"
        >
          <div
            className="h-full rounded-pill bg-accent transition-[width] duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <Reveal key={`${scenario.id}:${step.id}`}>
          <Display as="h1" size="h2" className="mb-4">
            {step.prompt}
          </Display>
          {step.detail && <p className="text-lg text-ink-muted">{step.detail}</p>}

          <div className="mt-10 flex flex-col gap-3">
            {step.choices.map((choice, i) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => choose(choice)}
                className={cn(
                  "group flex items-center gap-4 rounded-[16px] bg-surface px-5 py-5 text-left text-md text-ink ring-hairline",
                  "transition-[background-color,box-shadow,transform] duration-150 ease-out",
                  "hover:bg-surface-2 hover:ring-accent active:translate-y-px",
                )}
              >
                <span
                  aria-hidden="true"
                  className="flex size-7 shrink-0 items-center justify-center rounded-pill bg-track/60 text-sm text-ink-muted transition-colors duration-150 group-hover:bg-accent group-hover:text-ink-inverted"
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {choice.label}
              </button>
            ))}
          </div>
        </Reveal>

        <p className="mt-10 text-sm text-ink-faint">
          There are no right answers here and nothing is being scored.
        </p>
      </Container>
    </Section>
  );
}

function Empty({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action: React.ReactNode;
}) {
  return (
    <Section className="pt-16">
      <Container width="narrow">
        <Card className="flex flex-col items-start gap-5">
          <Pill>Runner</Pill>
          <Display size="h2" as="h1">{title}</Display>
          <p className="text-ink-muted">{body}</p>
          <div className="mt-2">{action}</div>
        </Card>
      </Container>
    </Section>
  );
}
