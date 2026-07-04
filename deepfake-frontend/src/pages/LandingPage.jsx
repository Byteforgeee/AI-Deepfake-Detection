import { useEffect, useRef, useState } from "react";
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
  FiArrowRight,
} from "react-icons/fi";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";
import { useInView } from "../hooks/useInView";

const PIPELINE = [
  { icon: FiUploadCloud, title: "Upload", desc: "Validate format & size" },
  { icon: FiScissors, title: "Split streams", desc: "Frames + audio track" },
  { icon: FiActivity, title: "Analyse", desc: "Visual & audio models" },
  { icon: FiLayers, title: "Fuse", desc: "Combine both scores" },
  { icon: FiFileText, title: "Report", desc: "Verdict + PDF & heatmaps" },
];

const OBJECTIVES = [
  { icon: FiEye, title: "Detect facial manipulation", desc: "Hybrid CNN model on video frames" },
  { icon: FiMic, title: "Detect audio tampering", desc: "Identify synthetic & cloned speech" },
  { icon: FiLayers, title: "Fuse both signals", desc: "Combine visual + audio for one verdict" },
  { icon: FiGlobe, title: "Accessible web app", desc: "Simple upload, clear result display" },
  { icon: FiFileText, title: "Explainable output", desc: "Heatmaps & audio anomaly views" },
  { icon: FiZap, title: "Practical & scalable", desc: "Robust on real, compressed videos" },
];

const TOOLS = [
  { category: "Frontend", items: ["React.js", "Tailwind CSS", "Axios"] },
  { category: "Backend", items: ["Django", "REST API", "JWT auth"] },
  { category: "Deep learning", items: ["PyTorch", "OpenCV", "Librosa"] },
  { category: "Data & DevOps", items: ["PostgreSQL", "Docker", "Git + VS Code"] },
];

const TEAM = [
  { initials: "AK", name: "Ankit Katwal", id: "221610", role: "Team Lead & DL Specialist", desc: "Coordination, CNN models, multi-modal fusion, training & evaluation" },
  { initials: "LN", name: "Lalit Nath", id: "221719", role: "Frontend Developer", desc: "React UI, upload & progress, result visualisation, API integration" },
  { initials: "SG", name: "Sunil Giri", id: "221645", role: "Backend & Integration", desc: "Django APIs, database, model integration, deployment" },
  { initials: "BB", name: "Bhupesh Bhatt", id: "221708", role: "Audio & Testing", desc: "Librosa audio module, preprocessing, testing, documentation" },
];

// ===== Particle Background =====
function Particles({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];
    let rafId;
    const count = 60;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        ctx.fill();
      });
      rafId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    const handleResize = () => {
      resize();
      createParticles();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: active ? 1 : 0 }}
    />
  );
}

