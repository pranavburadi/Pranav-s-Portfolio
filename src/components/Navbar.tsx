import { useState } from 'react';
import { Download, Instagram, Menu, X } from 'lucide-react';
import { CANDIDATE } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'AI Toolkit', href: '#toolkit' },
  { label: 'Projects', href: '#projects' },
  { label: 'Sports Record', href: '#sports' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07080B]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand Monogram + Title */}
        <a
          href="#top"
          className="group flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded-lg"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#00F0FF]/40 bg-[#11131C] font-display text-sm font-bold tracking-tight text-[#00F0FF] shadow-[0_0_18px_rgba(0,240,255,0.22)] transition-transform duration-200 group-hover:scale-105">
            PB
          </span>
          <span className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-white">
            <span>PRANAV BURADI</span>
            <span className="hidden sm:inline text-[#00F0FF]/60 font-mono">//</span>
            <span className="hidden sm:inline text-[#00F0FF] font-mono text-xs">DATA ANALYST</span>
          </span>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary Navigation">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition-colors duration-150 hover:text-[#00F0FF] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded px-1 py-0.5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <a
            href={CANDIDATE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#A855F7]/45 bg-[#A855F7]/15 px-3.5 py-2 text-xs font-semibold text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.22)] transition-all duration-150 hover:border-[#A855F7]/80 hover:bg-[#A855F7]/25 hover:text-white whitespace-nowrap shrink-0"
          >
            <Instagram className="h-3.5 w-3.5 text-[#A855F7]" />
            <span>Instagram ({CANDIDATE.instagramHandle})</span>
          </a>
          <a
            href={CANDIDATE.resumePdf}
            download="Pranav-Buradi-Resume.pdf"
            className="cta-gradient-pill inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold whitespace-nowrap shrink-0"
          >
            <span>Resume (PDF)</span>
            <Download className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#11131C] text-slate-200 hover:border-[#00F0FF]/40 hover:text-[#00F0FF]"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#07080B]/95 px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-[#00F0FF]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-wrap gap-2.5 border-t border-white/10 pt-4">
            <a
              href={CANDIDATE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#A855F7]/45 bg-[#A855F7]/15 px-3.5 py-2.5 text-xs font-semibold text-purple-200 whitespace-nowrap"
            >
              <Instagram className="h-3.5 w-3.5 text-[#A855F7]" />
              <span>Instagram ({CANDIDATE.instagramHandle})</span>
            </a>
            <a
              href={CANDIDATE.resumePdf}
              download="Pranav-Buradi-Resume.pdf"
              className="cta-gradient-pill inline-flex flex-1 items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold whitespace-nowrap"
            >
              <span>Resume (PDF)</span>
              <Download className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
