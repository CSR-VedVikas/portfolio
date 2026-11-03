export default function Section({
  id,
  numeral,
  label,
  title,
  as: Heading = "h2",
  titleClassName = "text-4xl md:text-6xl",
  children,
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-signal">
      <div className="mx-auto max-w-6xl px-5 md:px-10 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-4">
          {numeral && (
            <p
              aria-hidden="true"
              className="col-span-12 md:col-span-2 font-serif text-signal leading-[0.85] text-6xl md:text-[8rem]"
            >
              {numeral}
            </p>
          )}
          <div className={`col-span-12 ${numeral ? "md:col-span-10 md:mt-6" : "md:col-span-8"}`}>
            {label && <p className="font-mono text-xs uppercase tracking-[0.06em] text-muted">{label}</p>}
            <Heading id={`${id}-heading`} className={`font-serif leading-[1.02] mt-2 ${titleClassName}`}>
              {title}
            </Heading>
          </div>
        </div>
        <div className="mt-8 md:mt-14 grid grid-cols-12 gap-x-6 gap-y-6">{children}</div>
      </div>
    </section>
  );
}
