import { useState } from 'react';
import { BarChart3, Code2, Cpu, Layers, Sparkles } from 'lucide-react';
import { TOOLKIT_CATEGORIES } from '../data/portfolioData';

const CATEGORY_ICON = {
  'ai-tools': Sparkles,
  programming: Code2,
  'data-ml': Cpu,
  'bi-viz': BarChart3,
  engineering: Layers,
};

const ACCENT_STYLES = {
  purple: {
    border: 'border-[#A855F7]/35 hover:border-[#A855F7]/70',
    glow: 'shadow-[0_0_32px_-12px_rgba(168,85,247,0.35)]',
    badge: 'border-[#A855F7]/40 bg-[#A855F7]/15 text-purple-200',
    chipHover: 'hover:border-[#A855F7]/60 hover:bg-[#A855F7]/15 hover:text-white',
    icon: 'text-[#A855F7] bg-[#A855F7]/15 border-[#A855F7]/35',
  },
  cyan: {
    border: 'border-white/10 hover:border-[#00F0FF]/45',
    glow: '',
    badge: 'border-[#00F0FF]/40 bg-[#00F0FF]/10 text-[#00F0FF]',
    chipHover: 'hover:border-[#00F0FF]/55 hover:bg-[#00F0FF]/10 hover:text-[#00F0FF]',
    icon: 'text-[#00F0FF] bg-[#00F0FF]/12 border-[#00F0FF]/30',
  },
  cobalt: {
    border: 'border-white/10 hover:border-[#2979FF]/55',
    glow: '',
    badge: 'border-[#2979FF]/40 bg-[#2979FF]/15 text-blue-200',
    chipHover: 'hover:border-[#2979FF]/60 hover:bg-[#2979FF]/15 hover:text-blue-200',
    icon: 'text-[#60A5FA] bg-[#2979FF]/15 border-[#2979FF]/35',
  },
  green: {
    border: 'border-white/10 hover:border-[#00E676]/45',
    glow: '',
    badge: 'border-[#00E676]/40 bg-[#00E676]/10 text-[#00E676]',
    chipHover: 'hover:border-[#00E676]/55 hover:bg-[#00E676]/10 hover:text-[#00E676]',
    icon: 'text-[#00E676] bg-[#00E676]/12 border-[#00E676]/30',
  },
};

export default function ToolkitMatrix() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return (
    <section id="toolkit" className="py-16 sm:py-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 font-mono text-xs font-semibold tracking-[0.2em] text-[#A855F7]">
              02 // TECHNICAL TOOLKIT &amp; AI MATRIX
            </div>
            <h2
              className="font-display text-3xl font-bold tracking-tight sm:text-4xl titanium-heading"
              style={{ textWrap: 'balance' }}
            >
              AI-Accelerated Analytics &amp; Engineering Stack
            </h2>
          </div>
          {selectedTool && (
            <button
              type="button"
              onClick={() => setSelectedTool(null)}
              className="self-start rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-3.5 py-1.5 font-mono text-xs text-[#00F0FF] hover:bg-[#00F0FF]/20 cursor-pointer"
            >
              Active Focus: {selectedTool} &times;
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {TOOLKIT_CATEGORIES.map((category, idx) => {
            const styles = ACCENT_STYLES[category.accent];
            const Icon = CATEGORY_ICON[category.id as keyof typeof CATEGORY_ICON] || Code2;
            // Make AI Tools & Accelerators span wider on desktop
            const spanClass =
              idx === 0
                ? 'lg:col-span-4'
                : idx === 1
                ? 'lg:col-span-2'
                : 'lg:col-span-2';

            return (
              <div
                key={category.id}
                className={`rounded-[20px] border bg-[#11131C] p-6 transition-all duration-200 ${styles.border} ${styles.glow} ${spanClass}`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${styles.icon}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {category.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{category.summary}</p>
                    </div>
                  </div>
                  {category.priorityTag && (
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold ${styles.badge}`}
                    >
                      {category.priorityTag}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {category.tools.map((tool) => {
                    const isFocused = selectedTool === tool;
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => setSelectedTool(isFocused ? null : tool)}
                        className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer ${
                          isFocused
                            ? 'border-[#00F0FF] bg-[#00F0FF]/20 text-[#00F0FF] shadow-[0_0_16px_rgba(0,240,255,0.28)]'
                            : `border-white/10 bg-[#181B28] text-slate-200 ${styles.chipHover}`
                        }`}
                      >
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
