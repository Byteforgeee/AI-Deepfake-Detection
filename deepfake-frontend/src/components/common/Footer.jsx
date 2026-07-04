import { FiShield, FiGithub, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-base-700/80 bg-base-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 font-display text-sm font-semibold text-ink-100">
          <FiShield className="text-verify-400" />
          VeriFrame
        </div>

        <p className="text-xs text-ink-700">
          Nepal College of Information Technology · Pokhara University · Dept. of Software Engineering
        </p>

        <div className="flex items-center gap-4 text-ink-500">
          <a href="#" aria-label="GitHub repository" className="hover:text-ink-100">
            <FiGithub size={16} />
          </a>
          <a href="#" aria-label="Contact the team" className="hover:text-ink-100">
            <FiMail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
