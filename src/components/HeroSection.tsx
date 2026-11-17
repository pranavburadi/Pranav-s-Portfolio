import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Film,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Pause,
  Phone,
  Play,
  Terminal,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { CANDIDATE, CAROUSEL_VIDEOS, TERMINAL_TABS } from '../data/portfolioData';

interface HeroSectionProps {
  onCopyEmail: () => void;
  emailCopied: boolean;
}

export default function HeroSection({ onCopyEmail, emailCopied }: HeroSectionProps) {
  const [viewMode, setViewMode] = useState<'reels' | 'terminal'>('reels');
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredVideoIdx, setHoveredVideoIdx] = useState<number | null>(null);
  const [autoRoll, setAutoRoll] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoRatios, setVideoRatios] = useState<Record<string, string>>({});

  const [activeTabId, setActiveTabId] = useState(TERMINAL_TABS[0].id);
  const [isRunning, setIsRunning] = useState(false);
  const [runSequence, setRunSequence] = useState<number>(TERMINAL_TABS[0].outputLines.length);
  const [avatarError, setAvatarError] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeTab = TERMINAL_TABS.find((t) => t.id === activeTabId) || TERMINAL_TABS[0];

  // Strictly at most ONE video plays audio: hovered video takes priority, otherwise front/clicked video
  const activeAudioIdx = isMuted ? null : (hoveredVideoIdx ?? activeIndex);

  // Respect prefers-reduced-motion on initial mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setAutoRoll(false);
    }
  }, []);

  // Ensure ALL carousel videos keep playing visually, and ONLY activeAudioIdx has audio unmuted
  useEffect(() => {
    if (viewMode !== 'reels') {
      videoRefs.current.forEach((vid) => {
        if (vid) vid.muted = true;
      });
      return;
    }
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      vid.defaultMuted = true;
      vid.muted = activeAudioIdx !== idx;
      if (vid.paused) {
        vid.play().catch(() => {});
      }
    });
  }, [viewMode, activeAudioIdx]);

  // Auto-roll smoothly through carousel positions
  useEffect(() => {
    if (viewMode !== 'reels' || !autoRoll || isHovered) return;
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_VIDEOS.length);
    }, 3800);
    return () => window.clearInterval(interval);
  }, [viewMode, autoRoll, isHovered]);

  const handleVideoLoaded = (id: string, idx: number, el: HTMLVideoElement) => {
    el.defaultMuted = true;
    el.muted = activeAudioIdx !== idx;
    el.play().catch(() => {});
    if (el.videoWidth && el.videoHeight) {
      setVideoRatios((prev) => ({
        ...prev,
        [id]: `${el.videoWidth} / ${el.videoHeight}`,
      }));
    }
  };

  const handleVideoClick = (idx: number) => {
    if (activeIndex === idx) {
      // Toggle mute when clicking the already-front video
      setIsMuted((prev) => !prev);
    } else {
      // Bring clicked video to front and play ONLY its audio
      setActiveIndex(idx);
      setIsMuted(false);
    }
  };

  const stepCarousel = (delta: number) => {
    setActiveIndex((prev) => (prev + delta + CAROUSEL_VIDEOS.length) % CAROUSEL_VIDEOS.length);
  };

  const handleSelectTab = (id: string) => {
    setActiveTabId(id);
    const tab = TERMINAL_TABS.find((t) => t.id === id);
    setIsRunning(false);
    setRunSequence(tab ? tab.outputLines.length : 4);
  };

  const handleRunScript = () => {
    setIsRunning(true);
    setRunSequence(1);
    const total = activeTab.outputLines.length;
    for (let i = 2; i <= total; i++) {
      setTimeout(() => {
        setRunSequence(i);
        if (i === total) {
          setIsRunning(false);
        }
      }, (i - 1) * 220);
    }
  };

  return (
    <section id="top" className="relative overflow-hidden pt-10 pb-14 sm:pt-14 sm:pb-20">
      {/* Subtle Ambient Radial Mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-[#00F0FF]/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-1/6 h-[360px] w-[360px] rounded-full bg-[#A855F7]/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Candidate Overview & Direct CTAs */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              {/* Top Profile + Status Strip */}
              <div className="flex flex-wrap items-center gap-3.5 mb-5">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-[#00F0FF]/40 bg-[#11131C] shadow-[0_0_24px_rgba(0,240,255,0.2)] flex items-center justify-center">
                  {!avatarError ? (
                    <img
                      src={CANDIDATE.avatarPath}
                      alt="Pranav Buradi portrait"
                      referrerPolicy="no-referrer"
                      onError={() => setAvatarError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-lg font-extrabold tracking-tight text-[#00F0FF]">
                      PB
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[#00E676]">
                    <span className="h-2 w-2 rounded-full bg-[#00E676] shadow-[0_0_8px_#00E676]" />
                    <span>OPEN TO DATA ANALYST &amp; AI/DEV ROLES (2026)</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#00F0FF]/35 bg-[#00F0FF]/10 px-3 py-1 text-xs font-medium text-[#00F0FF] shadow-[0_0_16px_rgba(0,240,255,0.12)] w-fit">
                    <Zap className="h-3.5 w-3.5 shrink-0" />
                    <span>Well-Versed with AI Tools: ChatGPT · Claude · Gemini · Cursor AI · Copilot · v0</span>
                  </div>
                </div>
              </div>

              {/* Main Heading */}
              <div className="mb-3 font-mono text-xs font-semibold tracking-[0.22em] text-[#00F0FF]">
                {CANDIDATE.fullName.toUpperCase()} · {CANDIDATE.primaryTitle.toUpperCase()}
              </div>
              <h1
                className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl leading-[1.08] titanium-heading mb-5"
                style={{ textWrap: 'balance' }}
              >
                {CANDIDATE.headline}
              </h1>

              {/* Bio Summary */}
              <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-[1.05rem] mb-7">
                {CANDIDATE.bioSummary}
              </p>

              {/* CTA Button Row */}
              <div className="flex flex-wrap items-center gap-3 mb-7">
                <a
                  href="#projects"
                  className="cta-gradient-pill inline-flex items-center gap-2 px-5 py-3 text-sm font-bold whitespace-nowrap shrink-0"
                >
                  <span>Selected Works</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={CANDIDATE.resumePdf}
                  download="Pranav-Buradi-Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-5 py-3 text-sm font-semibold text-[#00F0FF] transition-all duration-150 hover:border-[#00F0FF] hover:bg-[#00F0FF]/20 whitespace-nowrap shrink-0"
                >
                  <span>Download Resume (PDF)</span>
                  <Download className="h-4 w-4" />
                </a>
                <a
                  href={CANDIDATE.resumeHtml}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#11131C] px-4 py-3 text-sm font-semibold text-slate-200 transition-colors duration-150 hover:border-white/35 hover:text-white whitespace-nowrap shrink-0"
                >
                  <span>Web Resume</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </a>
                <button
                  type="button"
                  onClick={onCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#11131C] px-4 py-3 text-sm font-semibold text-slate-200 transition-colors duration-150 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] cursor-pointer whitespace-nowrap shrink-0"
                >
                  {emailCopied ? (
                    <>
                      <Check className="h-4 w-4 text-[#00E676]" />
                      <span className="text-[#00E676]">Copied Email</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verified Credentials & Socials Strip */}
            <div className="space-y-4 border-t border-white/10 pt-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-slate-300">
                <span className="text-[#00F0FF]">✦</span>
                <span>VTU B.E. Computer Science (CGPA: 7.3/10)</span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span>Genesis 4-Month Full Stack Intern</span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span>National U-14 Football Representative (Imphal Silver)</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={CANDIDATE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#11131C] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-[#A855F7]/50 hover:text-white"
                >
                  <Instagram className="h-3.5 w-3.5 text-[#A855F7]" />
                  <span>{CANDIDATE.instagramHandle}</span>
                </a>
                <a
                  href={CANDIDATE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#11131C] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-[#2979FF]/60 hover:text-white"
                >
                  <Linkedin className="h-3.5 w-3.5 text-[#2979FF]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={CANDIDATE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#11131C] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-[#00F0FF]/50 hover:text-white"
                >
                  <Github className="h-3.5 w-3.5 text-[#00F0FF]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={CANDIDATE.emailHref}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#11131C] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-[#00F0FF]/50 hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 text-[#00F0FF]" />
                  <span>{CANDIDATE.email}</span>
                </a>
                <a
                  href={CANDIDATE.phoneHref}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#11131C] px-3 py-2 text-xs font-medium text-slate-200 tabular-nums transition-colors hover:border-[#00E676]/50 hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 text-[#00E676]" />
                  <span>{CANDIDATE.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Side-by-Side Rolling Video Carousel & Code Terminal Switcher */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Compact Top Control Bar */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div
                role="tablist"
                aria-label="Hero showcase mode"
                className="inline-flex rounded-full border border-white/10 bg-[#11131C] p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === 'reels'}
                  onClick={() => setViewMode('reels')}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === 'reels'
                      ? 'bg-gradient-to-r from-[#00F0FF] to-[#2979FF] text-[#04070D]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Film className="h-3.5 w-3.5" />
                  <span>Reels Carousel</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === 'terminal'}
                  onClick={() => setViewMode('terminal')}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === 'terminal'
                      ? 'bg-gradient-to-r from-[#00F0FF] to-[#2979FF] text-[#04070D]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Code Terminal</span>
                </button>
              </div>

              {viewMode === 'reels' && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsMuted((m) => !m)}
                    aria-label={isMuted ? 'Unmute videos' : 'Mute videos'}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#11131C] text-slate-300 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] cursor-pointer"
                  >
                    {isMuted ? (
                      <VolumeX className="h-3.5 w-3.5" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5 text-[#00F0FF]" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAutoRoll((r) => !r)}
                    aria-label={autoRoll ? 'Pause rolling carousel' : 'Resume rolling carousel'}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#11131C] text-slate-300 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] cursor-pointer"
                  >
                    {autoRoll ? (
                      <Pause className="h-3.5 w-3.5 text-[#00E676]" />
                    ) : (
                      <Play className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => stepCarousel(-1)}
                    aria-label="Previous video"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#11131C] text-slate-300 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepCarousel(1)}
                    aria-label="Next video"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#11131C] text-slate-300 hover:border-[#00F0FF]/50 hover:text-[#00F0FF] cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {viewMode === 'reels' ? (
              /* Side-by-Side Rolling Carousel: all 3 videos clearly visible & playing simultaneously, frames scaled strictly to each video's 9:16 dimensions, zero titles */
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex flex-1 flex-col justify-center"
              >
                <div className="relative h-[340px] sm:h-[370px] w-full overflow-hidden">
                  {CAROUSEL_VIDEOS.map((video, idx) => {
                    const isActive = idx === activeIndex;
                    const isAudioPlaying = activeAudioIdx === idx;
                    const ratio = videoRatios[video.id] || '9 / 16';
                    const slotOrder = (idx - activeIndex + CAROUSEL_VIDEOS.length) % CAROUSEL_VIDEOS.length;
                    const isHiddenSlot = slotOrder >= 3;

                    return (
                      <div
                        key={video.id}
                        onClick={() => handleVideoClick(idx)}
                        onMouseEnter={() => setHoveredVideoIdx(idx)}
                        onMouseLeave={() =>
                          setHoveredVideoIdx((curr) => (curr === idx ? null : curr))
                        }
                        style={{
                          aspectRatio: ratio,
                          width: 'calc((100% - 24px) / 3)',
                          transform: `translate3d(calc(${slotOrder} * (100% + 12px)), -50%, 0) scale(${
                            isActive ? 1.02 : 0.94
                          })`,
                          opacity: isHiddenSlot ? 0 : isActive ? 1 : 0.85,
                          zIndex: isActive ? 20 : isHiddenSlot ? 0 : 10,
                          pointerEvents: isHiddenSlot ? 'none' : 'auto',
                        }}
                        className={`group absolute left-0 top-1/2 overflow-hidden rounded-[18px] border bg-black transition-[transform,opacity,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                          isActive
                            ? 'border-[#00F0FF]/75 shadow-[0_14px_38px_-12px_rgba(0,240,255,0.45)]'
                            : 'border-white/15 hover:opacity-100 hover:border-white/35'
                        }`}
                      >
                        <video
                          ref={(el) => {
                            videoRefs.current[idx] = el;
                          }}
                          src={video.src}
                          autoPlay
                          muted={activeAudioIdx !== idx}
                          loop
                          playsInline
                          preload="auto"
                          onLoadedMetadata={(e) => handleVideoLoaded(video.id, idx, e.currentTarget)}
                          onCanPlay={(e) => {
                            e.currentTarget.defaultMuted = true;
                            e.currentTarget.muted = activeAudioIdx !== idx;
                            e.currentTarget.play().catch(() => {});
                          }}
                          className="h-full w-full object-cover block"
                        />

                        {/* Minimal corner speaker indicator (only shows active audio or on hover) */}
                        <div
                          className={`pointer-events-none absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-md transition-opacity duration-150 ${
                            isAudioPlaying
                              ? 'border-[#00F0FF]/70 bg-black/75 text-[#00F0FF] opacity-100'
                              : 'border-white/20 bg-black/65 text-slate-300 opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          {isAudioPlaying ? (
                            <Volume2 className="h-3.5 w-3.5" />
                          ) : (
                            <VolumeX className="h-3.5 w-3.5" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Minimal Pagination Dots */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  {CAROUSEL_VIDEOS.map((video, idx) => (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Focus reel ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === idx
                          ? 'w-7 bg-[#00F0FF]'
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Interactive macOS Code Terminal */
              <div className="flex flex-1 flex-col overflow-hidden rounded-[20px] border border-[#00F0FF]/35 bg-[#0C0E15] shadow-[0_20px_60px_-20px_rgba(0,240,255,0.22)]">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 bg-[#11131C] px-4 py-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-[#FF5F56]" />
                    <span className="h-3 w-3 shrink-0 rounded-full bg-[#FFBD2E]" />
                    <span className="h-3 w-3 shrink-0 rounded-full bg-[#27C93F]" />
                    <span className="ml-1.5 inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-300 truncate">
                      <Terminal className="h-3.5 w-3.5 shrink-0 text-[#00F0FF]" />
                      <span className="truncate">pranav@analytics-env</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRunScript}
                    disabled={isRunning}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/15 px-3 py-1 font-mono text-[11px] font-semibold text-[#00F0FF] transition-colors hover:bg-[#00F0FF]/25 disabled:opacity-60 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>{isRunning ? 'Executing...' : 'Run Script'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-[#0F111A] px-3 pt-2 pb-1.5">
                  {TERMINAL_TABS.map((tab) => {
                    const isActive = tab.id === activeTab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleSelectTab(tab.id)}
                        className={`rounded-lg px-2.5 py-1.5 font-mono text-[11px] transition-colors whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'border border-[#00F0FF]/45 bg-[#0C0E15] text-[#00F0FF] font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {tab.filename}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between gap-2 border-b border-white/5 bg-[#0C0E15] px-4 py-1.5 text-[11px] text-slate-400">
                  <span className="truncate">{activeTab.description}</span>
                  <span className="shrink-0 font-mono text-[#A855F7]">{activeTab.language}</span>
                </div>

                <div className="flex-1 overflow-y-auto p-3.5 font-mono text-[11px] leading-5 text-slate-200 terminal-scroll">
                  <pre className="m-0">
                    <code>
                      {activeTab.code.split('\n').map((line, idx) => (
                        <div key={idx} className="flex gap-3">
                          <span className="w-4 shrink-0 select-none text-right text-slate-600 tabular-nums">
                            {idx + 1}
                          </span>
                          <span className="whitespace-pre-wrap break-words text-slate-200 min-w-0 flex-1">
                            {line || ' '}
                          </span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>

                <div className="border-t border-white/10 bg-[#090B11] px-3.5 py-2.5 font-mono text-[10.5px]">
                  <div className="space-y-0.5 text-slate-400 mb-2">
                    {activeTab.outputLines.slice(0, runSequence).map((line, i) => (
                      <div key={i} className={i === 0 ? 'text-[#00F0FF]' : 'text-slate-300'}>
                        {line}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-[#00E676]/30 bg-[#00E676]/10 px-2.5 py-1.5 text-[10.5px] font-semibold text-[#00E676] tabular-nums">
                    {activeTab.finalStatus}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
