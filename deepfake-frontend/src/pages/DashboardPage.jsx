import { useState, useEffect } from 'react';
import { useAuth } from "../hooks/useAuth";
import { useFileUpload } from "../hooks/useFileUpload";
import Button from "../components/common/Button";
import UploadZone from "../components/upload/UploadZone";
import FilePreview from "../components/upload/FilePreview";
import UploadProgress from "../components/upload/UploadProgress";
import ScanningStatus from "../components/upload/ScanningStatus";
import HistoryList from "../components/upload/HistoryList";
import { getHistory } from "../api/analysisApi";
import { FiUploadCloud, FiClock, FiLogOut } from "react-icons/fi";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const {
    file,
    uploadProgress,
    analysisStatus,
    analysisResult,
    isUploading,
    isScanning,
    error,
    currentStepIndex,
    upload,
    reset,
  } = useFileUpload();

  const [activeTab, setActiveTab] = useState('upload');
  const [stats, setStats] = useState({ uploads: 0, analyses: 0, detections: 0 });

  const fetchStats = async () => {
    try {
      const history = await getHistory();
      setStats({
        uploads: history.length,
        analyses: history.filter(h => h.status === 'completed').length,
        detections: history.filter(h => h.status === 'completed' && h.result).length,
      });
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleFileAccepted = (acceptedFile) => {
    upload(acceptedFile);
  };

  // Refresh stats after upload completes
  useEffect(() => {
    if (analysisStatus === 'completed' || analysisStatus === 'failed') {
      fetchStats();
    }
  }, [analysisStatus]);

  return (
    <div className="min-h-screen bg-base-950">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-base-700 pb-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-100">
              Dashboard
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
            className="flex items-center gap-2"
          >
            <FiLogOut size={16} />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-base-700">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'border-b-2 border-verify-400 text-ink-100'
                : 'text-ink-500 hover:text-ink-300'
            }`}
          >
            <FiUploadCloud className="inline mr-2" />
            New Analysis
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'border-b-2 border-verify-400 text-ink-100'
                : 'text-ink-500 hover:text-ink-300'
            }`}
          >
            <FiClock className="inline mr-2" />
            History
          </button>
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === 'upload' && (
            <div className="space-y-6">
              {!file && (
                <UploadZone
                  onFileAccepted={handleFileAccepted}
                  isUploading={isUploading || isScanning}
                />
              )}

              {file && (
                <FilePreview
                  file={file}
                  onRemove={reset}
                />
              )}

              {isUploading && uploadProgress > 0 && uploadProgress < 100 && (
                <UploadProgress progress={uploadProgress} />
              )}

              {(isScanning || analysisStatus === 'completed' || analysisStatus === 'failed') && (
                <ScanningStatus
                  currentStepIndex={currentStepIndex}
                  status={analysisStatus}
                  result={analysisResult}
                  error={error}
                />
              )}

              {analysisStatus === 'completed' && (
                <Button variant="ghost" onClick={reset} className="mt-4">
                  Start new analysis
                </Button>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <HistoryList />
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-base-700 bg-base-800/50 p-6 transition-colors hover:border-base-600">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-verify-500/10 p-3">
                <FiUploadCloud className="text-verify-400" size={20} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-ink-100">{stats.uploads}</p>
                <p className="text-sm text-ink-500">Uploads</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-base-700 bg-base-800/50 p-6 transition-colors hover:border-base-600">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-verify-500/10 p-3">
                <FiClock className="text-verify-400" size={20} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-ink-100">{stats.analyses}</p>
                <p className="text-sm text-ink-500">Analyses</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-base-700 bg-base-800/50 p-6 transition-colors hover:border-base-600">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-verify-500/10 p-3">
                <div className="h-5 w-5 rounded-full border-2 border-verify-400" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-ink-100">{stats.detections}</p>
                <p className="text-sm text-ink-500">Detections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account info */}
        <div className="mt-8 rounded-xl border border-base-700 bg-base-800/50 p-6">
          <h3 className="font-display text-lg font-semibold text-ink-100">
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