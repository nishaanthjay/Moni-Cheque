import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { Container } from "./Container";

/** Route labels are UI chrome, not product content -- these are final. */
const LINKS = [
  { to: "/", label: "Overview" },
  { to: "/join", label: "Join a session" },
  { to: "/teacher", label: "Teacher dashboard" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the drawer on navigation and on Escape. */
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-200",
        (scrolled || open) && "bg-glass backdrop-blur-[10px]",
      )}
      style={
        scrolled || open
          ? { boxShadow: "0 1px 0 0 var(--color-hairline)" }
          : undefined
      }
    >
      <Container>
        <nav className="flex h-16 items-center justify-between gap-6">
          <Logo />

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-ctl px-3 py-2 transition-colors duration-150",
                    isActive
                      ? "text-ink"
                      : "text-ink-muted hover:bg-white/5 hover:text-ink",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button to="/join" size="sm">
                Enter session code
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-9 items-center justify-center rounded-ctl text-ink-muted ring-hairline transition-colors duration-150 hover:text-ink md:hidden"
            >
              <span className="relative block h-3 w-4" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 h-px w-4 bg-current transition-transform duration-200",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-px w-4 bg-current transition-opacity duration-200",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-4 bg-current transition-transform duration-200",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile drawer. Height-animated so it matches the accordion. */}
      <div
        id="mobile-nav"
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <Container>
            <div className="flex flex-col gap-1 border-t border-hairline-soft py-4">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-ctl px-3 py-3 text-md transition-colors duration-150",
                      isActive
                        ? "bg-white/5 text-ink"
                        : "text-ink-muted hover:text-ink",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 flex flex-col sm:hidden">
                <Button to="/join" size="lg">
                  Enter session code
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
