import { Link } from "react-router-dom";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-hairline-soft py-10">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Logo />
          <div className="flex items-center gap-6 text-sm text-ink-muted">
            <Link to="/" className="hover:text-ink">Overview</Link>
            <Link to="/join" className="hover:text-ink">Join</Link>
            <Link to="/teacher" className="hover:text-ink">Teacher</Link>
          </div>
          <p className="text-sm text-ink-faint">
            Diamond Challenge entry &middot; work in progress
          </p>
        </div>
      </Container>
    </footer>
  );
}
