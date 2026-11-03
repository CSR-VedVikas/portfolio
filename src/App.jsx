import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import ForgeFit from "./pages/ForgeFit.jsx";
import Playbook from "./pages/Playbook.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "3rem", fontFamily: "monospace", color: "#F4F2ED", background: "#141210" }}>
          Something broke while rendering. <a href="/">Reload the site</a>.
        </div>
      );
    }
    return this.props.children;
  }
}

const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E";

function GridLines() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden md:block no-print">
      <div className="mx-auto max-w-6xl h-full px-5 md:px-10">
        <div className="grid grid-cols-12 h-full">
          <div className="col-start-3 col-end-4 border-l border-ink/[0.05]" />
          <div className="col-start-5 col-end-6 border-l border-ink/[0.05]" />
          <div className="col-start-7 col-end-8 border-l border-ink/[0.05]" />
          <div className="col-start-9 col-end-10 border-l border-ink/[0.05]" />
          <div className="col-start-11 col-end-12 border-l border-ink/[0.05]" />
        </div>
      </div>
    </div>
  );
}

function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] no-print"
      style={{ backgroundImage: `url("${NOISE}")` }}
    />
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      if (window.__lenis) window.__lenis.scrollTo(el, { offset: -88, duration: 1.1 });
      else el.scrollIntoView();
    } else if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function Footer() {
  const toTop = () => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo(0, 0));
  return (
    <footer className="border-t border-hairline no-print relative z-10">
      <div className="mx-auto max-w-6xl px-5 md:px-10 py-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.06em] text-muted">© 2027 C S R VedVikas — Bengaluru, India</p>
        <p className="font-mono text-xs uppercase tracking-[0.06em] text-muted">Instrument Serif · Inter Tight · JetBrains Mono</p>
        <button
          onClick={toTop}
          data-testid="back-to-top"
          className="font-mono text-xs uppercase tracking-[0.06em] text-muted hover:text-signal-bright"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <GridLines />
        <Grain />
        <ScrollManager />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.06em]"
        >
          Skip to content
        </a>
        <Nav />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forgefit" element={<ForgeFit />} />
            <Route path="/playbook" element={<Playbook />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </ErrorBoundary>
    </MotionConfig>
  );
}
