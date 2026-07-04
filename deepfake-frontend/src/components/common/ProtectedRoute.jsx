import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FiLoader } from "react-icons/fi";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-950">
        <div className="flex flex-col items-center gap-4">
          <FiLoader className="h-8 w-8 animate-spin text-verify-400" />
          <p className="text-sm text-ink-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}