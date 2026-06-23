import { Github, Linkedin, Mail } from "lucide-react";
import { links } from "@/data/links";
import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-2xl font-bold gradient-text">MA.</span>
            <p className="mt-2 text-sm text-garage-muted max-w-md">
              {profile.title} — building systems that make work feel retired.
            </p>
          </div>
          <div className="flex gap-4">
            {[
              { Icon: Github, href: links.github, label: "GitHub" },
              { Icon: Linkedin, href: links.linkedin, label: "LinkedIn" },
              {
                Icon: Mail,
                href: `mailto:${links.email}`,
                label: "Email",
              },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full border border-white/10 text-garage-muted hover:text-garage-teal hover:border-garage-teal/40 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className="speed-line my-8" />
        <p className="text-center text-xs text-garage-muted">
          © {year} {profile.name} · Built with React & Tailwind · Open to Work
        </p>
      </div>
    </footer>
  );
}
