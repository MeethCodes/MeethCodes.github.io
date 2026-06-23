import { useState } from "react";
import { Mail, MapPin, Phone, Github, Linkedin, Loader2 } from "lucide-react";
import { links } from "@/data/links";
import { useApp } from "@/context/AppContext";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const { playClick } = useApp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    playClick();

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: links.web3formsKey,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="section-container">
        <h2 className="section-heading">Get In Touch</h2>
        <div className="speed-line mb-10" />
        <p className="text-garage-muted mb-10 max-w-xl">
          Open to exciting AIML, automation & infra roles. Let&apos;s build
          something that makes work feel retired.
        </p>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {[
              { Icon: Mail, label: "Email", value: links.email, href: `mailto:${links.email}` },
              { Icon: Phone, label: "Phone", value: links.phone, href: `tel:${links.phone}` },
              { Icon: MapPin, label: "Location", value: links.location },
            ].map(({ Icon, label, value, href }) => (
              <div key={label} className="flex gap-3">
                <Icon className="text-garage-teal shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm text-garage-muted hover:text-garage-teal">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-garage-muted">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              {[
                { Icon: Github, href: links.github },
                { Icon: Linkedin, href: links.linkedin },
                { Icon: Mail, href: `mailto:${links.email}` },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="p-3 rounded-xl border border-white/10 text-garage-muted hover:text-garage-teal hover:border-garage-teal/30 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-card hud-border p-6 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-garage-muted mb-1 block">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-garage-teal/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs text-garage-muted mb-1 block">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-garage-teal/50"
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-garage-muted mb-1 block">Subject</label>
              <input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-garage-teal/50"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label className="text-xs text-garage-muted mb-1 block">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm focus:outline-none focus:border-garage-teal/50 resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Send Message"
              )}
            </button>

            {status === "success" && (
              <p className="text-sm text-garage-teal text-center">
                Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400 text-center">
                Failed to send. Try emailing directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
