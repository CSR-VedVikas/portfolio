const ITEMS = [
  "Full-stack web applications",
  "Applied machine learning",
  "Security",
  "Hardware verification",
  "Antenna design",
];

function Sequence() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((it) => (
        <span
          key={it}
          className="flex items-center font-mono text-[13px] uppercase tracking-[0.06em] text-muted whitespace-nowrap"
        >
          <span className="px-6 md:px-10">{it}</span>
          <span className="text-signal">/</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="border-t border-hairline overflow-hidden py-3 no-print" data-testid="marquee">
      <div className="flex w-max animate-marquee">
        <Sequence />
        <div aria-hidden="true">
          <Sequence />
        </div>
      </div>
    </div>
  );
}
