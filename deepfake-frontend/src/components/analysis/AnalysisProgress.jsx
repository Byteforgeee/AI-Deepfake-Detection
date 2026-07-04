import { FiLoader, FiCheckCircle } from "react-icons/fi";
import { SCANNING_STEPS } from "../../constants/scanningSteps";

const AnimatedDots = () => (
  <span className="inline-flex gap-1">
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-verify-400 [animation-delay:-0.3s]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-verify-400 [animation-delay:-0.15s]" />
    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-verify-400" />
  </span>
);

export default function AnalysisProgress({ currentStepIndex, status, error }) {
  if (error && status !== "completed") {
    return (
      <div className="rounded-xl border border-alert-500/30 bg-alert-500/10 p-6 text-center">
        <p className="text-alert-400">Analysis failed. Please try again.</p>
        <p className="text-xs text-alert-300">{error}</p>
      </div>
    );
  }

  if (currentStepIndex < 0 || currentStepIndex >= SCANNING_STEPS.length) {
    return (
      <div className="rounded-xl border border-base-700 bg-base-800/50 p-6 text-center">
        <p className="text-ink-500">Waiting to start...</p>
      </div>
    );
  }

  const currentStep = SCANNING_STEPS[currentStepIndex] || null;
  const progress = ((currentStepIndex + 1) / SCANNING_STEPS.length) * 100;
  const isComplete = status === "completed";

  return (
    <div className="rounded-xl border border-base-700 bg-base-800/50 p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="font-display text-lg font-semibold text-ink-100 flex items-center gap-2">
        {isComplete ? (
          <FiCheckCircle className="text-verify-400" />
        ) : (
          <FiLoader className="animate-spin text-verify-400" />
        )}
        {isComplete ? "Analysis Complete" : "Analysis Progress"}
      </h3>

      <div className="mt-4 space-y-4">
        {/* Current step + progress bar */}
        <div className="flex items-center gap-3">
          <p className="text-sm text-ink-300">
            {currentStep ? currentStep.label : "Processing..."}
            {!isComplete && <AnimatedDots />}
          </p>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-base-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-verify-400 to-verify-300 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-ink-500">
          <span>
            Step {currentStepIndex + 1} of {SCANNING_STEPS.length}
          </span>
          <span>{isComplete ? 100 : Math.round(progress)}%</span>
        </div>

        {/* All steps with status indicators */}
        <div className="mt-6 space-y-2 border-t border-base-700 pt-4">
          {SCANNING_STEPS.map((step, idx) => {
            const isActive = idx === currentStepIndex;
            const isDone = idx < currentStepIndex || status === "completed";
            const isPending = !isDone && !isActive;

            return (
              <div key={step.id} className="flex items-center gap-3 text-xs group">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300 ${
                    isDone
                      ? "bg-verify-500/20 text-verify-400"
                      : isActive
                      ? "bg-verify-500/30 text-verify-400 animate-pulse ring-2 ring-verify-400/50"
                      : "bg-base-700 text-ink-500"
                  }`}
                >
                  {isDone ? (
                    <FiCheckCircle className="w-3 h-3" />
                  ) : isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-verify-400" />
                  ) : (
                    idx + 1
                  )}
                </span>
                <span
                  className={`transition-colors duration-300 ${
                    isDone
                      ? "text-verify-300"
                      : isActive
                      ? "text-ink-100 font-medium"
                      : "text-ink-500"
                  }`}
                >
                  {step.label}
                </span>
                {isActive && (
                  <span className="ml-auto text-[10px] text-verify-400 animate-pulse">
                    processing...
                  </span>
                )}
                {isDone && (
                  <span className="ml-auto text-[10px] text-verify-400">✓</span>
                )}
              </div>
            );
          })}
        </div>

        {isComplete && (
          <div className="mt-4 rounded-lg bg-verify-500/10 p-3 text-center text-verify-400 animate-pulse border border-verify-400/20">
            <FiCheckCircle className="inline mr-2" />
            Analysis complete! Results are ready.
          </div>
        )}
      </div>
    </div>
  );
}