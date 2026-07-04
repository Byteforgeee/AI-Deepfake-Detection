import { FiCheckCircle, FiXCircle, FiBarChart2, FiTrendingUp, FiMusic, FiEye } from "react-icons/fi";

export default function AnalysisResultDisplay({ result, analysis }) {
  const { verdict, confidence, visual_score, audio_score } = result;
  const isReal = verdict === "REAL";

  return (
    <div className="rounded-xl border border-verify-500/30 bg-gradient-to-br from-verify-500/5 via-base-800/30 to-base-900/30 p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header with verdict ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h3 className="font-display text-xl font-semibold text-ink-100 flex items-center gap-2">
          <FiBarChart2 className="text-verify-400" />
          Analysis Results
        </h3>
        <div
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-sm font-bold shadow-lg ${
            isReal
              ? "bg-green-500/20 text-green-400 border border-green-400/30 shadow-green-500/10"
              : "bg-red-500/20 text-red-400 border border-red-400/30 shadow-red-500/10"
          }`}
        >
          {isReal ? <FiCheckCircle className="w-4 h-4" /> : <FiXCircle className="w-4 h-4" />}
          {verdict}
        </div>
      </div>

      {/* Score cards */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-base-800/70 p-4 backdrop-blur-sm border border-base-700/50 hover:border-verify-400/20 transition-colors">
          <div className="flex items-center gap-2 text-ink-500">
            <FiTrendingUp className="text-verify-400" />
            <span className="text-xs font-medium">Confidence</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-ink-100">{confidence}%</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                isReal ? "bg-green-400" : "bg-red-400"
              }`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg bg-base-800/70 p-4 backdrop-blur-sm border border-base-700/50 hover:border-verify-400/20 transition-colors">
          <div className="flex items-center gap-2 text-ink-500">
            <FiBarChart2 className="text-verify-400" />
            <span className="text-xs font-medium">Overall Score</span>
          </div>
          <p className="mt-1 text-2xl font-bold text-ink-100">
            {Math.round((visual_score + audio_score) / 2)}%
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-verify-500 to-verify-300 transition-all duration-1000"
              style={{ width: `${Math.round((visual_score + audio_score) / 2)}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg bg-base-800/70 p-4 backdrop-blur-sm border border-base-700/50 hover:border-verify-400/20 transition-colors">
          <div className="flex items-center gap-2 text-ink-500">
            <FiEye className="text-verify-400" />
            <span className="text-xs font-medium">Visual Score</span>
          </div>
          <p className="mt-1 text-xl font-bold text-ink-100">{visual_score}%</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
            <div
              className="h-full rounded-full bg-verify-400 transition-all duration-1000"
              style={{ width: `${visual_score}%` }}
            />
          </div>
        </div>

        <div className="rounded-lg bg-base-800/70 p-4 backdrop-blur-sm border border-base-700/50 hover:border-verify-400/20 transition-colors">
          <div className="flex items-center gap-2 text-ink-500">
            <FiMusic className="text-verify-400" />
            <span className="text-xs font-medium">Audio Score</span>
          </div>
          <p className="mt-1 text-xl font-bold text-ink-100">{audio_score}%</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-700">
            <div
              className="h-full rounded-full bg-verify-400 transition-all duration-1000"
              style={{ width: `${audio_score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Feature charts (placeholder) */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-base-700 bg-base-800/30 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium text-ink-500">Visual Features</p>
          <div className="mt-2 flex h-32 items-end justify-around gap-1">
            {[70, 85, 92, 78, 95, 88].map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-4 rounded-t bg-gradient-to-t from-verify-500 to-verify-300 transition-all duration-1000"
                  style={{ height: `${val * 0.4}px` }}
                />
                <span className="text-[8px] text-ink-500">{`F${i+1}`}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-base-700 bg-base-800/30 p-4 backdrop-blur-sm">
          <p className="text-xs font-medium text-ink-500">Audio Features</p>
          <div className="mt-2 flex h-32 items-end justify-around gap-1">
            {[80, 65, 90, 75, 88, 82].map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div
                  className="w-4 rounded-t bg-gradient-to-t from-verify-500 to-verify-300 transition-all duration-1000"
                  style={{ height: `${val * 0.4}px` }}
                />
                <span className="text-[8px] text-ink-500">{`F${i+1}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meta info */}
      {analysis && (
        <div className="mt-4 text-xs text-ink-500 flex items-center gap-4 border-t border-base-700/50 pt-3">
          <span>Analysis ID: #{analysis.id}</span>
          <span>·</span>
          <span>{new Date(analysis.created_at).toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}