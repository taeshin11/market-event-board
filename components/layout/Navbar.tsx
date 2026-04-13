"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calendar", label: "Calendar" },
  { href: "/earnings", label: "Earnings" },
  { href: "/dividends", label: "Dividends" },
  { href: "/macro", label: "Macro" },
  { href: "/ipos", label: "IPOs" },
];

export function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const localePath = (href: string) => `/${locale}${href === "/" ? "" : href}`;

  return (
    <header className="bg-white border-b border-[var(--border)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-xl font-bold text-[var(--accent)]">📊</span>
            <span className="font-bold text-[var(--text-primary)] text-lg">MarketEventBoard</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const fullPath = localePath(link.href);
              const isActive = pathname === fullPath;
              return (
                <Link
                  key={link.href}
                  href={fullPath}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--text-muted)] hover:bg-[var(--bg)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg)]"
            onClick={() => setOpen(!open)}
          >
            <span className="block w-5 h-0.5 bg-current mb-1"></span>
            <span className="block w-5 h-0.5 bg-current mb-1"></span>
            <span className="block w-5 h-0.5 bg-current"></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-[var(--border)] px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const fullPath = localePath(link.href);
            const isActive = pathname === fullPath;
            return (
              <Link
                key={link.href}
                href={fullPath}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--text-muted)] hover:bg-[var(--bg)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
