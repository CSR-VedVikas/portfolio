import { useEffect } from "react";
import Section from "../components/Section.jsx";
import AssetImage from "../components/AssetImage.jsx";
import { TextLink } from "../components/TextLink.jsx";
import { PLAYBOOK_LIVE_URL, PLAYBOOK_REPO_URL, MONO, MONO_LINKS } from "../data/site.js";

const GLANCE = [
  ["Role", "Solo author, ISFCR research internship, PES University"],
  ["Timeline", "Summer 2026"],
  ["Built with", "Cursor for the build, Claude and ChatGPT for planning"],
  ["Format", "One HTML file: markup, styles and script, no build step, no backend"],
  ["Contents", "Six phases, three worked ML chatbot builds, three interactive concept labs"],
  ["OCR pipeline", "int8 CNN inference in plain JavaScript, Otsu thresholding, character segmentation, no TensorFlow.js"],
  ["Training data", "MNIST and EMNIST-letters"],
  ["Status", "Live on Netlify, flagship artifact of the internship Demo Day"],
];

export default function Playbook() {
  useEffect(() => {
    document.title = "Cursor AI Beginner Playbook — Case Study · C S R VedVikas";
  }, []);

  return (
    <main id="main">
      <header className="mx-auto max-w-6xl px-5 md:px-10 pt-10 md:pt-16 pb-10 md:pb-12">
        <TextLink href="/" testid="playbook-back-home" className="font-mono text-[13px] uppercase tracking-[0.06em]">
          Back to home
        </TextLink>
        <p className={`${MONO} text-muted mt-8`}>Case study · ISFCR research internship</p>
        <h1 className="font-serif text-5xl md:text-[4.5rem] leading-[0.98] mt-2">Cursor AI Beginner Playbook</h1>
        <p className="font-serif italic text-2xl md:text-3xl text-muted mt-3">
          A teaching artifact for AI-assisted development
        </p>
        <p className={`${MONO} text-muted mt-6`}>PES University · Summer 2026 · Single-file HTML</p>
      </header>

      <div className="mx-auto max-w-6xl px-5 md:px-10 pb-14 md:pb-20">
        <figure data-testid="playbook-hero">
          <AssetImage
            file="PLAYBOOK_SCREENSHOT.png"
            alt="Opening screen of the Cursor AI Beginner Playbook: turn any idea into a working web app"
            ratio="16 / 9"
            testid="playbook-hero-img"
          />
          <figcaption className={`${MONO} text-muted mt-3`}>The opening screen of the playbook.</figcaption>
        </figure>
      </div>

      {/* Demo video */}
      <Section id="demo" label="Playbook" title="Demo">
        <figure className="col-span-12" data-testid="playbook-demo-video">
          <video
            controls
            preload="metadata"
            src="/cursor-demo.mp4"
            data-testid="playbook-demo-player"
            className="w-full h-auto border border-hairline bg-ink"
          />
          <figcaption className={`${MONO} text-muted mt-3`}>Cursor_Demo.mp4 — the project demo.</figcaption>
        </figure>
      </Section>

      {/* At a glance */}
      <Section id="glance" label="Playbook" title="At a glance">
        <dl className="col-span-12">
          {GLANCE.map(([k, v]) => (
            <div key={k} className="grid grid-cols-12 gap-x-6 border-b border-hairline py-3">
              <dt className={`col-span-4 md:col-span-3 ${MONO} text-muted py-1`}>{k}</dt>
              <dd className="col-span-8 md:col-span-9 font-mono text-[13px] leading-relaxed py-1">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* The brief */}
      <Section id="brief" label="Playbook" title="The brief">
        <div className="col-span-12 md:col-span-6 md:col-start-4 space-y-4">
          <p>
            The ISFCR internship developed a methodology for building software with AI: describe what you want in
            plain English, plan it with Claude or ChatGPT, and build it in Cursor by pasting prompts one by one. You
            stay in control at every stage. My job was to turn that methodology into something a beginner could walk
            through without a mentor beside them.
          </p>
          <p>The artifact opens with that promise: turn any idea into a working web app.</p>
        </div>
      </Section>

      {/* How it teaches */}
      <Section id="method" label="Playbook" title="How it teaches">
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          <p>
            The playbook teaches a six-phase method, from the first plain-English idea to a working web app. It
            demonstrates rather than preaches: three worked ML chatbot builds run through the whole cycle, so a
            reader watches the same approach land three different apps.
          </p>
        </div>
      </Section>

      {/* Three concept labs */}
      <Section id="labs" label="Playbook" title="Three concept labs">
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          <p>
            The labs are interactive, and each earns its keep. One lab covers gradient descent. One covers
            convolutional networks. The third is an OCR scanner that reads handwriting drawn on screen. All three run
            in the page itself, and nothing is sent anywhere.
          </p>
        </div>
      </Section>

      {/* The CNN */}
      <Section id="cnn" label="Playbook" title="A CNN with no dependencies">
        <div className="col-span-12 md:col-span-6 md:col-start-4 space-y-4">
          <p>
            The OCR lab runs a convolutional network entirely in the browser. I wrote the inference pipeline by hand
            in plain JavaScript: int8 quantized weights, conv-relu, max-pooling, Otsu thresholding and character
            segmentation. There is no TensorFlow.js dependency; the page carries its own weights, which I trained on
            MNIST and EMNIST-letters.
          </p>
          <p>
            The point was pedagogical. A reader can open the source of one file and read every step a drawn character
            takes through the network, from thresholding to prediction.
          </p>
        </div>
      </Section>

      {/* Where it falls short */}
      <Section id="shortfall" label="Closing" title="Where it falls short">
        <div className="col-span-12 md:col-span-6 md:col-start-4 space-y-6">
          <p>
            It is still one file, by design. Everything runs client-side, so nothing carries over between visits, and
            the file grows heavier every time a lab is added. The network also reflects its training data:
            handwriting that looks nothing like MNIST or EMNIST samples will confuse it.
          </p>
          <ul className={MONO_LINKS}>
            <li>
              <TextLink href={PLAYBOOK_LIVE_URL} testid="playbook-cs-live-link">
                Open the live site
              </TextLink>
            </li>
            <li>
              <TextLink href={PLAYBOOK_REPO_URL} testid="playbook-cs-github-link">
                GitHub
              </TextLink>
            </li>
          </ul>
        </div>
      </Section>
    </main>
  );
}
