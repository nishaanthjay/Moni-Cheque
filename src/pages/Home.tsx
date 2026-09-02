import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { BloomCard, Card } from "@/components/ui/Card";
import { Display, SectionHeader } from "@/components/ui/Display";
import { IconChip, type IconName } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/layout/Container";
import { DashboardMock } from "@/components/sections/DashboardMock";
import { homeCopy } from "@/content/copy";

/* Icon order for the feature grid. Chrome, not content -- safe to reorder
   to match whatever the six features turn out to be. */
const FEATURE_ICONS: IconName[] = [
  "branch",
  "chart",
  "shield",
  "clock",
  "layers",
  "export",
];

export function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <Section className="pt-16 sm:pt-20 lg:pt-24">
        <Container>
          <div className="flex flex-col items-center gap-7 text-center">
            <Reveal>
              <Pill dot="positive">
                {homeCopy.hero.eyebrow}
              </Pill>
            </Reveal>

            <Reveal delay={70}>
              <Display
                as="h1"
                size="display"
                accent={homeCopy.hero.headlineAccent}
                className="max-w-4xl"
              >
                {homeCopy.hero.headline}
              </Display>
            </Reveal>

            <Reveal delay={140}>
              <p className="max-w-xl text-ink-muted">
                {homeCopy.hero.subhead}
              </p>
            </Reveal>

            <Reveal delay={210}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button to="/join" size="lg">
                  {homeCopy.hero.primaryCta}
                </Button>
                <Button to="/teacher" size="lg" variant="secondary">
                  {homeCopy.hero.secondaryCta}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={280} className="mt-20 sm:mt-24">
            <BloomCard className="mx-auto max-w-4xl">
              <DashboardMock />
            </BloomCard>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------- problem */}
      <Section className="py-16 sm:py-20 lg:py-24">
        <Container width="narrow">
          <Reveal>
            <div className="flex flex-col items-center gap-6 border-y border-hairline-soft py-16 text-center">
              <Pill>
                {homeCopy.problem.eyebrow}
              </Pill>
              <Display
                size="h2"
                accent={homeCopy.problem.headlineAccent}
              >
                {homeCopy.problem.headline}
              </Display>
              <p className="max-w-md text-ink-muted">
                {homeCopy.problem.subhead}
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- how */}
      <Section id="how">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={<Pill>{homeCopy.how.eyebrow}</Pill>}
              headline={homeCopy.how.headline}
              accent={homeCopy.how.headlineAccent}
              subhead={homeCopy.how.subhead}
            />
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {homeCopy.how.steps.map((step, i) => (
              <Reveal key={i} delay={i * 70}>
                <Card className="h-full">
                  <span
                    data-numeric
                    className="mb-5 inline-flex size-8 items-center justify-center rounded-ctl bg-accent-soft text-sm text-accent"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mb-2 text-md">
                    {step.title}
                  </h3>
                  <p className="text-ink-muted">
                    {step.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ features */}
      <Section id="features">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={<Pill>{homeCopy.features.eyebrow}</Pill>}
              headline={homeCopy.features.headline}
              accent={homeCopy.features.headlineAccent}
              subhead={homeCopy.features.subhead}
            />
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeCopy.features.items.map((item, i) => (
              <Reveal key={i} delay={(i % 3) * 70}>
                <Card interactive className="h-full">
                  <div className="mb-5">
                    <IconChip name={FEATURE_ICONS[i]} />
                  </div>
                  <h3 className="mb-2 text-md">
                    {item.title}
                  </h3>
                  <p className="text-ink-muted">
                    {item.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- privacy */}
      <Section id="privacy">
        <Container>
          <Reveal>
            <Card className="overflow-hidden">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div className="flex flex-col items-start gap-5">
                  <Pill dot="positive">
                    {homeCopy.privacy.eyebrow}
                  </Pill>
                  <Display size="h2" accent={homeCopy.privacy.headlineAccent}>
                    {homeCopy.privacy.headline}
                  </Display>
                  <p className="text-ink-muted">
                    {homeCopy.privacy.body}
                  </p>
                </div>

                <ul className="flex flex-col gap-4">
                  {homeCopy.privacy.points.map((point, i) => (
                    <li key={i}>
                      <Card nested className="flex gap-4">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-pill bg-positive-soft"
                        >
                          <span className="size-1.5 rounded-pill bg-positive" />
                        </span>
                        <div>
                          <h3 className="mb-1 text-base text-ink">
                            {point.title}
                          </h3>
                          <p className="text-ink-muted">
                            {point.body}
                          </p>
                        </div>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- faq */}
      <Section id="faq">
        <Container width="narrow">
          <Reveal>
            <SectionHeader
              eyebrow={<Pill>{homeCopy.faq.eyebrow}</Pill>}
              headline={homeCopy.faq.headline}
              accent={homeCopy.faq.headlineAccent}
              subhead={homeCopy.faq.subhead}
            />
          </Reveal>

          <Reveal delay={70} className="mt-14">
            <Accordion
              items={homeCopy.faq.items.map((item) => ({
                q: item.q,
                a: item.a,
              }))}
            />
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------- closing */}
      <Section>
        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-6 text-center">
              <Display
                size="h1"
                accent={homeCopy.closing.headlineAccent}
                className="max-w-3xl"
              >
                {homeCopy.closing.headline}
              </Display>
              <p className="max-w-md text-ink-muted">
                {homeCopy.closing.subhead}
              </p>
              <Button to="/join" size="lg">
                {homeCopy.closing.cta}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
