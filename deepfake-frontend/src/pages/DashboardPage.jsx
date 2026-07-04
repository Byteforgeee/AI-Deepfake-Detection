import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";
import { FiUploadCloud, FiClock, FiLogOut } from "react-icons/fi";

export default function DashboardPage() {
  const { user, logout } = useAuth();

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

        {/* Stats / Quick actions */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-base-700 bg-base-800/50 p-6 transition-colors hover:border-base-600">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-verify-500/10 p-3">
                <FiUploadCloud className="text-verify-400" size={20} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-ink-100">0</p>
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
                <p className="text-2xl font-semibold text-ink-100">0</p>
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
                <p className="text-2xl font-semibold text-ink-100">0</p>
                <p className="text-sm text-ink-500">Detections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content placeholder */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-base-700 bg-base-800/50 p-6">
            <h3 className="font-display text-lg font-semibold text-ink-100">
              Start a new analysis
            </h3>
            <p className="mt-2 text-sm text-ink-500">
              Upload a video to detect deepfakes using visual and audio analysis.
            </p>
            <Button variant="primary" className="mt-4">
              Upload video
            </Button>
          </div>

          <div className="rounded-xl border border-base-700 bg-base-800/50 p-6">
            <h3 className="font-display text-lg font-semibold text-ink-100">
              Recent activity
            </h3>
            <p className="mt-2 text-sm text-ink-500">
              Your recent analyses will appear here.
            </p>
            <Button variant="ghost" className="mt-4">
              View history
            </Button>
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