// ===== Main Landing Page =====
export default function LandingPage() {
  return (
    <div className="bg-base-950 relative overflow-x-hidden">
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

// ===== Hero Section =====
function Hero() {
  const [heroRef, heroInView] = useInView();

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden border-b border-base-700/80 grid-texture min-h-[90vh] flex items-center"
    >
      <Particles active={heroInView} />
      <div className="absolute inset-0 bg-gradient-to-b from-base-950 via-base-950/95 to-base-950" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28 z-10">
        <div className={heroInView ? "animate-fade-up" : "opacity-0"}>
          <span className="inline-flex items-center gap-2 rounded-full border border-base-600 bg-base-800/80 px-4 py-1.5 font-mono text-[11px] text-verify-400 backdrop-blur-sm">
            <FiShield size={12} className="animate-pulse" /> Major project · Dept. of Software Engineering
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-ink-100 via-verify-300 to-ink-100 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Know what's real,
            </span>
            <br />
            <span className="text-ink-100">before it spreads.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-400">
            VeriFrame is a multi-modal deepfake detection system — it checks a
            video's face and voice together and returns one explainable
            verdict, backed by deep learning.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/login" className="sm:w-auto group">
              <Button variant="primary" className="sm:w-auto sm:px-6 group-hover:shadow-lg group-hover:shadow-verify-500/20 transition-all">
                Try a detection <FiArrowRight className="inline ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#how-it-works" className="sm:w-auto">
              <Button variant="ghost" className="sm:w-auto sm:px-6">
                See how it works
              </Button>
            </a>
          </div>
        </div>

        <div className={heroInView ? "animate-fade-up delay-300" : "opacity-0"}>
          <VerdictMockup />
        </div>
      </div>
    </section>
  );
}

// ===== Verdict Mockup =====
function VerdictMockup() {
  return (
    <div className="relative mx-auto w-full max-w-sm group">
      <div className="absolute -inset-4 rounded-3xl bg-verify-500/10 blur-2xl animate-pulse-glow" />
      <div className="relative rounded-2xl border border-base-600 bg-base-800/80 backdrop-blur-sm p-5 shadow-2xl shadow-black/40 transition-all duration-300 group-hover:shadow-verify-500/10">
        <div className="flex items-center justify-between border-b border-base-700 pb-3">
          <span className="font-mono text-[11px] text-ink-700">clip_0142.mp4</span>
          <span className="flex items-center gap-1.5 rounded-full bg-verify-500/20 px-2.5 py-1 font-mono text-[11px] text-verify-400 animate-pulse">
            <FiCheckCircle size={12} /> REAL · 96%
          </span>
        </div>

        <div className="relative mt-4 aspect-video overflow-hidden rounded-lg bg-base-900">
          <div className="absolute inset-0 grid-texture opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FiShield className="text-4xl text-ink-700" />
          </div>
          <div className="absolute inset-x-0 h-8 animate-scan bg-gradient-to-b from-transparent via-verify-500/30 to-transparent" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <ScoreBar label="Visual score" value={94} delay={300} />
          <ScoreBar label="Audio score" value={98} delay={500} />
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value, delay }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), delay || 0);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div>
      <div className="flex items-center justify-between text-[11px] text-ink-700">
        <span>{label}</span>
        <span className="font-mono text-ink-500">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-verify-400 to-verify-300 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

