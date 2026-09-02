import { Button } from "@/components/ui/Button";
import { Display } from "@/components/ui/Display";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/layout/Container";

export function NotFound() {
  return (
    <Section className="pt-24">
      <Container width="narrow">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <Pill>404</Pill>
            <Display as="h1" size="h1" accent="here.">
              Nothing
            </Display>
            <p className="max-w-sm text-ink-muted">
              That page doesn't exist. If you were given a session code, enter
              it on the join screen.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Button to="/join">Enter session code</Button>
              <Button to="/" variant="secondary">
                Back to overview
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
