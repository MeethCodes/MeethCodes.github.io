import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function CodeCard() {
  const { reducedMotion } = useApp();

  const lines = [
    { delay: 0.2, content: <><span className="text-garage-purple">const</span> <span className="text-blue-400">engineer</span> = {"{"}</> },
    { delay: 0.4, content: <><span className="text-pink-400">  name</span>: <span className="text-garage-teal">'Meeth Amin'</span>,</> },
    { delay: 0.5, content: <><span className="text-pink-400">  role</span>: <span className="text-garage-teal">'AIML Engineer'</span>,</> },
    { delay: 0.6, content: <><span className="text-pink-400">  stack</span>: [<span className="text-garage-teal">'Python'</span>, <span className="text-garage-teal">'LangChain'</span>, <span className="text-garage-teal">'AWS'</span>],</> },
    { delay: 0.7, content: <><span className="text-pink-400">  superpower</span>: <span className="text-garage-teal">'automation'</span>,</> },
    { delay: 0.8, content: <><span className="text-pink-400">  passion</span>: <span className="text-garage-teal">'cars & code'</span></> },
    { delay: 0.9, content: <>{"};"}</> },
  ];

  return (
    <div className="glass-card hud-border p-5 font-mono text-xs md:text-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="ml-2 text-garage-muted text-xs">meeth-amin.ts</span>
      </div>
      <div className="text-garage-muted">{"// AIML Engineer @ AI Startup"}</div>
      {lines.map((line, i) =>
        reducedMotion ? (
          <div key={i}>{line.content}</div>
        ) : (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: line.delay, duration: 0.3 }}
          >
            {line.content}
          </motion.div>
        ),
      )}
    </div>
  );
}
