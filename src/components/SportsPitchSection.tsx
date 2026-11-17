import { useState } from 'react';
import { Award, MapPin, Trophy } from 'lucide-react';
import { PITCH_POSITIONS } from '../data/portfolioData';

export default function SportsPitchSection() {
  const [selectedCode, setSelectedCode] = useState<string>('ST');

  return (
    <section id="sports" className="py-16 sm:py-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="mb-2 font-mono text-xs font-semibold tracking-[0.2em] text-[#00F0FF]">
            04 // SPORTS RECORD
          </div>
          <h2
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl titanium-heading"
            style={{ textWrap: 'balance' }}
          >
            Athletic Background &amp; Positions Played
          </h2>
        </div>

        {/* National Honors Banner */}
        <div className="bento-card mb-8 border-[#00F0FF]/30 bg-gradient-to-r from-[#11131C] via-[#131826] to-[#11131C] p-6 sm:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#00F0FF]/45 bg-[#00F0FF]/12 text-[#00F0FF] shadow-[0_0_28px_rgba(0,240,255,0.28)]">
                <Trophy className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                  National Level Under-14 Football Representative
                </h3>
                <p className="mt-1 text-sm font-medium text-[#00F0FF]">
                  Runners-up (2nd Prize Silver Medalist) — Student Olympics Football Competition, Imphal, Manipur
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin className="h-3.5 w-3.5 text-[#A855F7]" />
                  <span>Participated in National Level U-14 Tournament in Pune, Maharashtra</span>
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#00E676]/35 bg-[#00E676]/10 px-4 py-2 font-mono text-xs font-semibold text-[#00E676] md:self-center shrink-0">
              <Award className="h-4 w-4" />
              <span>National Silver Medalist</span>
            </div>
          </div>
        </div>

        {/* Interactive Pitch HUD + 3 Attacking Positions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
          {/* Left: Interactive 105m x 68m Tactical Pitch */}
          <div className="bento-card flex flex-col justify-between p-5 sm:p-6 lg:col-span-7">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-slate-300">
                105m &times; 68m Tactical Pitch HUD · Attacking Third
              </span>
              <span className="font-mono text-[11px] text-[#00F0FF]">
                Select ST / CAM / RW
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0E16] p-3">
              <svg
                viewBox="0 0 105 68"
                className="w-full h-auto block select-none"
                role="img"
                aria-label="105m by 68m football pitch showing ST, CAM, and RW positions"
              >
                <defs>
                  <linearGradient id="pitchGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0D1624" />
                    <stop offset="100%" stopColor="#090D16" />
                  </linearGradient>
                  <radialGradient id="attackZone" cx="76%" cy="46%" r="36%">
                    <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.16" />
                    <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Pitch Turf Surface */}
                <rect x="0" y="0" width="105" height="68" rx="2" fill="url(#pitchGlow)" />
                <rect x="0" y="0" width="105" height="68" rx="2" fill="url(#attackZone)" />

                {/* Pitch Markings */}
                <g stroke="rgba(255,255,255,0.18)" strokeWidth="0.45" fill="none">
                  {/* Outer touchlines */}
                  <rect x="2" y="2" width="101" height="64" />
                  {/* Halfway line & center circle */}
                  <line x1="52.5" y1="2" x2="52.5" y2="66" />
                  <circle cx="52.5" cy="34" r="9.15" />
                  <circle cx="52.5" cy="34" r="0.5" fill="rgba(255,255,255,0.4)" />

                  {/* Left Penalty Area */}
                  <rect x="2" y="13.84" width="16.5" height="40.32" />
                  <rect x="2" y="24.84" width="5.5" height="18.32" />

                  {/* Right Penalty Area (Attacking Goal) */}
                  <rect x="86.5" y="13.84" width="16.5" height="40.32" />
                  <rect x="97.5" y="24.84" width="5.5" height="18.32" />
                  <path d="M 86.5 26.8 A 9.15 9.15 0 0 0 86.5 41.2" />
                </g>

                {/* Subtle Tactical Link Lines between CAM -> ST & CAM -> RW */}
                <g stroke="#00F0FF" strokeOpacity="0.32" strokeWidth="0.45" strokeDasharray="1.5 1.5">
                  <line x1="64" y1="34" x2="84" y2="34" />
                  <line x1="64" y1="34" x2="75" y2="14" />
                  <line x1="75" y1="14" x2="84" y2="34" />
                </g>

                {/* Position Markers (Strictly ST, CAM, RW) */}
                {PITCH_POSITIONS.map((pos) => {
                  const cx = pos.x;
                  const cy = pos.code === 'RW' ? 14 : 34;
                  const isSelected = selectedCode === pos.code;
                  return (
                    <g
                      key={pos.code}
                      onClick={() => setSelectedCode(pos.code)}
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="6.2"
                          fill="#00F0FF"
                          fillOpacity="0.18"
                          stroke="#00F0FF"
                          strokeOpacity="0.65"
                          strokeWidth="0.4"
                        />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r="3.8"
                        fill={isSelected ? '#00F0FF' : '#181B28'}
                        stroke={isSelected ? '#FFFFFF' : '#00F0FF'}
                        strokeWidth="0.6"
                      />
                      <text
                        x={cx}
                        y={cy + 1.1}
                        textAnchor="middle"
                        fontSize="2.7"
                        fontWeight="700"
                        fontFamily="JetBrains Mono, monospace"
                        fill={isSelected ? '#04070D' : '#FFFFFF'}
                      >
                        {pos.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <p className="mt-4 text-xs italic text-slate-300">
              &ldquo;Competitive tournament football forged my spatial awareness and quick decision-making under pressure.&rdquo;
            </p>
          </div>

          {/* Right: Strictly the 3 Positions Played Cards */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-5">
            {PITCH_POSITIONS.map((pos) => {
              const isSelected = selectedCode === pos.code;
              return (
                <button
                  key={pos.code}
                  type="button"
                  onClick={() => setSelectedCode(pos.code)}
                  className={`bento-card w-full p-5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#00F0FF] bg-[#161B2B] shadow-[0_0_24px_-8px_rgba(0,240,255,0.35)]'
                      : ''
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-9 w-12 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#00F0FF] to-[#2979FF] text-[#04070D]'
                            : 'border border-[#00F0FF]/35 bg-[#00F0FF]/10 text-[#00F0FF]'
                        }`}
                      >
                        {pos.code}
                      </span>
                      <h3 className="font-display text-base font-bold text-white">
                        {pos.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300 mb-2.5">{pos.summary}</p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-[#00F0FF]">
                    {pos.traits.map((trait, idx) => (
                      <span key={trait} className="inline-flex items-center gap-2">
                        <span>{trait}</span>
                        {idx < pos.traits.length - 1 && (
                          <span className="text-slate-600" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
