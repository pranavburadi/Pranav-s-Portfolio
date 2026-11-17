import { MARQUEE_ITEMS } from '../data/portfolioData';

export default function MarqueeTicker() {
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className="marquee-wrapper relative overflow-hidden border-y border-white/10 bg-[#0B0D14] py-3.5"
      aria-label="Key candidate highlights"
    >
      <div className="animate-marquee items-center gap-6 px-4">
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 whitespace-nowrap shrink-0">
            <span className="font-mono text-xs font-semibold tracking-wider text-slate-200">
              {item}
            </span>
            <span
              aria-hidden="true"
              className={`text-sm ${
                idx % 2 === 0
                  ? 'text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.75)]'
                  : 'text-[#A855F7] drop-shadow-[0_0_8px_rgba(168,85,247,0.75)]'
              }`}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
