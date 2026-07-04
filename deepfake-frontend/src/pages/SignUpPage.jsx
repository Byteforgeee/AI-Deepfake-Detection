import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShield } from "react-icons/fi";
import SignUpForm from "../components/auth/SignUpForm";
import { useAuth } from "../hooks/useAuth";

export default function SignUpPage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const navigate = useNavigate();

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
    <div className="flex min-h-screen bg-base-950">
      <div className="relative hidden w-1/2 overflow-hidden border-r border-base-700 lg:flex lg:flex-col lg:justify-between lg:p-12 grid-texture">
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

      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 font-display text-lg font-semibold text-ink-100 lg:hidden">
            <FiShield className="text-verify-400" />
            VeriFrame
          </div>

          <h1 className="font-display text-2xl font-semibold text-ink-100">Create an account</h1>
          <p className="mt-1.5 text-sm text-ink-500">
            Start detecting deepfakes in minutes.
          </p>

          <div className="mt-8">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScanMark() {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      <div className="absolute inset-0 rounded-3xl border border-base-600" />
      <div className="absolute inset-4 rounded-2xl border border-dashed border-base-600" />

      {[
        "left-2 top-2 border-l border-t",
        "right-2 top-2 border-r border-t",
        "left-2 bottom-2 border-l border-b",
        "right-2 bottom-2 border-r border-b",
      ].map((pos) => (
        <span key={pos} className={`absolute h-5 w-5 border-verify-400 ${pos}`} />
      ))}

      <FiShield className="relative z-10 text-5xl text-ink-700" />

      <div className="absolute inset-4 overflow-hidden rounded-2xl">
        <div className="h-8 w-full animate-scan bg-gradient-to-b from-transparent via-verify-500/40 to-transparent" />
      </div>

      <span className="absolute -bottom-8 font-mono text-[11px] tracking-wide text-verify-500 animate-pulseGlow">
        ANALYZING…
      </span>
    </div>
  );
}