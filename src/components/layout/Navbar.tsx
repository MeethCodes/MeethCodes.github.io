import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  Briefcase,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { links } from "@/data/links";
import { useApp } from "@/context/AppContext";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "GitHub", href: "#github" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    recruiterMode,
    setRecruiterMode,
    soundEnabled,
    setSoundEnabled,
    playClick,
    setChatOpen,
  } = useApp();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("recruiter-mode", recruiterMode);
  }, [recruiterMode]);

  const toggleRecruiter = () => {
    playClick();
    setRecruiterMode(!recruiterMode);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  return (
    <nav
      className={cn(
        "fixed top-0.5 w-full z-50 transition-all duration-300",
        scrolled ? "bg-garage-bg/90 backdrop-blur-md shadow-lg py-2" : "py-4",
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <a
            href="#home"
            onClick={playClick}
            className="text-xl font-bold gradient-text"
          >
            MA.
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={playClick}
                className="text-sm text-garage-muted hover:text-garage-teal transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                playClick();
                setChatOpen(true);
              }}
              className="text-sm text-garage-muted hover:text-garage-teal flex items-center gap-1"
            >
              <MessageCircle size={16} /> Ask AI
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 text-garage-muted hover:text-white"
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              type="button"
              onClick={toggleRecruiter}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                recruiterMode
                  ? "border-garage-teal bg-garage-teal/20 text-garage-teal"
                  : "border-white/20 text-garage-muted hover:border-white/40",
              )}
            >
              <Briefcase size={14} />
              Recruiter Mode
            </button>
            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="btn-primary text-xs py-2 px-4"
            >
              Resume
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleRecruiter}
              className="p-2 text-garage-muted"
              aria-label="Recruiter mode"
            >
              <Briefcase size={18} />
            </button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="p-2 text-garage-muted"
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass-card mx-4 mt-2 p-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                playClick();
                setOpen(false);
              }}
              className="block text-sm text-garage-muted hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-center text-sm py-2"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}
