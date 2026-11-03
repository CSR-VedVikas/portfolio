import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MONO } from "../data/site.js";
import { TextLink } from "./TextLink.jsx";
import Marquee from "./Marquee.jsx";
import playShot from "../assets/images/PLAYBOOK_SCREENSHOT.png";

const ease = [0.16, 1, 0.3, 1];

function MaskedLine({ children, delay = 0 }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yName = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yShot = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} data-testid="hero" className="relative flex min-h-[100svh] flex-col justify-end pt-28 md:pt-36">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10 grid grid-cols-12 gap-x-6 items-end pb-10 md:pb-14">
        <motion.div style={{ y: yName }} className="col-span-12 lg:col-span-7">
          <FadeUp delay={0.05} className={`${MONO} text-muted`}>Portfolio — Bengaluru — 2027</FadeUp>
          <h1 className="font-serif leading-[0.88] mt-4 text-[clamp(3.8rem,11.5vw,11rem)]">
            <MaskedLine delay={0.15}>C S R</MaskedLine>
            <MaskedLine delay={0.28}>
              Ved<span className="italic">Vikas</span>
              <span className="text-signal">.</span>
            </MaskedLine>
          </h1>
          <FadeUp delay={0.45}>
            <p className="font-serif italic text-2xl md:text-[1.75rem] leading-snug mt-6" data-testid="hero-voice-line">
              Next: ForgeFit goes public, and two capstone papers go out.
            </p>
          </FadeUp>
          <FadeUp delay={0.55} className={`${MONO} text-muted mt-6 leading-relaxed max-w-measure`}>
            Final-year B.Tech Electronics &amp; Communication Engineering with a minor in Computer Science · PES
            University, Bengaluru · Batch 2023–2027
          </FadeUp>
        </motion.div>
        <motion.div style={{ y: yShot }} className="col-span-12 lg:col-span-5 mt-12 lg:mt-0" data-testid="hero-visual">
          <FadeUp delay={0.45}>
            <figure className="group">
              <div className="relative border border-hairline p-2">
                <img
                  src={playShot}
                  alt="Opening screen of the Cursor AI Beginner Playbook"
                  className="w-full h-auto"
                  data-testid="hero-featured-image"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(480px_at_50%_0%,rgba(200,65,30,0.28),transparent_70%)]"
                />
              </div>
              <figcaption className={`${MONO} text-muted mt-3 flex flex-wrap justify-between gap-4`}>
                <span>Featured — Cursor AI Beginner Playbook</span>
                <TextLink href="/playbook" testid="hero-playbook-link">
                  Open
                </TextLink>
              </figcaption>
            </figure>
          </FadeUp>
        </motion.div>
      </div>
      <FadeUp delay={0.7}>
        <Marquee />
      </FadeUp>
    </section>
  );
}
