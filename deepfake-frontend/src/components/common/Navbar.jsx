import { Link } from "react-router-dom";
import { FiShield } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import Button from "./Button";

<nav className="sticky top-0 z-50 border-b border-base-700 bg-base-950/80 backdrop-blur-sm">
  ...
</nav>

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b border-base-700 bg-base-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink-100">
          <FiShield className="text-verify-400" />
          VeriFrame
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-ink-300">
                {user?.first_name || user?.email}
              </span>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm">
                  Get started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
  
}