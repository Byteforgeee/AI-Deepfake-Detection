import { Link } from "react-router-dom";
import {
  FiShield,
  FiUploadCloud,
  FiScissors,
  FiActivity,
  FiLayers,
  FiFileText,
  FiEye,
  FiMic,
  FiCheckCircle,
  FiGlobe,
  FiZap,
} from "react-icons/fi";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

const PIPELINE = [
  { icon: FiUploadCloud, title: "Upload", desc: "Validate format & size" },
  { icon: FiScissors, title: "Split streams", desc: "Frames + audio track" },
  { icon: FiActivity, title: "Analyse", desc: "Visual & audio models" },
  { icon: FiLayers, title: "Fuse", desc: "Combine both scores" },
  { icon: FiFileText, title: "Report", desc: "Verdict + PDF & heatmaps" },
];

// Straight from the project's objectives slide
const OBJECTIVES = [
  { icon: FiEye, title: "Detect facial manipulation", desc: "Hybrid CNN model on video frames" },
  { icon: FiMic, title: "Detect audio tampering", desc: "Identify synthetic & cloned speech" },
  { icon: FiLayers, title: "Fuse both signals", desc: "Combine visual + audio for one verdict" },
  { icon: FiGlobe, title: "Accessible web app", desc: "Simple upload, clear result display" },
  { icon: FiFileText, title: "Explainable output", desc: "Heatmaps & audio anomaly views" },
  { icon: FiZap, title: "Practical & scalable", desc: "Robust on real, compressed videos" },
];

// From the tools & technologies slide
const TOOLS = [
  { category: "Frontend", items: ["React.js", "Tailwind CSS", "Axios"] },
  { category: "Backend", items: ["Flask / Django", "REST API", "JWT auth"] },
  { category: "Deep learning", items: ["PyTorch", "OpenCV", "Librosa"] },
  { category: "Data & DevOps", items: ["MongoDB", "Docker", "Git + VS Code"] },
];

// From the team slide
const TEAM = [
  { initials: "AK", name: "Ankit Katwal", id: "221610", role: "Team Lead & DL Specialist", desc: "Coordination, CNN models, multi-modal fusion, training & evaluation" },
  { initials: "LN", name: "Lalit Nath", id: "221719", role: "Frontend Developer", desc: "React UI, upload & progress, result visualisation, API integration" },
  { initials: "SG", name: "Sunil Giri", id: "221645", role: "Backend & Integration", desc: "Flask/Django APIs, database, model integration, deployment" },
  { initials: "BB", name: "Bhupesh Bhatt", id: "221708", role: "Audio & Testing", desc: "Librosa audio module, preprocessing, testing, documentation" },
];

export default function LandingPage() {
  return (
    <div className="bg-base-950">
      <Navbar />
      <Hero />
      <ProblemStrip />
      <HowItWorks />
      <Objectives />
      <ToolsSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-base-700/80 grid-texture">
      <div className="absolute inset-0 bg-gradient-to-b from-base-950 via-base-950/95 to-base-950" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-base-600 bg-base-800 px-3 py-1 font-mono text-[11px] text-verify-400">
            <FiShield size={12} /> Major project · Dept. of Software Engineering
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight text-ink-100 sm:text-5xl">
            Know what's real, before it spreads.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-500">
            VeriFrame is a multi-modal deepfake detection system — it checks a
            video's face and voice together and returns one explainable
            verdict, backed by deep learning.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/login" className="sm:w-auto">
              <Button variant="primary" className="sm:w-auto sm:px-6">
                Try a detection
              </Button>
            </Link>
            <a href="#how-it-works" className="sm:w-auto">
              <Button variant="ghost" className="sm:w-auto sm:px-6">
                See how it works
              </Button>
            </a>
          </div>
        </div>

        <VerdictMockup />
      </div>
    </section>
  );
}

