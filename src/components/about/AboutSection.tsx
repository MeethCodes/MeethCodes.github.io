import { motion } from "framer-motion";
import { GraduationCap, Award, Car } from "lucide-react";
import { profile } from "@/data/profile";
import { useApp } from "@/context/AppContext";

export default function AboutSection() {
  const { reducedMotion } = useApp();
  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.5 },
      };

  return (
    <section id="about" className="relative">
      <div className="section-container">
        <motion.div {...motionProps}>
          <h2 className="section-heading">About Me</h2>
          <div className="speed-line mb-10" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div {...motionProps} className="space-y-6">
            <div className="glass-card p-6 font-mono text-xs md:text-sm text-garage-teal overflow-x-auto">
              <pre className="whitespace-pre-wrap">{profile.yamlProfile}</pre>
            </div>
            <p className="text-garage-muted leading-relaxed">{profile.bio}</p>
            <div className="glass-card p-4 flex gap-3 items-start">
              <Car className="text-garage-teal shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium text-white">Fun fact</p>
                <p className="text-sm text-garage-muted">{profile.funFact}</p>
              </div>
            </div>
            <p className="text-sm text-garage-muted">
              <span className="text-garage-teal font-medium">Currently obsessed with:</span>{" "}
              {profile.currentFocus}
            </p>
          </motion.div>

          <motion.div {...motionProps} className="space-y-4">
            <div className="glass-card hud-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="text-garage-teal" size={20} />
                <h3 className="font-semibold">Education</h3>
              </div>
              <p className="font-medium">{profile.education.degree}</p>
              <p className="text-sm text-garage-muted mt-1">
                {profile.education.university}
              </p>
              <p className="text-sm text-garage-muted">
                {profile.education.college}
              </p>
              <p className="text-sm text-garage-teal mt-2">
                Graduated {profile.education.graduated}
              </p>
            </div>

            <div className="glass-card hud-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="text-garage-teal" size={20} />
                <h3 className="font-semibold">Certifications</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.certifications.map((cert) => (
                  <span
                    key={cert.name}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-garage-muted"
                    title={cert.issuer}
                  >
                    {cert.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
