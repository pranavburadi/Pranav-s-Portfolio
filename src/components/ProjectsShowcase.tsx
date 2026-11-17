import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Database,
  GitBranch,
  KeyRound,
  Lock,
  ShieldCheck,
  X,
} from 'lucide-react';
import { CANDIDATE } from '../data/portfolioData';

type ProjectFilter = 'all' | 'omniflow' | 'smartplot';
type CaseStudyId = 'omniflow' | 'smartplot' | null;

const OMNIFLOW_STAGES = [
  {
    id: 'ingest',
    label: '01. Multi-Source Ingest',
    detail: '52,418 raw shipment CSV & JSON webhooks pulled on schedule',
    metric: '52,418 rows',
  },
  {
    id: 'dedupe',
    label: '02. Schema & Dedupe',
    detail: 'Composite key (shipment_id + stage_ts) eliminates duplicate rows',
    metric: '0 collisions',
  },
  {
    id: 'alert',
    label: '03. REST SLA Alerting',
    detail: 'Automated webhook diagnostics cut failure resolution time by 35%',
    metric: '-35% MTTR',
  },
  {
    id: 'otif',
    label: '04. OTIF Warehouse',
    detail: 'Carrier SLA delay views & penalty models ready for BI consumption',
    metric: '8.2ms batch',
  },
];

const CARRIER_SLA_BUCKETS = [
  { label: 'On-Time', count: 44820, pct: 85.5, color: '#00E676', penalty: '$0' },
  { label: '1–4h Delay', count: 4610, pct: 8.8, color: '#00F0FF', penalty: '$12.4k' },
  { label: '4–12h Delay', count: 2140, pct: 4.1, color: '#2979FF', penalty: '$31.0k' },
  { label: '12h+ Breach', count: 848, pct: 1.6, color: '#A855F7', penalty: '$48.9k' },
];

const SMARTPLOT_TABLES = [
  {
    name: 'users',
    columns: ['PK user_id', 'full_name', 'kyc_status', 'email'],
    note: 'Indexed investor profiles & verified KYC status.',
  },
  {
    name: 'properties',
    columns: ['PK property_id', 'plot_code', 'valuation', 'avail_lock'],
    note: 'Row-level lock flag prevents concurrent double-booking.',
  },
  {
    name: 'bookings',
    columns: ['PK booking_id', 'FK user_id', 'FK property_id', 'booked_at'],
    note: 'UNIQUE(property_id, active_flag) enforces single active holder.',
  },
  {
    name: 'payments',
    columns: ['PK payment_id', 'FK booking_id', 'amount_inr', 'yield_pct'],
    note: 'Real-time investor yield & installment status ledger.',
  },
];

const INVESTOR_LEDGER = [
  { plot: 'PLT-G104', investor: 'A. Deshmukh', capital: '₹14.5L', yieldPct: '11.4%', status: 'Settled' },
  { plot: 'PLT-G209', investor: 'R. Kulkarni', capital: '₹22.0L', yieldPct: '12.1%', status: 'Locked' },
  { plot: 'PLT-G312', investor: 'S. Patil', capital: '₹18.2L', yieldPct: '10.8%', status: 'Settled' },
];

