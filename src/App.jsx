import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import ForgeFit from "./pages/ForgeFit.jsx";

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
        <div style={{ padding: "3rem", fontFamily: "monospace" }}>
          Something broke while rendering. <a href="/">Reload the site</a>.
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView(); // instant jump, no smooth scrolling
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollManager />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.06em]"
      >
        Skip to content
      </a>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgefit" element={<ForgeFit />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </ErrorBoundary>
  );
}
