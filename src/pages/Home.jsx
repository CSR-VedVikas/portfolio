import { useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section.jsx";
import Hero from "../components/Hero.jsx";
import Reveal from "../components/Reveal.jsx";
import AssetImage from "../components/AssetImage.jsx";
import { TextLink } from "../components/TextLink.jsx";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_PDF_PATH,
  FORGEFIT_REPO_URL,
  PLAYBOOK_LIVE_URL,
  PLAYBOOK_REPO_URL,
  CHATBOT_REPO_URL,
  MONO,
  MONO_LINKS,
} from "../data/site.js";

const BODY = "col-span-12 md:col-span-6 md:col-start-4";

const CERTS = [
  {
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Coursera",
    date: "Aug–Oct 2024",
    verify: "https://coursera.org/share/6375b0f0ef92a981c830adcc6f93f27c",
    vid: "verify-google-cybersecurity",
  },
  {
    name: "Google AI Essentials",
    issuer: "Coursera",
    date: "Aug 2024",
    verify: "https://www.coursera.org/verify/S8QGW6L73QFH",
    vid: "verify-google-ai-essentials",
  },
  { name: "MATLAB Onramp", issuer: "MathWorks", date: "Aug 2025" },
  {
    name: "SQL (Intermediate)",
    issuer: "HackerRank",
    date: "Jul 2025",
    verify: "https://www.hackerrank.com/certificates/42f05181b914",
    vid: "verify-sql-intermediate",
  },
  {
    name: "SQL (Basic)",
    issuer: "HackerRank",
    date: "Jul 2025",
    verify: "https://www.hackerrank.com/certificates/7e565665bee3",
    vid: "verify-sql-basic",
  },
  {
    name: "JavaScript (Basic)",
    issuer: "HackerRank",
    date: "Jul 2025",
    verify: "https://www.hackerrank.com/certificates/549b6591d276",
    vid: "verify-javascript-basic",
  },
];

const MS_MODULES = [
  { name: "Introduction to prompt engineering with GitHub Copilot", issuer: "Microsoft Learn", date: "Oct 2025" },
  { name: "Introduction to AI concepts", issuer: "Microsoft Learn", date: "Oct 2025" },
  { name: "Introduction to machine learning concepts", issuer: "Microsoft Learn", date: "Oct 2025" },
];

const SIMULATIONS = [
  { name: "Solutions Architecture", issuer: "AWS", date: "Oct 2025" },
  { name: "Risk", issuer: "Goldman Sachs", date: "Oct 2025" },
  { name: "Cyber", issuer: "Deloitte", date: "Oct 2025" },
  {
    name: "Cybersecurity",
    issuer: "Mastercard",
    date: "Nov 2024",
    pdf: "/Mastercard_Cybersecurity_Simulation_Certificate.pdf",
    pid: "mastercard-certificate-pdf",
  },
];

const HANDS_ON = [
  "Conducting a security audit",
  "Analysing network structure and security",
  "Managing file permissions with Linux commands",
  "Filtering SQL queries",
  "Identifying vulnerabilities for a small business",
  "Documenting incidents in an incident handler's journal",
  "Parsing a text file in a security scenario",
];

