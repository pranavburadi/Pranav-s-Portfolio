import { useCallback, useState } from 'react';
import { Check } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MarqueeTicker from './components/MarqueeTicker';
import OverviewBento from './components/OverviewBento';
import ToolkitMatrix from './components/ToolkitMatrix';
import ProjectsShowcase from './components/ProjectsShowcase';
import SportsPitchSection from './components/SportsPitchSection';
import ExperienceEducation from './components/ExperienceEducation';
import ContactFooter from './components/ContactFooter';
import { CANDIDATE } from './data/portfolioData';

export default function App() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CANDIDATE.email);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = CANDIDATE.email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2600);
  }, []);

  return (
    <div className="min-h-screen bg-[#07080B] text-[#F4F6FB] selection:bg-[#00F0FF]/25 selection:text-[#00F0FF]">
      <Navbar />

      <main>
        <HeroSection onCopyEmail={handleCopyEmail} emailCopied={emailCopied} />
        <MarqueeTicker />
        <OverviewBento />
        <ToolkitMatrix />
        <ProjectsShowcase />
        <SportsPitchSection />
        <ExperienceEducation />
        <ContactFooter onCopyEmail={handleCopyEmail} emailCopied={emailCopied} />
      </main>

      {/* Non-intrusive Copy Confirmation Toast */}
      {emailCopied && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-[#00E676]/45 bg-[#11131C]/95 px-4 py-2.5 text-xs font-semibold text-[#00E676] shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <Check className="h-4 w-4" />
          <span>Copied {CANDIDATE.email} to clipboard</span>
        </div>
      )}
    </div>
  );
}