// ===== Problem Strip =====
function ProblemStrip() {
  const [ref, inView] = useInView();
  return (
    <section
      id="why"
      ref={ref}
      className={`border-b border-base-700/80 bg-base-900/40 py-14 ${inView ? "animate-fade-up" : "opacity-0"}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="max-w-3xl text-lg leading-relaxed text-ink-300">
          Generative tools — GANs, diffusion, voice cloning — now make
          hyper-realistic fake video and audio cheap to produce.{" "}
          <span className="text-ink-100 font-medium">
            Existing detectors are research-only, analyse a face or a voice
            rarely both, and are unusable by non-experts.
          </span>{" "}
          VeriFrame is a complete, accessible tool that checks both together.
        </p>
      </div>
    </section>
  );
}

// ===== How It Works =====
function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-base-700/80 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Pipeline"
          title="From upload to verdict, in five steps"
          desc="Every clip runs through the same pipeline — video and audio analysed in parallel, then fused into one decision."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE.map((step, i) => {
            const [ref, inView] = useInView();
            return (
              <div
                key={step.title}
                ref={ref}
                className={`relative group ${inView ? "animate-fade-up delay-100" : "opacity-0"}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-base-600 bg-base-800 group-hover:border-verify-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-verify-500/10">
                  <step.icon className="text-verify-400 group-hover:scale-110 transition-transform duration-300" size={20} />
                </div>
                <p className="mt-4 font-mono text-[11px] text-ink-700">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-base font-semibold text-ink-100">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-ink-500">{step.desc}</p>

                {i < PIPELINE.length - 1 && (
                  <>
                    <div className="absolute right-[-1.5rem] top-5 hidden h-px w-6 bg-base-600 lg:block">
                      <div className="h-full w-0 bg-verify-400 transition-all duration-1000 group-hover:w-full" />
                    </div>
                    <FiArrowRight className="absolute right-[-1.8rem] top-4 hidden text-ink-600 lg:block opacity-0 group-hover:opacity-100 transition-all duration-300" size={12} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== Objectives =====
function Objectives() {
  return (
    <section id="objectives" className="border-b border-base-700/80 bg-base-900/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Objectives"
          title="What the system sets out to do"
          desc="Six goals drive the build, from raw detection accuracy to making the result understandable to a non-expert."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OBJECTIVES.map((o, i) => {
            const [ref, inView] = useInView();
            const delay = `delay-${(i % 3) * 100 + 100}`;
            return (
              <div
                key={o.title}
                ref={ref}
                className={`rounded-xl border border-base-600 bg-base-800/60 p-6 card-3d ${inView ? `animate-fade-up ${delay}` : "opacity-0"}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-verify-500/10 group-hover:bg-verify-500/20 transition-colors">
                  <o.icon className="text-verify-400" size={20} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink-100">
                  {o.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{o.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== Tools Section =====
function ToolsSection() {
  return (
    <section className="border-b border-base-700/80 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Stack"
          title="Tools & technologies"
          desc="The stack the team is building on, grouped by layer."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((group, i) => {
            const [ref, inView] = useInView();
            const delay = `delay-${(i % 3) * 100 + 100}`;
            return (
              <div
                key={group.category}
                ref={ref}
                className={`rounded-xl border border-base-600 bg-base-800/60 p-6 card-3d ${inView ? `animate-fade-up ${delay}` : "opacity-0"}`}
              >
                <h3 className="font-mono text-[11px] uppercase tracking-wide text-verify-400">
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-ink-300 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-verify-400/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== Team Section =====
function TeamSection() {
  return (
    <section id="team" className="border-b border-base-700/80 bg-base-900/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Team"
          title="Who does what"
          desc="Four roles, one pipeline — detection, fusion, backend, and the interface you're looking at now."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, i) => {
            const [ref, inView] = useInView();
            const delay = `delay-${(i % 3) * 100 + 100}`;
            return (
              <div
                key={member.id}
                ref={ref}
                className={`rounded-xl border border-base-600 bg-base-800/60 p-6 card-3d ${inView ? `animate-fade-up ${delay}` : "opacity-0"}`}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-verify-400/20 blur-xl animate-pulse" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-verify-500/10 font-display text-base font-semibold text-verify-400 border border-verify-400/20">
                    {member.initials}
                  </div>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink-100">
                  {member.name}
                </h3>
                <p className="font-mono text-[11px] text-ink-700">{member.id}</p>
                <p className="mt-2 text-sm font-medium text-verify-400">{member.role}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{member.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ===== CTA Section =====
function CTASection() {
  const [ref, inView] = useInView();
  return (
    <section
      ref={ref}
      className={`mx-auto max-w-6xl px-6 py-20 text-center ${inView ? "animate-fade-up" : "opacity-0"}`}
    >
      <div className="relative inline-block">
        <div className="absolute -inset-4 bg-verify-500/10 blur-3xl rounded-full" />
        <h2 className="relative font-display text-3xl font-semibold text-ink-100 sm:text-4xl">
          Check your first clip in under a minute
        </h2>
      </div>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-500">
        No install, no account required to see how a scan works.
      </p>
      <div className="mt-8 flex justify-center">
        <Link to="/login" className="w-full sm:w-auto group">
          <Button variant="primary" className="sm:w-auto sm:px-8 group-hover:shadow-lg group-hover:shadow-verify-500/20 transition-all">
            Get started free <FiArrowRight className="inline ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

// ===== Section Heading =====
function SectionHeading({ eyebrow, title, desc }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`max-w-xl ${inView ? "animate-fade-up" : "opacity-0"}`}>
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