function CredentialGroup({ heading, note, items, first }) {
  return (
    <Reveal className={first ? "" : "border-t border-hairline pt-10 mt-10"}>
      <div>
        <h3 className={MONO}>{heading}</h3>
        {note && <p className="mt-2 max-w-measure text-sm text-muted">{note}</p>}
        <ul className="mt-4 grid md:grid-cols-2 gap-x-16">
          {items.map((it) => (
            <li
              key={it.name}
              className="border-b border-hairline py-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
            >
              <span className="text-[15px] md:text-base">
                {it.name} <span className="text-muted">· {it.issuer}</span>
              </span>
              <span className={`${MONO} text-muted flex items-baseline gap-3`}>
                <span>{it.date}</span>
                {it.pdf && (
                  <TextLink href={it.pdf} download testid={it.pid}>
                    Certificate (PDF)
                  </TextLink>
                )}
                {it.verify && (
                  <TextLink href={it.verify} testid={it.vid}>
                    Verify
                  </TextLink>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function WorkRow({ id, index, title, to, meta, tags, note, figure, links, first, children }) {
  return (
    <Reveal className="col-span-12" delay={0.05}>
      <article
        data-testid={`work-entry-${id}`}
        className={`group grid grid-cols-12 gap-x-6 gap-y-5 ${first ? "" : "border-t border-hairline pt-10 md:pt-14"}`}
      >
        <p className="col-span-2 md:col-span-1 font-mono text-xs text-signal pt-3 md:pt-4">{index}</p>
        <div className="col-span-10 md:col-span-11 flex items-start justify-between gap-6">
          <h3 className="font-serif leading-[1.02] text-[2rem] md:text-[4rem] transition-colors duration-300 group-hover:text-signal-bright">
            {to ? (
              <Link to={to} data-testid={`work-title-${id}`} className="hover:text-signal-bright">
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
          <span
            aria-hidden="true"
            className="hidden md:block font-serif text-5xl text-signal opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          >
            ↗
          </span>
        </div>
        <div className="col-span-12 md:col-span-2 md:col-start-2 md:mt-3 space-y-1">
          {meta.map((m) => (
            <p key={m} className={MONO}>
              {m}
            </p>
          ))}
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-5 md:mt-3 space-y-5">
          {children}
          {note && <p className={`${MONO} text-muted leading-relaxed`}>{note}</p>}
          {tags && <p className="font-mono text-xs leading-relaxed text-muted">{tags}</p>}
          {figure}
          <ul className={MONO_LINKS}>{links}</ul>
        </div>
      </article>
    </Reveal>
  );
}

export default function Home() {
  useEffect(() => {
    document.title = "C S R VedVikas — Full-Stack Developer and ECE Portfolio";
  }, []);

  return (
    <main id="main">
      <Hero />

      {/* 01 INTRO */}
      <Section id="intro" numeral="01" label="About" title="Introduction">
        <div className={`${BODY} space-y-4`}>
          <p>
            I build full-stack web applications. My recent work was production-shaped rather than tutorial-shaped:
            authentication, database migrations, dependency audits, timezone bugs.
          </p>
          <p>
            On the ECE side I worked on hardware verification and antenna design. I like problems where the answer
            gets measured, not argued.
          </p>
        </div>
        <ul className={`${BODY} ${MONO_LINKS}`}>
          <li>
            <TextLink href={GITHUB_URL} testid="intro-github-link">
              GitHub
            </TextLink>
          </li>
          <li>
            <TextLink href={LINKEDIN_URL} testid="intro-linkedin-link">
              LinkedIn
            </TextLink>
          </li>
          <li>
            <TextLink href={`mailto:${EMAIL}`} testid="intro-email-link">
              Email
            </TextLink>
          </li>
          <li>
            <TextLink href={RESUME_PDF_PATH} download testid="resume-download-link">
              Résumé (PDF)
            </TextLink>
          </li>
        </ul>

        <Reveal className="col-span-12 grid grid-cols-12 gap-4 md:gap-6 mt-6">
          <div className="col-span-12 md:col-span-5 h-full" data-testid="bento-stack">
            <div className="h-full border border-hairline p-6 md:p-8 transition-colors duration-300 hover:border-signal">
              <p className={`${MONO} text-muted`}>01 — Practice</p>
              <p className="font-serif text-2xl md:text-3xl mt-4 leading-tight">
                Full-stack web, applied machine learning, security.
              </p>
              <p className={`${MONO} text-muted mt-4`}>FORGEFIT · CHATBOT SUITE · CURSOR PLAYBOOK</p>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3" data-testid="bento-tests">
            <div className="h-full border border-hairline p-6 md:p-8 transition-colors duration-300 hover:border-signal">
              <p className="font-serif text-6xl md:text-7xl text-signal leading-none">99</p>
              <p className={`${MONO} text-muted mt-4`}>Automated tests on ForgeFit</p>
            </div>
          </div>
          <div className="col-span-6 md:col-span-4" data-testid="bento-cnn">
            <div className="h-full border border-hairline p-6 md:p-8 transition-colors duration-300 hover:border-signal">
              <p className={`${MONO} text-muted`}>In-browser CNN</p>
              <p className="font-serif text-2xl md:text-3xl mt-4 leading-tight">
                int8 weights, plain JavaScript, no TensorFlow.js.
              </p>
              <TextLink href="/playbook" testid="bento-playbook-link" className={`${MONO} inline-block mt-4`}>
                See the lab
              </TextLink>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7" data-testid="bento-credentials">
            <div className="h-full border border-hairline p-6 md:p-8 transition-colors duration-300 hover:border-signal flex flex-wrap items-baseline justify-between gap-4">
              <p className="font-serif text-2xl md:text-3xl leading-tight">13 credentials, newest first.</p>
              <TextLink href="/#credentials" testid="bento-credentials-link" className={MONO}>
                Skip to credentials
              </TextLink>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5" data-testid="bento-ece">
            <div className="h-full border border-hairline p-6 md:p-8 transition-colors duration-300 hover:border-signal">
              <p className={`${MONO} text-muted`}>02 — ECE</p>
              <p className="font-serif text-2xl md:text-3xl mt-4 leading-tight">Hardware verification and antenna design.</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 02 SELECTED WORK */}
      <Section id="work" numeral="02" label="Projects" title="Selected work">
        <WorkRow
          id="forgefit"
          index="01"
          first
          title="ForgeFit — Full-Stack Fitness PWA"
          to="/forgefit"
          meta={["Solo", "July–November 2026", "FastAPI · PostgreSQL · React 19"]}
          tags="Python · FastAPI · SQLAlchemy · Alembic · PostgreSQL · React 19 · Vite · PWA · OpenAI API · JWT · Docker · nginx · pytest"
          note="Verified end to end locally; public deployment not yet live. The video and the repository are the record."
          links={
            <>
              <li>
                <TextLink href="/forgefit" testid="forgefit-case-study-link">
                  Read the case study
                </TextLink>
              </li>
              <li>
                <TextLink href={FORGEFIT_REPO_URL} testid="forgefit-github-link">
                  GitHub
                </TextLink>
              </li>
            </>
          }
        >
          <p>
            A fitness tracker where you log a workout and a meal in one plain-English sentence: bench 3x8 at 60 kg,
            then 2 eggs and a bowl of rice. It returns an editable preview of your sets, personal records and
            nutrition before anything is saved. I built it with Claude Code: FastAPI and PostgreSQL behind a React 19
            PWA, deployed with Docker and nginx over HTTPS, and covered by 99 automated tests. It is not publicly
            deployed yet, so the video and the repository are the record.
          </p>
        </WorkRow>

        <WorkRow
          id="playbook"
          index="02"
          title="Cursor AI Beginner Playbook"
          to="/playbook"
          meta={["ISFCR research internship", "PES University · Summer 2026", "HTML · JavaScript · Canvas"]}
          tags="HTML · JavaScript · Canvas · Tesseract.js · TensorFlow/Keras · MNIST · EMNIST"
          figure={
            <figure data-testid="playbook-screenshot">
              <AssetImage
                file="PLAYBOOK_SCREENSHOT.png"
                alt="Screenshot of the Cursor AI Beginner Playbook site"
                ratio="16 / 10"
                testid="playbook-screenshot-img"
              />
            </figure>
          }
          links={
            <>
              <li>
                <TextLink href="/playbook" testid="playbook-case-study-link">
                  Read the case study
                </TextLink>
              </li>
              <li>
                <TextLink href="/playbook#demo" testid="playbook-demo-link">
                  Watch the demo
                </TextLink>
              </li>
              <li>
                <TextLink href={PLAYBOOK_LIVE_URL} testid="playbook-live-link">
                  Open the live site
                </TextLink>
              </li>
              <li>
                <TextLink href={PLAYBOOK_REPO_URL} testid="playbook-github-link">
                  GitHub
                </TextLink>
              </li>
            </>
          }
        >
          <p>
            I wrote a single-file HTML teaching artifact for an AI-assisted development methodology: six phases,
            three worked ML chatbot builds, and three interactive concept labs covering gradient descent,
            convolutional networks, and an in-browser OCR scanner. The handwriting recognition lab runs a CNN
            entirely in the browser through a hand-written plain-JavaScript inference pipeline: int8 quantized
            weights, conv-relu, max-pooling, Otsu thresholding and character segmentation, with no TensorFlow.js
            dependency. I trained the network on MNIST and EMNIST-letters. It was the flagship artifact for the
            internship Demo Day. Everything runs client-side, so nothing carries over between visits; that trade is
            what kept it a single file.
          </p>
        </WorkRow>

        <WorkRow
          id="chatbot-suite"
          index="03"
          title="Chatbot Suite — ML-Backed Conversational Apps"
          to={CHATBOT_REPO_URL}
          meta={["Personal", "2026", "FastAPI · Flask · scikit-learn"]}
          tags="Python · FastAPI · Flask · scikit-learn · NVIDIA NIM"
          links={
            <li>
              <TextLink href={CHATBOT_REPO_URL} testid="chatbot-github-link">
                GitHub
              </TextLink>
            </li>
          }
        >
          <p>
            Three small apps where scikit-learn does the prediction and the language model only handles conversation.
            HomePricer estimates prices with a RandomForestRegressor behind Flask. CellScope runs logistic regression
            at around 97% accuracy, and CardioCheck screens heart-disease risk with logistic regression on the UCI
            Heart Disease dataset, both behind FastAPI. The design rule throughout: the LLM never performs the
            classification. These are screening demos, not clinical tools, and none of them has seen a real clinic's
            data.
          </p>
        </WorkRow>

        <WorkRow
          id="capstone-ransomware"
          index="04"
          title="Capstone — Agentless Ransomware Detection in Cloud Virtual Machines"
          meta={["Team capstone", "PES University · 2026–2027", "KVM/QEMU · libvirt"]}
          note="Paper in preparation — details withheld until publication."
        >
          <p>
            My capstone team at PES University is building agentless ransomware detection for cloud virtual machines.
            Hypervisor-level telemetry over KVM/QEMU and libvirt feeds three detectors in parallel, catching both
            fast and deliberately slow ransomware and containing a flagged VM automatically.
          </p>
        </WorkRow>

        <WorkRow
          id="capstone-ris"
          index="05"
          title="Capstone — Dual-Band Reconfigurable Intelligent Surface Unit Cell"
          meta={["Team capstone", "PES University · 2026–2027", "ANSYS HFSS · CST Studio Suite"]}
          note="Paper in preparation — details withheld until publication."
        >
          <p>
            My capstone team designed a dual-band reconfigurable intelligent surface unit cell: a 1-bit cell for 3.5
            and 5.8 GHz, switched by PIN diodes. We simulated it in ANSYS HFSS and CST Studio Suite.
          </p>
        </WorkRow>

        <Reveal className="col-span-12">
          <p className={`${MONO} text-muted leading-relaxed`}>
            Hardware verification work (RTL equivalence checking with Yosys and a SAT solver; a Python lint and
            clock-domain-crossing analysis CLI) is not public. Available on request.
          </p>
        </Reveal>
      </Section>

      {/* 03 CREDENTIALS */}
      <Section id="credentials" numeral="03" label="Certifications, modules, simulations" title="Credentials">
        <div className="col-span-12">
          <CredentialGroup first heading="Certifications" items={CERTS} />
          <CredentialGroup heading="Microsoft Learn modules — Oct 2025" items={MS_MODULES} />
          <CredentialGroup
            heading="Job simulations (Forage)"
            note="Forage job simulations. These are simulations, not employment."
            items={SIMULATIONS}
          />
        </div>

        <Reveal className="col-span-12 mt-12">
          <article
            data-testid="google-cybersecurity-expanded"
            className="border-t border-hairline pt-10 grid grid-cols-12 gap-x-6 gap-y-5"
          >
            <h3 className="col-span-12 md:col-span-8 font-serif text-3xl md:text-5xl leading-[1.05]">
              Google Cybersecurity Professional Certificate
            </h3>
            <p className={`${MONO} col-span-12 md:col-span-2 md:col-start-1 md:mt-1 text-muted`}>
              Coursera · August–October 2024 · 8 courses
            </p>
            <div className="col-span-12 md:col-span-6 md:col-start-4 md:mt-1 space-y-5">
              <p>
                The certificate walked through the eight CISSP security domains, threat and vulnerability assessment,
                incident detection and response with SIEM and IDS tooling, the Linux command line and file permissions,
                SQL for log filtering, and Python for security automation. Eight courses of hands-on work rather than
                a single quiz.
              </p>
              <div>
                <h4 className={MONO}>Hands-on work</h4>
                <ul className="mt-3 grid md:grid-cols-2 gap-x-10 gap-y-0 font-mono text-[13px]">
                  {HANDS_ON.map((h) => (
                    <li key={h} className="border-b border-hairline py-2">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <p>
                The certificate gave me the vocabulary and the defender's workflow. The applied security work came
                later, in the ransomware capstone and the ForgeFit security audits.
              </p>
            </div>
          </article>
        </Reveal>
      </Section>

      {/* 04 CONTACT */}
      <Section id="contact" numeral="04" label="Contact" title="Get in touch">
        <ul className="col-span-12 space-y-6 md:space-y-9">
          <li>
            <a
              data-testid="contact-email-link"
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-baseline gap-5 font-serif text-5xl md:text-8xl leading-[1.05] underline decoration-signal decoration-[1.5px] underline-offset-8 hover:text-signal-bright"
            >
              Email
              <span
                aria-hidden="true"
                className="font-mono text-sm text-signal opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              >
                ↗
              </span>
            </a>
          </li>
          <li>
            <a
              data-testid="contact-linkedin-link"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-5 font-serif text-5xl md:text-8xl leading-[1.05] underline decoration-signal decoration-[1.5px] underline-offset-8 hover:text-signal-bright"
            >
              LinkedIn
              <span
                aria-hidden="true"
                className="font-mono text-sm text-signal opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              >
                ↗
              </span>
            </a>
          </li>
          <li>
            <a
              data-testid="contact-github-link"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-5 font-serif text-5xl md:text-8xl leading-[1.05] underline decoration-signal decoration-[1.5px] underline-offset-8 hover:text-signal-bright"
            >
              GitHub
              <span
                aria-hidden="true"
                className="font-mono text-sm text-signal opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              >
                ↗
              </span>
            </a>
          </li>
        </ul>
        <p className={`${MONO} col-span-12 text-muted`}>Bengaluru, India</p>
      </Section>
    </main>
  );
}
