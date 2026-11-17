import { useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { CANDIDATE } from '../data/portfolioData';

interface ContactFooterProps {
  onCopyEmail: () => void;
  emailCopied: boolean;
}

export default function ContactFooter({ onCopyEmail, emailCopied }: ContactFooterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const mailtoInquiry = `mailto:${CANDIDATE.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${name || 'Recruiter'}`
  )}&body=${encodeURIComponent(`${message}\n\nReply to: ${email}`)}`;

  return (
    <>
      <section id="contact" className="py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 font-mono text-xs font-semibold tracking-[0.2em] text-[#00F0FF]">
                06 // CONNECT &amp; CONTACT HUB
              </div>
              <h2
                className="font-display text-3xl font-bold tracking-tight sm:text-4xl titanium-heading"
                style={{ textWrap: 'balance' }}
              >
                Direct Channels &amp; Quick Inquiry
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#00E676]/40 bg-[#00E676]/12 px-4 py-2 font-mono text-xs font-semibold text-[#00E676]">
              <span className="h-2 w-2 rounded-full bg-[#00E676] shadow-[0_0_8px_#00E676]" />
              <span>Available Immediately for Data Analyst &amp; Software Roles</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left: 7 Clickable Channel Bento Boxes */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {/* Email Card with Copy Button */}
              <div className="bento-card flex items-center justify-between gap-3 p-5 sm:col-span-2">
                <a
                  href={CANDIDATE.emailHref}
                  className="flex items-center gap-3.5 min-w-0 group"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00F0FF]/35 bg-[#00F0FF]/12 text-[#00F0FF]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] text-slate-400">Direct Email</div>
                    <div className="truncate text-sm font-semibold text-white group-hover:text-[#00F0FF] transition-colors">
                      {CANDIDATE.email}
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={onCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#181B28] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] cursor-pointer shrink-0"
                >
                  {emailCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#00E676]" />
                      <span className="text-[#00E676]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <a
                href={CANDIDATE.phoneHref}
                className="bento-card flex items-center gap-3.5 p-5 group"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00E676]/35 bg-[#00E676]/12 text-[#00E676]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[11px] text-slate-400">Direct Phone</div>
                  <div className="text-sm font-semibold text-white tabular-nums group-hover:text-[#00E676] transition-colors">
                    {CANDIDATE.phoneDisplay}
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="bento-card flex items-center gap-3.5 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2979FF]/35 bg-[#2979FF]/15 text-[#60A5FA]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[11px] text-slate-400">Location</div>
                  <div className="text-sm font-semibold text-white">{CANDIDATE.location}</div>
                </div>
              </div>

              {/* Instagram Card */}
              <a
                href={CANDIDATE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card flex items-center justify-between gap-3 p-5 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#A855F7]/35 bg-[#A855F7]/12 text-[#A855F7]">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-slate-400">Instagram</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#A855F7] transition-colors">
                      {CANDIDATE.instagramHandle}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-[#A855F7]" />
              </a>

              {/* LinkedIn Card */}
              <a
                href={CANDIDATE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card flex items-center justify-between gap-3 p-5 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2979FF]/40 bg-[#2979FF]/15 text-[#60A5FA]">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-slate-400">LinkedIn</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#60A5FA] transition-colors">
                      /in/pranavburadi
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-[#60A5FA]" />
              </a>

              {/* GitHub Card */}
              <a
                href={CANDIDATE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card flex items-center justify-between gap-3 p-5 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-slate-400">GitHub</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#00F0FF] transition-colors">
                      /pranavburadi
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-[#00F0FF]" />
              </a>

              {/* Resume Download Card */}
              <a
                href={CANDIDATE.resumePdf}
                download="Pranav-Buradi-Resume.pdf"
                className="bento-card flex items-center justify-between gap-3 p-5 border-[#00F0FF]/30 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00F0FF]/40 bg-[#00F0FF]/15 text-[#00F0FF]">
                    <Download className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-[#00F0FF]">Resume PDF</div>
                    <div className="text-sm font-semibold text-white">Pranav-Buradi-Resume.pdf</div>
                  </div>
                </div>
                <Download className="h-4 w-4 text-[#00F0FF]" />
              </a>
            </div>

            {/* Right: Interactive Quick Inquiry Form */}
            <div className="bento-card p-6 sm:p-7 lg:col-span-5 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-1.5">
                  Send a Quick Message
                </h3>
                <p className="text-xs text-slate-400 mb-5">
                  Reach out for Data Analyst roles, Python/SQL projects, or interview scheduling.
                </p>

                {submitted ? (
                  <div className="rounded-2xl border border-[#00E676]/40 bg-[#00E676]/10 p-5">
                    <div className="mb-2 flex items-center gap-2 font-display text-base font-bold text-[#00E676]">
                      <Check className="h-5 w-5" />
                      <span>Inquiry Prepared for {name}</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-200 mb-4">
                      Your message has been captured. Click below to open it directly in your email client or reset the form.
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      <a
                        href={mailtoInquiry}
                        className="cta-gradient-pill inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold"
                      >
                        <span>Open in Email App</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setName('');
                          setEmail('');
                          setMessage('');
                        }}
                        className="rounded-full border border-white/15 bg-[#181B28] px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white cursor-pointer"
                      >
                        New Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-slate-300">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Recruiter / Hiring Manager Name"
                        className="w-full rounded-xl border border-white/15 bg-[#0B0D14] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#00F0FF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-slate-300">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-white/15 bg-[#0B0D14] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#00F0FF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-slate-300">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Share role details, interview availability, or project scope..."
                        className="w-full resize-none rounded-xl border border-white/15 bg-[#0B0D14] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#00F0FF] focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="cta-gradient-pill inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm font-bold cursor-pointer"
                    >
                      <span>Send Inquiry</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Cyan Hairline Divider */}
      <footer className="border-t border-[#00F0FF]/30 bg-[#050609] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-slate-300">
            Pranav Buradi — Data Analyst &amp; Software Developer (Edition 2026).
          </p>

          <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-300">
            <a
              href={CANDIDATE.resumePdf}
              download="Pranav-Buradi-Resume.pdf"
              className="hover:text-[#00F0FF] transition-colors"
            >
              Resume (PDF)
            </a>
            <a
              href={CANDIDATE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#A855F7] transition-colors"
            >
              Instagram
            </a>
            <a
              href={CANDIDATE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00F0FF] transition-colors"
            >
              GitHub
            </a>
            <a
              href={CANDIDATE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2979FF] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
