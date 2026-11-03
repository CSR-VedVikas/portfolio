export function Logo({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" fill="#C8411E" />
      <path d="M7 7 L16 25 L25 7 H20.6 L16 17 L11.4 7 Z" fill="#F4F2ED" />
    </svg>
  );
}
