import { useParams, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useAnalysis } from "../hooks/useAnalysis";
import { useInView } from "../hooks/useInView";
import { API_BASE_URL } from "../utils/constants";
import Button from "../components/common/Button";
import AnalysisProgress from "../components/analysis/AnalysisProgress";
import AnalysisResultDisplay from "../components/analysis/AnalysisResultDisplay";
import { FiArrowLeft, FiFile, FiImage, FiVideo } from "react-icons/fi";

// ===== Particle Background =====
function Particles({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let width = 0;
      let height = 0;
      let particles = [];
      let rafId;
      const count = 50;

      const resize = () => {
        const rect = canvas.parentElement?.getBoundingClientRect();
        if (!rect) return;
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
            radius: Math.random() * 2 + 0.5,
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
          ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
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
    } catch (err) {
      console.warn("Particles error:", err);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: active ? 1 : 0 }}
    />
  );
}

export default function AnalysisVisualsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { analysis, status, result, loading, error, currentStepIndex } = useAnalysis(id);
  const [pageRef, pageInView] = useInView({ threshold: 0.1 });

  const handleBack = () => {
    navigate("/dashboard");
  };

  // Safe media URL builder
  const getMediaUrl = (filePath) => {
    if (!filePath) return "";
    if (filePath.startsWith("http")) return filePath;
    const base = API_BASE_URL?.replace(/\/api$/, "") || "http://localhost:8000";
    return `${base}${filePath}`;
  };

  // Loading state
  if (loading && !analysis) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-verify-400 border-t-transparent" />
          <p className="text-sm text-ink-500 animate-pulse">Loading analysis...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-base-950 p-6">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" onClick={handleBack} className="mb-6 group">
            <FiArrowLeft className="inline mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Button>
          <div className="rounded-xl border border-alert-500/30 bg-alert-500/10 p-6 text-center text-alert-400 backdrop-blur-sm">
            <p className="text-lg font-semibold">Something went wrong</p>
            <p className="mt-2">{error}</p>
            <Button variant="primary" onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="relative min-h-screen bg-base-950 overflow-hidden">
      <Particles active={pageInView} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col">
        {/* Back button – always visible */}
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} className="group">
            <FiArrowLeft className="inline mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Button>
        </div>

        {/* Main grid – always visible */}
        <div className="flex-1 grid gap-6 lg:grid-cols-2">
          {/* Left: File preview */}
          <div className="flex flex-col">
            {analysis ? (
              <div className="flex-1 rounded-xl border border-base-700 bg-base-800/30 backdrop-blur-sm p-4 shadow-xl shadow-black/20 transition-all duration-300 hover:shadow-verify-500/5">
                <h3 className="font-display text-lg font-semibold text-ink-100 flex items-center gap-2 mb-3">
                  {analysis.file_type === "image" ? (
                    <FiImage className="text-verify-400" />
                  ) : analysis.file_type === "video" ? (
                    <FiVideo className="text-verify-400" />
                  ) : (
                    <FiFile className="text-verify-400" />
                  )}
                  Uploaded File
                </h3>
                <div className="relative flex-1 overflow-hidden rounded-lg border border-base-700 bg-base-900/50 min-h-[300px] lg:min-h-[400px] flex items-center justify-center">
                  {analysis.file_type === "image" ? (
                    <img
                      src={getMediaUrl(analysis.file)}
                      alt="Uploaded file"
                      className="max-h-full max-w-full object-contain p-2"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%231a1a2e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-size='14'%3ENo preview%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <video
                      src={getMediaUrl(analysis.file)}
                      controls
                      className="max-h-full max-w-full object-contain p-2"
                    >
                      <p className="text-ink-500 text-sm">Video preview not available</p>
                    </video>
                  )}
                </div>
                <p className="mt-2 text-xs text-ink-500 truncate">
                  {analysis.file.split("/").pop()}
                </p>
              </div>
            ) : (
              <div className="flex-1 rounded-xl border border-base-700 bg-base-800/30 p-4 flex items-center justify-center text-ink-500">
                No file data
              </div>
            )}
          </div>

          {/* Right: Progress or Results */}
          <div className="flex flex-col">
            <div className="flex-1 rounded-xl border border-base-700 bg-base-800/30 backdrop-blur-sm p-6 shadow-xl shadow-black/20 transition-all duration-300 hover:shadow-verify-500/5">
              {status === "completed" && result ? (
                <AnalysisResultDisplay result={result} analysis={analysis} />
              ) : (
                <AnalysisProgress
                  currentStepIndex={currentStepIndex}
                  status={status}
                  error={error}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}