import { Link } from "react-router-dom";

const LINKS = [
  { to: "/#work", label: "Work", id: "nav-work-link" },
  { to: "/#credentials", label: "Credentials", id: "nav-credentials-link" },
  { to: "/#contact", label: "Contact", id: "nav-contact-link" },
  { to: "/forgefit", label: "ForgeFit", id: "nav-forgefit-link" },
];

export default function Nav() {
  return (
    <header className="border-b border-hairline">
      <nav
        aria-label="Main"
        className="mx-auto max-w-6xl px-5 md:px-10 py-4 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2"
      >
        <Link
          to="/"
          data-testid="nav-home-link"
          className="font-mono text-[13px] uppercase tracking-[0.06em] hover:text-signal"
        >
          C S R VedVikas
        </Link>
        <ul className="flex flex-wrap items-baseline gap-x-6 md:gap-x-8 gap-y-1">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                data-testid={l.id}
                className="font-mono text-[13px] uppercase tracking-[0.06em] text-muted hover:text-signal"
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
