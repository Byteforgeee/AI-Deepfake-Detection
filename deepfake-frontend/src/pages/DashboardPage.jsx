import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFileUpload } from "../hooks/useFileUpload";
import { useInView } from "../hooks/useInView";
import Button from "../components/common/Button";
import UploadZone from "../components/upload/UploadZone";
import FilePreview from "../components/upload/FilePreview";
import UploadProgress from "../components/upload/UploadProgress";
import HistoryList from "../components/upload/HistoryList";
import { getHistory } from "../api/analysisApi";
import { FiUploadCloud, FiClock, FiLogOut, FiUser, FiBarChart2 } from "react-icons/fi";

// ===== Particle Background (reused) =====
function Particles({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];
    let rafId;
    const count = 50;

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: active ? 1 : 0 }}
    />
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const {
    file,
    uploadProgress,
    isUploading,
    error,
    upload,
    reset,
  } = useFileUpload();

  const [activeTab, setActiveTab] = useState("upload");
  const [stats, setStats] = useState({ uploads: 0, analyses: 0, detections: 0 });
  const [pageRef, pageInView] = useInView({ threshold: 0.1 });

  const fetchStats = async () => {
    try {
      const history = await getHistory();
      setStats({
        uploads: history.length,
        analyses: history.filter(h => h.status === "completed").length,
        detections: history.filter(h => h.status === "completed" && h.result).length,
      });
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleFileAccepted = async (acceptedFile) => {
    try {
      const id = await upload(acceptedFile);
      navigate(`/analysis/${id}`);
    } catch (err) {
      // error is already set in hook
    }
  };

  return (
    <div ref={pageRef} className="relative min-h-screen bg-base-950 overflow-hidden">
      <Particles active={pageInView} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div
          className={`flex flex-col items-start justify-between gap-4 border-b border-base-700 pb-6 sm:flex-row sm:items-center transition-all duration-1000 ${
            pageInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-100">
              <span className="bg-gradient-to-r from-ink-100 via-verify-300 to-ink-100 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                Dashboard
              </span>
            </h1>
            <p className="mt-1 text-sm text-ink-500">
              Welcome back,{" "}
              <span className="font-medium text-ink-100">
                {user?.first_name || user?.email || "User"}
              </span>
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            className="flex items-center gap-2 hover:border-verify-400 transition-colors"
          >
            <FiLogOut size={16} />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div
          className={`mt-8 flex gap-2 border-b border-base-700 transition-all duration-1000 delay-100 ${
            pageInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === "upload"
                ? "border-b-2 border-verify-400 text-ink-100"
                : "text-ink-500 hover:text-ink-300"
            }`}
          >
            <FiUploadCloud className="inline mr-2" />
            New Analysis
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === "history"
                ? "border-b-2 border-verify-400 text-ink-100"
                : "text-ink-500 hover:text-ink-300"
            }`}
          >
            <FiClock className="inline mr-2" />
            History
          </button>
        </div>

        {/* Content */}
        <div
          className={`mt-8 transition-all duration-1000 delay-200 ${
            pageInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {activeTab === "upload" && (
            <div className="space-y-6">
              {!file && (
                <UploadZone
                  onFileAccepted={handleFileAccepted}
                  isUploading={isUploading}
                />
              )}

              {file && <FilePreview file={file} onRemove={reset} />}

              {isUploading && uploadProgress > 0 && uploadProgress < 100 && (
                <UploadProgress progress={uploadProgress} />
              )}

              {error && (
                <div className="rounded-xl border border-alert-500/30 bg-alert-500/10 p-4 text-center text-alert-400">
                  <p>{error}</p>
                  <Button variant="ghost" onClick={reset} className="mt-2">
                    Try again
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && <HistoryList />}
        </div>

        {/* Stats */}
        <div
          className={`mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 delay-300 ${
            pageInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {[
            { icon: FiUploadCloud, label: "Uploads", value: stats.uploads, color: "verify" },
            { icon: FiClock, label: "Analyses", value: stats.analyses, color: "blue" },
            { icon: FiBarChart2, label: "Detections", value: stats.detections, color: "green" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const accent = {
              verify: "border-verify-400/30 bg-verify-500/10 text-verify-400",
              blue: "border-blue-400/30 bg-blue-500/10 text-blue-400",
              green: "border-green-400/30 bg-green-500/10 text-green-400",
            }[stat.color];
            return (
              <div
                key={stat.label}
                className="group rounded-xl border border-base-700 bg-base-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-verify-400/50 hover:shadow-lg hover:shadow-verify-500/10"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-3 transition-colors ${accent}`}>
                    <Icon className="text-lg" size={20} />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-ink-100 group-hover:text-verify-300 transition-colors">
                      {stat.value}
                    </p>
                    <p className="text-sm text-ink-500">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Account info */}
        <div
          className={`mt-8 rounded-xl border border-base-700 bg-base-800/40 p-6 backdrop-blur-sm transition-all duration-1000 delay-400 ${
            pageInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h3 className="font-display text-lg font-semibold text-ink-100 flex items-center gap-2">
            <FiUser className="text-verify-400" />
            Account information
          </h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-ink-500">Email:</span>
              <span className="text-ink-100">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ink-500">Name:</span>
              <span className="text-ink-100">
                {user?.first_name || "Not set"} {user?.last_name || ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ink-500">User ID:</span>
              <span className="font-mono text-xs text-ink-500">{user?.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}