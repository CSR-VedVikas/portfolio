import { useEffect } from "react";
import Section from "../components/Section.jsx";
import AssetImage from "../components/AssetImage.jsx";
import { TextLink } from "../components/TextLink.jsx";
import { MONO } from "../data/site.js";

const GLANCE = [
  ["Role", "Solo: product, backend, frontend, data, security, DevOps"],
  ["Timeline", "July–November 2026"],
  ["Built with", "Claude Code"],
  ["Frontend", "React 19, Vite, React Router, installable PWA"],
  ["Backend", "Python 3.12, FastAPI, SQLAlchemy, Alembic, PyJWT, bcrypt"],
  ["Data", "PostgreSQL 16, 17 tables, 4 migrations"],
  ["APIs", "OpenAI gpt-4o-mini, USDA FoodData Central, Open Food Facts"],
  ["Infrastructure", "Docker Compose, nginx with TLS, Let's Encrypt, nightly Postgres backups"],
  ["Quality", "99 automated tests, 0 known vulnerable dependencies, 0 medium/high static-analysis findings"],
  ["Size", "~4,200 lines backend, ~3,600 frontend, ~1,200 tests"],
  ["Status", "Production-ready, verified end to end locally; public deployment not yet live"],
];

const PROBLEMS = [
  {
    n: "01",
    title: "Food search that finds the food you meant",
    challenge:
      "The nutrition provider dropped its food endpoints, and raw search on the replacements was poor. A search for \u201cegg\u201d returned a Snickers Egg, and \u201cwhite rice cooked\u201d returned a chicken korma.",
    approach:
      "I queried USDA and Open Food Facts in parallel, then re-ranked the results locally against USDA's own naming convention, where extra words in the head of a name mean a different dish and extra descriptors mean a narrower variant. The model is asked to choose only when the local ranking is unsure.",
    result: "Search returns the dish the user meant, and the model only breaks real ties.",
  },
  {
    n: "02",
    title: "Making it fast enough to use",
    challenge: "A three-food meal took 10.7 seconds. That is longer than most people will wait for a preview.",
    approach:
      "I timed every stage, parallelised the USDA requests, started the food parser alongside the intent classifier instead of after it, skipped the model pick when the local match was certain, and cached lookups for 24 hours. One shortcut made matches worse (\u201ca bowl of rice\u201d became Dirty rice), so I measured it and reverted it.",
    result: "About 6 seconds cold, about 2.5 seconds cached.",
  },
  {
    n: "03",
    title: "Sessions that are both short-lived and invisible",
    challenge:
      "A 15-minute access token means frequent re-authentication by design, and a visible re-login every 15 minutes would end the app.",
    approach:
      "I paired the short access token with a 14-day rotating refresh token in an httpOnly cookie. Replaying an old refresh token is treated as theft and ends every session for that user. The frontend collapses concurrent 401s into a single refresh, because two racing refreshes would trip that theft detection.",
    result: "Renewal is silent for the user, and a replayed token kills every session for that account.",
  },
  {
    n: "04",
    title: "\u201cToday\u201d in the user's timezone",
    challenge:
      "Two tests failed only after midnight India time. Rows were stored in UTC but \u201ctoday\u201d came from the server clock, so a late snack landed on yesterday's totals and streak.",
    approach:
      "The browser now sends its IANA timezone with every request, and one module answers every \u201ctoday\u201d and \u201cthis week\u201d question from it, including 23- and 25-hour daylight-saving days. Records, achievements and the weekly challenge follow the same rule: they are dated by when a session was trained, not when it was saved, so a workout queued offline and synced days later counts toward its own week. I built the regression test from the exact row that exposed the original bug.",
    result: "A late snack lands on the day it was eaten, in any timezone.",
  },
  {
    n: "05",
    title: "A schema that can only change one way",
    challenge:
      "The app created its own tables at startup, which silently diverges from migrations the first time a column changes.",
    approach:
      "Alembic became the only schema owner, with a frozen hand-written baseline. The app now refuses to serve against an out-of-date schema.",
    result: "One way for the schema to change, and loud failure instead of silent drift.",
  },
  {
    n: "06",
    title: "Failing safe when outside services fail",
    challenge: "An empty OpenAI balance turned every entry into an error.",
    approach:
      "Every external call now has a timeout and a fallback: a regex parser for workouts, local ranking for food, the other food source when one is down. Degraded answers are never cached.",
    result: "An outage degrades the answer, never the app.",
  },
];

