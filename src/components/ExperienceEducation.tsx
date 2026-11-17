import { Award, Briefcase, CheckCircle2, GraduationCap } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION_RECORDS } from '../data/portfolioData';

export default function ExperienceEducation() {
  return (
    <section id="experience" className="py-16 sm:py-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="mb-2 font-mono text-xs font-semibold tracking-[0.2em] text-[#A855F7]">
            05 // EXPERIENCE &amp; ACADEMIC VAULT
          </div>
          <h2
            className="font-display text-3xl font-bold tracking-tight sm:text-4xl titanium-heading"
            style={{ textWrap: 'balance' }}
          >
            Industry Execution &amp; Verified Credentials
          </h2>
        </div>

        {/* Dual-Column Bento Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 mb-8">
          {/* Left Column: Professional Experience */}
          <div className="bento-card p-6 sm:p-7 lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00F0FF]/35 bg-[#00F0FF]/12 text-[#00F0FF]">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-[#00F0FF]">
                      Professional Experience
                    </div>
                    <h3 className="font-display text-xl font-bold text-white">
                      Java Full Stack Developer Intern
                    </h3>
                  </div>
                </div>
                <span className="rounded-full border border-[#00E676]/35 bg-[#00E676]/10 px-3 py-1 font-mono text-xs font-semibold text-[#00E676] whitespace-nowrap">
                  4 Months
                </span>
              </div>

              <div className="mb-4 text-sm font-medium text-slate-300">
                Genesis · Gadag, Karnataka
              </div>

              <p className="text-sm leading-relaxed text-slate-300 mb-5">
                Managed backend MySQL database workflows, executed optimized SQL queries, validated API payloads, and worked in an Agile team to ship the Smart Plot Investment Portal.
              </p>

              <ul className="space-y-2.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00F0FF]" />
                  <span>Normalized relational schemas for Users, Properties, Bookings, and Payments.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00F0FF]" />
                  <span>Validated Spring Boot REST API responses and transaction locks in Postman.</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 font-mono text-xs text-slate-400">
              Core Stack: Java · Spring Boot · MySQL · SQL · REST APIs · Agile
            </div>
          </div>

          {/* Right Column: Academic Foundation */}
          <div className="bento-card p-6 sm:p-7 lg:col-span-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#A855F7]/35 bg-[#A855F7]/12 text-[#A855F7]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#A855F7]">
                  Academic Foundation
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Education Timeline
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {EDUCATION_RECORDS.map((edu, index) => (
                <div
                  key={edu.degree}
                  className={`rounded-2xl border p-4 ${
                    index === 0
                      ? 'border-[#00F0FF]/30 bg-[#151926]'
                      : 'border-white/10 bg-[#0D0F17]'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display text-base font-bold text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">{edu.institution}</p>
                    </div>
                    <div className="text-right font-mono tabular-nums">
                      <div className="text-xs font-bold text-[#00F0FF]">{edu.score}</div>
                      <div className="text-[11px] text-slate-400">{edu.period}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verified Certifications Grid */}
        <div>
          <div className="mb-4 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Award className="h-4 w-4 text-[#00F0FF]" />
            <span>Verified Certifications &amp; Honors</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.title} className="bento-card p-5 flex flex-col justify-between">
                <div>
                  <div className="mb-2 font-mono text-[11px] font-medium text-[#A855F7]">
                    {cert.category}
                  </div>
                  <h4 className="font-display text-sm font-bold leading-snug text-white">
                    {cert.title}
                  </h4>
                </div>
                <div className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">
                  {cert.issuer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
