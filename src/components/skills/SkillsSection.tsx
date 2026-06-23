import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { skillCategories, statCounters } from "@/data/skills";
import { useApp } from "@/context/AppContext";

function BentoCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { reducedMotion, playClick } = useApp();

  const onMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const spanClass =
    category.span === "lg"
      ? "md:col-span-2"
      : category.span === "md"
        ? "md:col-span-1"
        : "";

  return (
    <motion.div
      ref={ref}
      className={cn("glass-card hud-border p-6", spanClass)}
      style={
        reducedMotion
          ? {}
          : {
              transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }
      }
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onMouseEnter={playClick}
      initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <h3 className="font-semibold mb-4 gradient-text">{category.name}</h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-garage-muted hover:border-garage-teal/30 hover:text-white transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { reducedMotion } = useApp();

  return (
    <section id="skills">
      <div className="section-container">
        <motion.h2
          className="section-heading"
          {...(reducedMotion
            ? {}
            : {
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: true },
              })}
        >
          Skills & Stack
        </motion.h2>
        <div className="speed-line mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {statCounters.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="glass-card p-4 text-center"
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-2xl font-bold gradient-text">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="text-xs text-garage-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {skillCategories.map((cat, i) => (
            <BentoCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
