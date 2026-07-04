import { FiLoader, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { SCANNING_STEPS } from '../../hooks/useFileUpload';

// Animated dots component
const AnimatedDots = () => (
  <span className="inline-flex gap-1">
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-verify-400 [animation-delay:-0.3s]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-verify-400 [animation-delay:-0.15s]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-verify-400" />
  </span>
);

export default function ScanningStatus({ currentStepIndex, status, result, error }) {
  if (status === 'failed') {
    return (
      <div className="rounded-xl border border-alert-500/30 bg-alert-500/10 p-4 text-center">
        <FiXCircle className="mx-auto text-2xl text-alert-400" />
        <p className="mt-2 text-sm text-alert-400">Analysis failed. Please try again.</p>
        {error && <p className="text-xs text-alert-300">{error}</p>}
      </div>
    );
  }

  if (status === 'completed' && result) {
    return (
      <div className="rounded-xl border border-verify-500/30 bg-verify-500/5 p-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-center gap-2 text-verify-400">
          <FiCheckCircle className="text-2xl animate-pulse" />
          <span className="text-lg font-semibold">Analysis Complete</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-base-800 p-3">
            <p className="text-xs text-ink-500">Verdict</p>
            <p className="text-xl font-bold text-ink-100">{result.verdict}</p>
          </div>
          <div className="rounded-lg bg-base-800 p-3">
            <p className="text-xs text-ink-500">Confidence</p>
            <p className="text-xl font-bold text-ink-100">{result.confidence}%</p>
          </div>
          <div className="rounded-lg bg-base-800 p-3">
            <p className="text-xs text-ink-500">Visual Score</p>
            <p className="text-xl font-bold text-ink-100">{result.visual_score}%</p>
          </div>
          <div className="rounded-lg bg-base-800 p-3">
            <p className="text-xs text-ink-500">Audio Score</p>
            <p className="text-xl font-bold text-ink-100">{result.audio_score}%</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStepIndex < 0 || currentStepIndex >= SCANNING_STEPS.length) return null;

  const currentStep = SCANNING_STEPS[currentStepIndex] || null;
  const progress = ((currentStepIndex + 1) / SCANNING_STEPS.length) * 100;

  return (
    <div className="rounded-xl border border-base-700 bg-base-800/50 p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-3">
        <FiLoader className="animate-spin text-verify-400" size={20} />
        <p className="text-sm text-ink-300">
          {currentStep ? currentStep.label : 'Processing...'}
          <AnimatedDots />
        </p>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-verify-400 to-verify-300 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-ink-500">
        Step {currentStepIndex + 1} of {SCANNING_STEPS.length}
      </p>
    </div>
  );
}