export default function ProjectsShowcase() {
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const [activeStage, setActiveStage] = useState(0);
  const [activeBucket, setActiveBucket] = useState(0);
  const [activeTable, setActiveTable] = useState('bookings');
  const [modalProject, setModalProject] = useState<CaseStudyId>(null);

  const showOmniFlow = filter === 'all' || filter === 'omniflow';
  const showSmartPlot = filter === 'all' || filter === 'smartplot';

  return (
    <section id="projects" className="py-16 sm:py-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Bar */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 font-mono text-xs font-semibold tracking-[0.2em] text-[#00F0FF]">
              03 // FLAGSHIP CASE STUDIES
            </div>
            <h2
              className="font-display text-3xl font-bold tracking-tight sm:text-4xl titanium-heading"
              style={{ textWrap: 'balance' }}
            >
              Production Analytics &amp; Database Engineering
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects"
            className="inline-flex self-start rounded-full border border-white/10 bg-[#11131C] p-1"
          >
            {[
              { id: 'all' as const, label: 'All Works (2)' },
              { id: 'omniflow' as const, label: 'OmniFlow' },
              { id: 'smartplot' as const, label: 'Smart Plot' },
            ].map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(tab.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00F0FF] to-[#2979FF] text-[#04070D] shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Strictly ONLY OmniFlow and Smart Plot */}
        <div className="space-y-8">
          {/* PROJECT 1: OMNIFLOW */}
          {showOmniFlow && (
            <article className="bento-card overflow-hidden p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left Narrative Column */}
                <div className="flex flex-col justify-between lg:col-span-6">
                  <div>
                    <div className="mb-2 font-mono text-xs font-medium text-[#00F0FF]">
                      Academic Flagship Project // Automated Multi-Source ETL Pipeline
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white sm:text-3xl mb-2">
                      OmniFlow
                    </h3>
                    <p className="mb-5 text-sm font-medium text-slate-300">
                      <span className="text-[#00E676] font-mono">Scope:</span> 52,000+ multi-stage transactional records analyzed.
                    </p>

                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00F0FF]" />
                        <span>
                          Engineered automated Python &amp; SQL ingestion pipelines eliminating redundant duplicate entries.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00F0FF]" />
                        <span>
                          Integrated RESTful error alerting routines reducing data pipeline failure resolution time by 35%.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00F0FF]" />
                        <span>
                          Built analytical views benchmarking carrier OTIF delivery performance and SLA penalties.
                        </span>
                      </li>
                    </ul>

                    {/* Tech Stack Chips */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {['Python', 'SQL', 'REST APIs', 'Pandas', 'MySQL', 'Git', 'Data Modeling', 'ETL'].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-white/10 bg-[#181B28] px-2.5 py-1 font-mono text-[11px] font-medium text-slate-200"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={CANDIDATE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-gradient-pill inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold whitespace-nowrap shrink-0"
                    >
                      <span>View GitHub Repository</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setModalProject('omniflow')}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#00F0FF]/35 bg-[#00F0FF]/10 px-5 py-2.5 text-xs font-semibold text-[#00F0FF] transition-colors hover:bg-[#00F0FF]/20 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Interactive Case Study</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Interactive Visual Column */}
                <div className="flex flex-col gap-4 lg:col-span-6">
                  {/* Interactive Pipeline Flow */}
                  <div className="rounded-2xl border border-white/10 bg-[#0B0D14] p-4 sm:p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#00F0FF]">
                        <GitBranch className="h-3.5 w-3.5" />
                        <span>Interactive ETL Data Flow</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">Click stage to inspect</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {OMNIFLOW_STAGES.map((stage, i) => {
                        const active = i === activeStage;
                        return (
                          <button
                            key={stage.id}
                            type="button"
                            onClick={() => setActiveStage(i)}
                            className={`flex flex-col justify-between rounded-xl border p-3 text-left transition-all cursor-pointer ${
                              active
                                ? 'border-[#00F0FF] bg-[#00F0FF]/12 shadow-[0_0_20px_rgba(0,240,255,0.18)]'
                                : 'border-white/10 bg-[#131622] hover:border-white/25'
                            }`}
                          >
                            <div className="font-mono text-[11px] font-semibold text-white leading-snug">
                              {stage.label}
                            </div>
                            <div className="mt-2 font-mono text-[11px] font-bold text-[#00F0FF] tabular-nums">
                              {stage.metric}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-[#11131C] px-3.5 py-2.5 text-xs text-slate-300">
                      <span>{OMNIFLOW_STAGES[activeStage].detail}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#00F0FF]" />
                    </div>
                  </div>

                  {/* Interactive Carrier SLA Delay Distribution Chart */}
                  <div className="rounded-2xl border border-white/10 bg-[#0B0D14] p-4 sm:p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-white">
                        Carrier SLA Delay Distribution (52,418 Shipments)
                      </span>
                      <span className="font-mono text-[11px] text-[#00E676] tabular-nums">
                        OTIF: 85.5%
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {CARRIER_SLA_BUCKETS.map((bucket, idx) => {
                        const isSelected = idx === activeBucket;
                        return (
                          <button
                            key={bucket.label}
                            type="button"
                            onClick={() => setActiveBucket(idx)}
                            className={`w-full rounded-lg p-1.5 text-left transition-colors cursor-pointer ${
                              isSelected ? 'bg-white/5' : 'hover:bg-white/[0.03]'
                            }`}
                          >
                            <div className="mb-1 flex items-center justify-between text-xs">
                              <span className="font-medium text-slate-200">{bucket.label}</span>
                              <span className="font-mono text-slate-300 tabular-nums">
                                {bucket.count.toLocaleString()} ({bucket.pct}%) · Penalty {bucket.penalty}
                              </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${Math.max(bucket.pct, 4)}%`,
                                  backgroundColor: bucket.color,
                                }}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* PROJECT 2: SMART PLOT INVESTMENT PORTAL */}
          {showSmartPlot && (
            <article className="bento-card overflow-hidden p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left Narrative Column */}
                <div className="flex flex-col justify-between lg:col-span-6">
                  <div>
                    <div className="mb-2 font-mono text-xs font-medium text-[#A855F7]">
                      Internship Project // Real Estate Fintech &amp; Investment Platform
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white sm:text-3xl mb-2">
                      Smart Plot Investment Portal
                    </h3>
                    <p className="mb-5 text-sm font-medium text-slate-300">
                      <span className="text-[#00F0FF] font-mono">Scope:</span> Normalized relational database schemas (Users, Properties, Bookings, Payments).
                    </p>

                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A855F7]" />
                        <span>
                          Built backend query procedures and REST APIs calculating real-time investor yields and payment statuses.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A855F7]" />
                        <span>
                          Enforced strict relational transaction rules preventing double-booking errors.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A855F7]" />
                        <span>
                          Delivered responsive investor dashboard for property tracking and booking management.
                        </span>
                      </li>
                    </ul>

                    {/* Tech Stack Chips */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {['MySQL', 'Java', 'Spring Boot', 'SQL', 'HTML', 'CSS', 'JavaScript', 'REST APIs'].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-white/10 bg-[#181B28] px-2.5 py-1 font-mono text-[11px] font-medium text-slate-200"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={CANDIDATE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-gradient-pill inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold whitespace-nowrap shrink-0"
                    >
                      <span>View GitHub Repository</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setModalProject('smartplot')}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#A855F7]/40 bg-[#A855F7]/15 px-5 py-2.5 text-xs font-semibold text-purple-200 transition-colors hover:bg-[#A855F7]/25 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Interactive Case Study</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Interactive Visual Column */}
                <div className="flex flex-col gap-4 lg:col-span-6">
                  {/* Relational Database Schema Blueprint */}
                  <div className="rounded-2xl border border-white/10 bg-[#0B0D14] p-4 sm:p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#A855F7]">
                        <Database className="h-3.5 w-3.5" />
                        <span>Relational Schema Blueprint (MySQL)</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#00E676]">
                        <Lock className="h-3 w-3" />
                        <span>0 Double-Bookings</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {SMARTPLOT_TABLES.map((tbl) => {
                        const isSelected = activeTable === tbl.name;
                        return (
                          <button
                            key={tbl.name}
                            type="button"
                            onClick={() => setActiveTable(tbl.name)}
                            className={`rounded-xl border p-3 text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#A855F7] bg-[#A855F7]/12 shadow-[0_0_20px_rgba(168,85,247,0.18)]'
                                : 'border-white/10 bg-[#131622] hover:border-white/25'
                            }`}
                          >
                            <div className="mb-1.5 flex items-center justify-between">
                              <span className="font-mono text-xs font-bold uppercase text-white">
                                {tbl.name}
                              </span>
                              <KeyRound className="h-3 w-3 text-[#00F0FF]" />
                            </div>
                            <div className="space-y-0.5 font-mono text-[10px] text-slate-400">
                              {tbl.columns.map((col) => (
                                <div key={col} className="truncate">
                                  {col}
                                </div>
                              ))}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-3 rounded-xl border border-white/5 bg-[#11131C] px-3.5 py-2 font-mono text-[11px] text-slate-300">
                      <span className="text-[#A855F7] font-semibold">{activeTable}: </span>
                      {SMARTPLOT_TABLES.find((t) => t.name === activeTable)?.note}
                    </div>
                  </div>

                  {/* Investor Portfolio Transaction View */}
                  <div className="rounded-2xl border border-white/10 bg-[#0B0D14] p-4 sm:p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-white">
                        Investor Portfolio Transaction Ledger
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#00F0FF]">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>ACID Locked</span>
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-xs tabular-nums">
                        <thead>
                          <tr className="border-b border-white/10 text-[11px] text-slate-400">
                            <th className="pb-2 font-medium">Plot</th>
                            <th className="pb-2 font-medium">Investor</th>
                            <th className="pb-2 font-medium">Capital</th>
                            <th className="pb-2 font-medium">Est. Yield</th>
                            <th className="pb-2 text-right font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {INVESTOR_LEDGER.map((row) => (
                            <tr key={row.plot} className="text-slate-200">
                              <td className="py-2 text-[#00F0FF] font-semibold">{row.plot}</td>
                              <td className="py-2 font-sans">{row.investor}</td>
                              <td className="py-2">{row.capital}</td>
                              <td className="py-2 text-[#00E676]">{row.yieldPct}</td>
                              <td className="py-2 text-right text-[11px] text-purple-200">
                                {row.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>

      {/* Interactive Case Study Modal */}
      {modalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Project Case Study Details"
          onClick={() => setModalProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[20px] border border-[#00F0FF]/40 bg-[#11131C] p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalProject(null)}
              aria-label="Close case study modal"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#181B28] text-slate-300 hover:border-[#00F0FF] hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {modalProject === 'omniflow' ? (
              <div>
                <div className="mb-2 font-mono text-xs font-semibold text-[#00F0FF]">
                  CASE STUDY // OMNIFLOW ETL PIPELINE
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  OmniFlow — Automated Multi-Source Logistics Analytics
                </h3>
                <p className="text-sm leading-relaxed text-slate-300 mb-5">
                  Designed to solve fragmented multi-stage logistics reporting where duplicate webhook events skewed carrier performance metrics. OmniFlow automates ingestion, enforces schema invariants, alerts on SLA breaches via REST endpoints, and outputs clean OTIF carrier scorecards.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-xl border border-white/10 bg-[#0B0D14] p-3.5">
                    <div className="font-mono text-lg font-bold text-[#00F0FF] tabular-nums">52,000+</div>
                    <div className="text-xs text-slate-400">Records Analyzed</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0B0D14] p-3.5">
                    <div className="font-mono text-lg font-bold text-[#00E676] tabular-nums">-35%</div>
                    <div className="text-xs text-slate-400">Failure Resolution Time</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0B0D14] p-3.5">
                    <div className="font-mono text-lg font-bold text-[#A855F7] tabular-nums">0</div>
                    <div className="text-xs text-slate-400">Duplicate Collisions</div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#090B11] p-4 font-mono text-xs text-slate-300 mb-6">
                  <div className="text-[#00F0FF] mb-1.5">-- Key SQL Analytical View</div>
                  <pre className="overflow-x-auto whitespace-pre">
{`CREATE VIEW v_carrier_otif_summary AS
SELECT carrier_code,
  COUNT(*) AS shipments,
  ROUND(AVG(delay_hours), 2) AS avg_delay,
  SUM(sla_penalty_usd) AS total_penalty
FROM omniflow_cleaned
GROUP BY carrier_code;`}
                  </pre>
                </div>

                <a
                  href={CANDIDATE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-gradient-pill inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold"
                >
                  <span>Explore on GitHub</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            ) : (
              <div>
                <div className="mb-2 font-mono text-xs font-semibold text-[#A855F7]">
                  CASE STUDY // GENESIS INTERNSHIP PROJECT
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  Smart Plot Investment Portal — Real Estate Fintech Platform
                </h3>
                <p className="text-sm leading-relaxed text-slate-300 mb-5">
                  Engineered during a 4-month Java Full Stack internship at Genesis. Focused on strict MySQL normalization across Users, Properties, Bookings, and Payments to eliminate concurrent double-booking race conditions and expose accurate real-time yield calculations.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="rounded-xl border border-white/10 bg-[#0B0D14] p-3.5">
                    <div className="font-mono text-lg font-bold text-[#A855F7] tabular-nums">4 Tables</div>
                    <div className="text-xs text-slate-400">3NF Normalized Schema</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0B0D14] p-3.5">
                    <div className="font-mono text-lg font-bold text-[#00E676] tabular-nums">ACID</div>
                    <div className="text-xs text-slate-400">Zero Double-Bookings</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0B0D14] p-3.5">
                    <div className="font-mono text-lg font-bold text-[#00F0FF] tabular-nums">REST API</div>
                    <div className="text-xs text-slate-400">Spring Boot Yield Engine</div>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#090B11] p-4 font-mono text-xs text-slate-300 mb-6">
                  <div className="text-[#A855F7] mb-1.5">-- Collision-Free Plot Locking Transaction</div>
                  <pre className="overflow-x-auto whitespace-pre">
{`START TRANSACTION;
SELECT avail_lock FROM properties WHERE property_id = ? FOR UPDATE;
INSERT INTO bookings (user_id, property_id, status) VALUES (?, ?, 'LOCKED');
UPDATE properties SET avail_lock = 1 WHERE property_id = ?;
COMMIT;`}
                  </pre>
                </div>

                <a
                  href={CANDIDATE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-gradient-pill inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold"
                >
                  <span>Explore on GitHub</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