const SECURITY = [
  ["Network", "Only nginx is public. API and database have no exposed ports. HTTPS only, TLS 1.2/1.3, HSTS."],
  ["Browser", "Content Security Policy, clickjacking protection, nosniff, strict referrer and permissions policies."],
  [
    "Startup",
    "The server refuses to start with a weak secret, SQLite, API docs enabled, an empty CORS allowlist, or a debug flag. Misconfiguration fails loudly.",
  ],
  [
    "Passwords",
    "bcrypt, with the 72-byte limit enforced rather than silently truncated, and equal response time for known and unknown emails.",
  ],
  ["Sessions", "Short access tokens, a rotating httpOnly refresh cookie, theft detection on replay, real server-side logout."],
  [
    "Recovery",
    "Random single-use reset tokens stored hashed, one-hour expiry, identical response whether or not the email exists.",
  ],
  ["API", "Sign-in on every data route, ownership checked on every id, rate limits on login and parsing."],
  ["Supply chain", "Pinned dependencies, lockfile installs, pip-audit and npm audit clean."],
  ["Runtime", "API runs unprivileged. Secrets never in git or images."],
  ["Data", "Nightly compressed backups, restore rehearsed and verified row for row."],
];

const MEASURED = [
  ["Known vulnerable dependencies", "23", "0"],
  ["Three-food meal lookup", "10.7 s", "~6 s cold, ~2.5 s cached"],
  ["Login time, unknown vs real email", "1 ms vs 210 ms", "214 ms either way"],
  ["Automated tests", "6", "99, run offline in about 17 seconds with external services stubbed"],
];

const PHASES = [
  ["01 First release · Jul 2026", "Accounts, live workouts, routines, Smart Log, records and achievements, exercise library, Docker packaging"],
  ["02 Production hardening · Aug 2026", "Fail-closed configuration, refresh-token sessions, Alembic-owned schema, PostgreSQL, TLS, secrets out of the repo"],
  ["03 Installable app and backups · Aug 2026", "Raster and maskable icons, iOS standalone mode, network-first service worker, nightly backups"],
  ["04 Data model expansion · Sep 2026", "Food portions, water, weigh-in history, training courses, barcode lookup, duplicate-safe workout saves"],
  ["05 Sessions, time and food · Oct 2026", "Silent session renewal, readable errors, user-timezone day boundaries, dual-source food search with a match picker"],
  ["06 Security audit · Oct 2026", "Dependency upgrades to zero known vulnerabilities, CSP and security headers, unprivileged containers, input bounds, full-stack verification"],
  ["07 Session dating · Nov 2026", "Records, achievements and the weekly challenge dated by when a session was trained, so a late-synced workout counts toward its own week"],
];

const SHOTS = [
  ["SCREENSHOT_1.png", "Landing", "screenshot-landing"],
  ["SCREENSHOT_2.png", "Dashboard", "screenshot-dashboard"],
  ["SCREENSHOT_3.png", "Smart Log preview with the match picker open", "screenshot-smart-log"],
  ["SCREENSHOT_4.png", "Personal-record celebration", "screenshot-pr-celebration"],
];

