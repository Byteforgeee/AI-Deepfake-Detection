import { Link, useLocation } from "react-router-dom";
import { FiShield } from "react-icons/fi";
import Button from "./Button";

const NAV_LINKS = [
  { label: "The problem", href: "#why" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Objectives", href: "#objectives" },
  { label: "Team", href: "#team" },
];

export default function Navbar() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-base-700/80 bg-base-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink-100">
          <FiShield className="text-verify-400" />
          VeriFrame
        </Link>

        {isLandingPage && (
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink-500 transition-colors hover:text-ink-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden text-sm font-medium text-ink-300 hover:text-ink-100 sm:block">
            Sign in
          </Link>
          <Link to="/signup">
            <Button variant="primary" className="!w-auto px-4 py-2 text-xs sm:text-sm">
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
