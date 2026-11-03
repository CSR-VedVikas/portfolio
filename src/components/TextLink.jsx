import { Link } from "react-router-dom";

const base =
  "underline decoration-signal decoration-[1.5px] underline-offset-4 hover:text-signal";

export function TextLink({ href, children, className = "", testid, download }) {
  if (download) {
    return (
      <a href={href} download data-testid={testid} className={`${base} ${className}`}>
        {children}
      </a>
    );
  }
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" data-testid={testid} className={`${base} ${className}`}>
        {children}
      </a>
    );
  }
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} data-testid={testid} className={`${base} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} data-testid={testid} className={`${base} ${className}`}>
      {children}
    </Link>
  );
}
