import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Download, MessageCircle, ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { links } from "@/data/links";
import { useApp } from "@/context/AppContext";
import TypingHero from "./TypingHero";
import CodeCard from "./CodeCard";

const HeroParticles = lazy(() => import("./HeroParticles"));

export default function HeroSection() {
  const { playClick, setChatOpen, reducedMotion } = useApp();

  const fade = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-garage-mesh -z-20" />
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fade} className="space-y-6">
            <span className="open-badge">
              <span className="w-2 h-2 rounded-full bg-garage-teal animate-pulse" />
              Open to Work
            </span>

            <p className="text-garage-muted text-sm">Hello, I&apos;m</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {profile.name.split(" ")[0]}{" "}
              <span className="gradient-text">
                {profile.name.split(" ")[1]}
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl text-garage-muted font-light">
              {profile.title}
            </h2>

            <TypingHero />

            <p className="text-garage-muted text-sm max-w-lg leading-relaxed">
              I build convenience systems and automate the painful parts — so
              teams stop grinding on problems that should&apos;ve been solved
              years ago.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setChatOpen(true);
                }}
                className="btn-primary"
              >
                <MessageCircle size={18} />
                Ask My AI
              </button>
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="btn-outline"
              >
                <Download size={18} />
                Resume
              </a>
              <a href="#contact" onClick={playClick} className="btn-outline">
                Contact
              </a>
            </div>
          </motion.div>

          <motion.div
            {...(reducedMotion
              ? {}
              : {
                  initial: { opacity: 0, x: 40 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.7, delay: 0.3 },
                })}
            className="space-y-6"
          >
            <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
              <div className="absolute inset-0 rounded-2xl bg-garage-gradient opacity-20 blur-xl animate-float" />
              <div className="glass-card hud-border relative w-full h-full overflow-hidden rounded-2xl">
                <img
                  src="/imgs/me.png"
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/imgs/avatar-placeholder.svg";
                  }}
                />
              </div>
            </div>
            <CodeCard />
          </motion.div>
        </div>

        <motion.a
          href="#about"
          className="flex justify-center mt-16 text-garage-muted hover:text-garage-teal transition-colors"
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={24} />
        </motion.a>
      </div>
    </section>
  );
}
