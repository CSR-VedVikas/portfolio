import { Link } from "react-router-dom";
import { Logo } from "./Logo.jsx";

const LINKS = [
  { to: "/#work", label: "Work", id: "nav-work-link" },
  { to: "/#credentials", label: "Credentials", id: "nav-credentials-link" },
  { to: "/#contact", label: "Contact", id: "nav-contact-link" },
  { to: "/forgefit", label: "ForgeFit", id: "nav-forgefit-link" },
  { to: "/playbook", label: "Playbook", id: "nav-playbook-link" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 no-print bg-paper border-b border-hairline">
      <nav
        aria-label="Main"
        className="mx-auto max-w-6xl px-5 md:px-10 py-4 flex flex-wrap items-center justify-between gap-x-10 gap-y-2"
      >
        <Link to="/" data-testid="nav-home-link" className="flex items-center gap-3 group">
          <Logo className="h-6 w-6" />
          <span className="font-mono text-[13px] uppercase tracking-[0.06em] group-hover:text-signal-bright">
            C S R VedVikas
          </span>
        </Link>
        <ul className="flex flex-wrap items-baseline gap-x-6 md:gap-x-8 gap-y-1">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                data-testid={l.id}
                className="font-mono text-[13px] uppercase tracking-[0.06em] text-muted hover:text-signal-bright"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
