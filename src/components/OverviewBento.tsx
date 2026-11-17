import { Cpu, Database, LineChart, Trophy } from 'lucide-react';
import { OVERVIEW_PILLARS } from '../data/portfolioData';

const ACCENT_MAP = {
  cyan: {
    iconBg: 'bg-[#00F0FF]/12 border-[#00F0FF]/35 text-[#00F0FF]',
    metricText: 'text-[#00F0FF]',
    Icon: Database,
  },
  purple: {
    iconBg: 'bg-[#A855F7]/12 border-[#A855F7]/35 text-[#A855F7]',
    metricText: 'text-[#A855F7]',
    Icon: Cpu,
  },
  cobalt: {
    iconBg: 'bg-[#2979FF]/15 border-[#2979FF]/40 text-[#60A5FA]',
    metricText: 'text-[#60A5FA]',
    Icon: LineChart,
  },
  green: {
    iconBg: 'bg-[#00E676]/12 border-[#00E676]/35 text-[#00E676]',
    metricText: 'text-[#00E676]',
    Icon: Trophy,
  },
};

export default function OverviewBento() {
  return (
    <section id="overview" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <div className="mb-2 font-mono text-xs font-semibold tracking-[0.2em] text-[#00F0FF]">
            01 // CANDIDATE OVERVIEW
          </div>
          <h2
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl titanium-heading"
            style={{ textWrap: 'balance' }}
          >
            Analytical Rigor &amp; Modern Velocity
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {OVERVIEW_PILLARS.map((pillar) => {
            const style = ACCENT_MAP[pillar.accent];
            const Icon = style.Icon;
            return (
              <article
                key={pillar.index}
                className="bento-card flex flex-col justify-between p-6"
              >
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${style.iconBg}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums">
                      {pillar.index}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-3.5 font-mono text-xs font-semibold tabular-nums">
                  <span className={style.metricText}>{pillar.metric}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