export default function ForgeFit() {
  useEffect(() => {
    document.title = "ForgeFit — Case Study — C S R VedVikas";
  }, []);

  return (
    <main id="main">
      <header className="mx-auto max-w-6xl px-5 md:px-10 pt-10 md:pt-16 pb-12 md:pb-16">
        <TextLink href="/" testid="forgefit-back-home" className="font-mono text-[13px] uppercase tracking-[0.06em]">
          Back to home
        </TextLink>
        <p className={`${MONO} text-muted mt-8`}>Case study · Solo</p>
        <h1 className="font-serif text-6xl md:text-[5.5rem] leading-[0.95] mt-2">ForgeFit</h1>
        <p className="font-serif italic text-2xl md:text-3xl text-muted mt-3">Full-stack fitness PWA</p>
        <p className={`${MONO} text-muted mt-6`}>
          July–November 2026 · Built with Claude Code · Verified end to end locally; public deployment not yet live
        </p>
      </header>

      {/* At a glance */}
      <Section id="glance" label="ForgeFit" title="At a glance">
        <dl className="col-span-12">
          {GLANCE.map(([k, v]) => (
            <div key={k} className="grid grid-cols-12 gap-x-6 border-b border-hairline py-3">
              <dt className={`col-span-4 md:col-span-3 ${MONO} text-muted py-1`}>{k}</dt>
              <dd className={`col-span-8 md:col-span-9 font-mono text-[13px] leading-relaxed py-1`}>{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* The problem */}
      <Section id="problem" label="ForgeFit" title="The problem">
        <div className={`${"col-span-12 md:col-span-6 md:col-start-4"} space-y-4`}>
          <p>
            Logging is where fitness apps lose people. Tapping through menus for every set and searching a database
            for every food takes longer than the rest period between sets. The bet was that typing one sentence is
            faster than any form, as long as the app understands it and shows its working before saving anything.
          </p>
        </div>
      </Section>

      {/* Architecture */}
      <Section id="architecture" label="ForgeFit" title="Architecture">
        <figure className="col-span-12" data-testid="architecture-diagram">
          <AssetImage
            file="ARCHITECTURE_DIAGRAM.png"
            alt="Architecture diagram of ForgeFit: phone to nginx to FastAPI to PostgreSQL and external APIs"
            ratio="16 / 9"
            testid="architecture-diagram-img"
          />
          <figcaption className={`${MONO} text-muted mt-3 leading-relaxed`}>
            A phone talks only to nginx over HTTPS. nginx serves the app and forwards API calls into a private
            network where only the FastAPI service reaches the database and the outside APIs.
          </figcaption>
        </figure>
        <p className="col-span-12 md:col-span-6 md:col-start-4">
          The whole stack starts from one docker compose command.
        </p>
      </Section>

      {/* Six engineering problems */}
      <Section id="problems" label="ForgeFit" title="Six engineering problems">
        {PROBLEMS.map((p, i) => (
          <article
            key={p.n}
            data-testid={`engineering-problem-${p.n}`}
            className={`col-span-12 grid grid-cols-12 gap-x-6 gap-y-5 ${i === 0 ? "" : "border-t border-hairline pt-10 mt-4"}`}
          >
            <p aria-hidden="true" className="col-span-12 md:col-span-2 font-serif text-signal leading-[0.85] text-7xl md:text-[8rem]">
              {p.n}
            </p>
            <div className="col-span-12 md:col-span-10">
              <h3 className="font-serif text-3xl md:text-5xl leading-[1.05]">{p.title}</h3>
              <div className="mt-6 space-y-5 max-w-measure">
                <p>
                  <span className={`${MONO} text-muted block mb-1`}>Challenge</span>
                  {p.challenge}
                </p>
                <p>
                  <span className={`${MONO} text-muted block mb-1`}>Approach</span>
                  {p.approach}
                </p>
                <p>
                  <span className={`${MONO} text-muted block mb-1`}>Result</span>
                  {p.result}
                </p>
              </div>
            </div>
          </article>
        ))}
      </Section>

      {/* Security */}
      <Section id="security" label="ForgeFit" title="Security">
        <table className="col-span-12 w-full border-collapse" data-testid="security-table">
          <tbody>
            {SECURITY.map(([k, v]) => (
              <tr key={k} className="border-b border-hairline align-top">
                <th scope="row" className={`py-3 pr-6 text-left ${MONO} text-muted w-36 md:w-52 pt-3`}>
                  {k}
                </th>
                <td className="py-3 text-[15px] md:text-base leading-relaxed">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="col-span-12 md:col-span-6 md:col-start-4">
          Security was treated as a feature with its own audits. An August review closed 11 deployment blockers, and
          an October audit found and fixed 15 more, including a password-reset path that could have handed out any
          account if one setting was forgotten.
        </p>
      </Section>

      {/* Measured before and after */}
      <Section id="measured" label="ForgeFit" title="Measured before and after">
        <table className="col-span-12 w-full border-collapse" data-testid="measured-table">
          <thead>
            <tr className="border-b border-hairline text-left">
              <th className={`${MONO} text-muted py-3 pr-6 font-normal`}>Metric</th>
              <th className={`${MONO} text-muted py-3 pr-6 font-normal`}>Before</th>
              <th className={`${MONO} text-muted py-3 font-normal`}>After</th>
            </tr>
          </thead>
          <tbody>
            {MEASURED.map(([m, b, a]) => (
              <tr key={m} className="border-b border-hairline align-top">
                <td className="py-3 pr-6 text-[15px] md:text-base">{m}</td>
                <td className="py-3 pr-6 font-mono text-[13px] leading-relaxed">{b}</td>
                <td className="py-3 font-mono text-[13px] leading-relaxed">{a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* How it was built */}
      <Section id="phases" label="ForgeFit" title="How it was built">
        <table className="col-span-12 w-full border-collapse" data-testid="phases-table">
          <tbody>
            {PHASES.map(([name, delivered]) => (
              <tr key={name} className="border-b border-hairline align-top">
                <th scope="row" className={`py-3 pr-6 text-left ${MONO} text-muted md:w-72`}>
                  {name}
                </th>
                <td className="py-3 font-mono text-[13px] leading-relaxed">{delivered}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="col-span-12 md:col-span-6 md:col-start-4">
          The practice that held throughout was verifying against the real system. Live API calls exposed the provider
          change, the full Docker stack exposed a missing .dockerignore and a leaked API schema, and the browser
          exposed raw-JSON errors.
        </p>
      </Section>

      {/* Screenshots */}
      <Section id="screenshots" label="ForgeFit" title="Screenshots">
        <div className="col-span-12 grid md:grid-cols-2 gap-6">
          {SHOTS.map(([file, caption, tid]) => (
            <figure key={file} data-testid={tid}>
              <AssetImage file={file} alt={`ForgeFit screenshot: ${caption.toLowerCase()}`} ratio="16 / 10" testid={`${tid}-img`} />
              <figcaption className={`${MONO} text-muted mt-2`}>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* What I would do differently */}
      <Section id="differently" label="Closing" title="What I would do differently">
        <div className="col-span-12 md:col-span-6 md:col-start-4 space-y-4">
          <p>
            The app is not publicly deployed yet, which means nobody outside has stress-tested it. The food ranking
            is hand-tuned against USDA's naming convention and would need rewriting for a different provider. The
            test suite covers the backend well and the frontend barely.
          </p>
        </div>
      </Section>
    </main>
  );
}
