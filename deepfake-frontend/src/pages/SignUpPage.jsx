import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiShield } from "react-icons/fi";
import SignUpForm from "../components/auth/SignUpForm";
import { useAuth } from "../hooks/useAuth";
import { useInView } from "../hooks/useInView";

// ===== Particle Background (same as landing) =====
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

export default function SignUpPage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();
  const [pageRef, pageInView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-verify-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div ref={pageRef} className="relative min-h-screen bg-base-950 overflow-hidden">
      {/* Particle Background */}
      <Particles active={pageInView} />

      <div className="relative z-10 flex min-h-screen">
        {/* Brand panel (hidden on small screens) */}
        <div
          className={`relative hidden w-1/2 overflow-hidden border-r border-base-700 lg:flex lg:flex-col lg:justify-between lg:p-12 grid-texture transition-opacity duration-1000 ${
            pageInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-base-950 via-base-950/95 to-verify-900/10" />

          <div className="relative z-10 flex items-center gap-2 font-display text-lg font-semibold text-ink-100">
            <FiShield className="text-verify-400" />
            VeriFrame-DeepFakeDetection
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center">
            <ScanMark />
          </div>

          <div className="relative z-10 max-w-sm">
            <p className="font-display text-2xl font-medium leading-snug text-ink-100">
              Multi-modal verification of video &amp; audio authenticity using
              deep learning.
            </p>
            <p className="mt-3 font-mono text-xs text-ink-500">
              visual score · audio score · fused verdict
            </p>
            <p className="mt-6 text-xs text-ink-700">
              Nepal College of Information Technology · Pokhara University
            </p>
          </div>
        </div>

        {/* Auth panel */}
        <div
          className={`flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20 transition-all duration-1000 ${
            pageInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8 flex items-center gap-2 font-display text-lg font-semibold text-ink-100 lg:hidden">
              <FiShield className="text-verify-400" />
              VeriFrame
            </div>

            <h1 className="font-display text-3xl font-semibold text-ink-100">
              <span className="bg-gradient-to-r from-ink-100 via-verify-300 to-ink-100 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                Create an account
              </span>
            </h1>
            <p className="mt-1.5 text-sm text-ink-500">
              Start detecting deepfakes in minutes.
            </p>

            <div className="mt-8">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Scan Mark (enhanced with subtle pulse) =====
function ScanMark() {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center group">
      <div className="absolute -inset-4 rounded-3xl bg-verify-500/10 blur-2xl animate-pulse-glow" />
      <div className="absolute inset-0 rounded-3xl border border-base-600 transition-colors group-hover:border-verify-400" />
      <div className="absolute inset-4 rounded-2xl border border-dashed border-base-600" />

      {[
        "left-2 top-2 border-l border-t",
        "right-2 top-2 border-r border-t",
        "left-2 bottom-2 border-l border-b",
        "right-2 bottom-2 border-r border-b",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute h-5 w-5 border-verify-400 transition-all duration-300 group-hover:border-verify-300 ${pos}`}
        />
      ))}

      <FiShield className="relative z-10 text-5xl text-ink-700 group-hover:text-verify-400 transition-colors duration-300" />

      <div className="absolute inset-4 overflow-hidden rounded-2xl">
        <div className="h-8 w-full animate-scan bg-gradient-to-b from-transparent via-verify-500/40 to-transparent" />
      </div>

      <span className="absolute -bottom-8 font-mono text-[11px] tracking-wide text-verify-500 animate-pulseGlow">
        ANALYZING…
      </span>
    </div>
  );
}