import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Display } from "@/components/ui/Display";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/layout/Container";
import { joinCopy } from "@/content/copy";
import { isCompleteCode, normaliseCode } from "@/lib/session";

/**
 * Session-code entry.
 *
 * There is exactly one input on this screen and it takes a class session code.
 * No name field, no email field, no "who are you" step -- that absence is the
 * COPPA-aware claim, and adding one here would break it.
 */
export function Join() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const ready = isCompleteCode(code);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!ready) {
      setError("Enter all six characters of the code.");
      return;
    }
    setError(null);
    navigate(`/run?code=${encodeURIComponent(normaliseCode(code))}`);
  }

  return (
    <Section className="pt-16">
      <Container width="narrow">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <Pill dot="positive">Anonymous session</Pill>
            <Display
              as="h1"
              size="h1"
              accent={joinCopy.headlineAccent}
            >
              {joinCopy.headline}
            </Display>
            <p className="max-w-md text-ink-muted">
              {joinCopy.subhead}
            </p>
          </div>
        </Reveal>

        <Reveal delay={90} className="mt-12">
          <Card>
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <label htmlFor="code" className="text-sm text-ink-muted">
                Session code
              </label>

              <input
                id="code"
                name="code"
                value={code}
                onChange={(e) => {
                  setCode(normaliseCode(e.target.value));
                  setError(null);
                }}
                placeholder="ABC-123"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                inputMode="text"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "code-error" : undefined}
                data-numeric
                className="w-full rounded-[16px] bg-surface-2 px-5 py-4 text-center text-h3 text-ink ring-hairline placeholder:text-ink-faint focus:outline-none focus-visible:ring-accent"
              />

              {error && (
                <p
                  id="code-error"
                  role="alert"
                  className="flex items-center gap-2 text-sm text-danger"
                >
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                    className="shrink-0" aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7.5v5M12 16.2v.1" />
                  </svg>
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" disabled={!ready}>
                Start
              </Button>
            </form>
          </Card>
        </Reveal>

        <Reveal delay={160} className="mt-6">
          <div className="flex items-start gap-3 rounded-[16px] bg-surface px-5 py-4 ring-hairline">
            <span
              aria-hidden="true"
              className="mt-1 size-1.5 shrink-0 rounded-pill bg-positive"
            />
            <p className="text-sm text-ink-muted">
              {joinCopy.privacyNote}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
