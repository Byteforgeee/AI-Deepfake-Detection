import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function PublicRoute({ children }) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-verify-400 border-t-transparent" />
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}