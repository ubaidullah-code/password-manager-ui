import React from "react";

// Tailwind-styled footer for a password manager single-page application
// - Clean, minimal, responsive
// - Links: About, Privacy, Contact
// - Copyright

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Brand */}
          <div className="flex items-center gap-2 text-slate-600">
            <svg
              className="w-6 h-6 text-indigo-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L3 6v5c0 5 3.6 9.7 9 11 5.4-1.3 9-6 9-11V6l-9-4z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-semibold text-slate-700">Vaultly</span>
          </div>

          {/* Middle: Links */}
          <nav className="flex gap-6 text-sm text-slate-500">
            <a href="#about" className="hover:text-indigo-600">
              About
            </a>
            <a href="#privacy" className="hover:text-indigo-600">
              Privacy
            </a>
            <a href="#contact" className="hover:text-indigo-600">
              Contact
            </a>
          </nav>

          {/* Right: Copyright */}
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} Vaultly. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
