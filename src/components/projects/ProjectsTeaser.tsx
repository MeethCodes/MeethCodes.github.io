import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { useApp } from "@/context/AppContext";

const placeholders = [1, 2, 3];

export default function ProjectsTeaser() {
  const { reducedMotion } = useApp();

  return (
    <section id="projects">
      <div className="section-container">
        <motion.div
          {...(reducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
              })}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-garage-teal mb-4">
            <Rocket size={20} />
            <span className="text-sm font-mono uppercase tracking-widest">
              Coming Soon
            </span>
          </div>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="text-garage-muted max-w-lg mx-auto">
            New projects are shipping public soon. Check back in a few days for
            full case studies with architecture notes and live demos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {placeholders.map((n, i) => (
            <motion.div
              key={n}
              className="glass-card p-6 space-y-4"
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-32 rounded-xl bg-white/5 animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
              <div className="h-3 w-full rounded bg-white/5 animate-pulse" />
              <div className="h-3 w-5/6 rounded bg-white/5 animate-pulse" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 rounded-full bg-garage-teal/10 animate-pulse" />
                <div className="h-6 w-16 rounded-full bg-garage-teal/10 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