function VerdictMockup() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-4 rounded-3xl bg-verify-500/5 blur-2xl" />
      <div className="relative rounded-2xl border border-base-600 bg-base-800 p-5 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-base-700 pb-3">
          <span className="font-mono text-[11px] text-ink-700">clip_0142.mp4</span>
          <span className="flex items-center gap-1.5 rounded-full bg-verify-500/10 px-2.5 py-1 font-mono text-[11px] text-verify-400">
            <FiCheckCircle size={12} /> REAL · 96%
          </span>
        </div>

        <div className="relative mt-4 aspect-video overflow-hidden rounded-lg bg-base-900">
          <div className="absolute inset-0 grid-texture opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FiShield className="text-4xl text-ink-700" />
          </div>
          <div className="absolute inset-x-0 h-6 animate-scan bg-gradient-to-b from-transparent via-verify-500/30 to-transparent" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <ScoreBar label="Visual score" value={94} />
          <ScoreBar label="Audio score" value={98} />
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] text-ink-700">
        <span>{label}</span>
        <span className="font-mono text-ink-500">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
        <div className="h-full rounded-full bg-verify-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ProblemStrip() {
  return (
    <section id="why" className="border-b border-base-700/80 bg-base-900/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <p className="max-w-2xl text-lg leading-relaxed text-ink-300">
          Generative tools — GANs, diffusion, voice cloning — now make
          hyper-realistic fake video and audio cheap to produce.{" "}
          <span className="text-ink-100">
            Existing detectors are research-only, analyse a face or a voice
            rarely both, and are unusable by non-experts.
          </span>{" "}
          VeriFrame is a complete, accessible tool that checks both together.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-base-700/80">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Pipeline"
          title="From upload to verdict, in five steps"
          desc="Every clip runs through the same pipeline — video and audio analysed in parallel, then fused into one decision."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-base-600 bg-base-800">
                <step.icon className="text-verify-400" size={18} />
              </div>
              <p className="mt-4 font-mono text-[11px] text-ink-700">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-display text-base font-semibold text-ink-100">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-ink-500">{step.desc}</p>

              {i < PIPELINE.length - 1 && (
                <div className="absolute right-[-1.5rem] top-5 hidden h-px w-6 bg-base-600 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Objectives() {
  return (
    <section id="objectives" className="border-b border-base-700/80 bg-base-900/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Objectives"
          title="What the system sets out to do"
          desc="Six goals drive the build, from raw detection accuracy to making the result understandable to a non-expert."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OBJECTIVES.map((o) => (
            <div
              key={o.title}
              className="rounded-xl border border-base-600 bg-base-800 p-6 transition-colors hover:border-base-500"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-verify-500/10">
                <o.icon className="text-verify-400" size={18} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink-100">
                {o.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className="border-b border-base-700/80">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Stack"
          title="Tools & technologies"
          desc="The stack the team is building on, grouped by layer."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((group) => (
            <div key={group.category} className="rounded-xl border border-base-600 bg-base-800 p-6">
              <h3 className="font-mono text-[11px] uppercase tracking-wide text-verify-400">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-ink-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="border-b border-base-700/80 bg-base-900/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          eyebrow="Team"
          title="Who does what"
          desc="Four roles, one pipeline — detection, fusion, backend, and the interface you're looking at now."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.id} className="rounded-xl border border-base-600 bg-base-800 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-verify-500/10 font-display text-sm font-semibold text-verify-400">
                {member.initials}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink-100">
                {member.name}
              </h3>
              <p className="font-mono text-[11px] text-ink-700">{member.id}</p>
              <p className="mt-2 text-sm font-medium text-verify-400">{member.role}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-center">
      <h2 className="font-display text-3xl font-semibold text-ink-100 sm:text-4xl">
        Check your first clip in under a minute
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-500">
        No install, no account required to see how a scan works.
      </p>
      <div className="mt-8 flex justify-center">
        <Link to="/login" className="w-full sm:w-auto">
          <Button variant="primary" className="sm:w-auto sm:px-8">
            Get started free
          </Button>
        </Link>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, desc }) {
  return (
    <div className="max-w-xl">
      <span className="font-mono text-[11px] uppercase tracking-wide text-verify-400">
        {eyebrow}
      </span>
      <h2 className="mt-2 font-display text-2xl font-semibold text-ink-100 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-500">{desc}</p>
    </div>
  );
}
