import { motion } from "framer-motion";
import { experience } from "@/data/experience";
import { useApp } from "@/context/AppContext";

export default function ExperienceSection() {
  const { reducedMotion } = useApp();

  return (
    <section id="experience" className="relative bg-white/[0.02]">
      <div className="section-container">
        <motion.h2
          className="section-heading"
          {...(reducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
              })}
        >
          Experience
        </motion.h2>
        <div className="speed-line mb-12" />

        <div className="relative border-l border-garage-teal/30 ml-4 space-y-10">
          {experience.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative pl-8"
              {...(reducedMotion
                ? {}
                : {
                    initial: { opacity: 0, x: -20 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true },
                    transition: { delay: index * 0.15 },
                  })}
            >
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-garage-teal ring-4 ring-garage-bg" />
              <span className="text-xs font-mono text-garage-teal">
                {item.period}
              </span>
              <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
              <p className="text-garage-muted text-sm">{item.company}</p>
              <p className="text-garage-muted text-sm mt-2">
                {item.description}
              </p>
              <ul className="mt-3 space-y-1.5">
                {item.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-sm text-garage-muted flex gap-2 before:content-['▸'] before:text-garage-teal before:shrink-0"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
