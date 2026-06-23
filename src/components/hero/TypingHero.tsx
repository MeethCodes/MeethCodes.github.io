import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { useApp } from "@/context/AppContext";

export default function TypingHero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { reducedMotion } = useApp();
  const lines = profile.taglines;

  useEffect(() => {
    if (reducedMotion) {
      setText(lines[0]);
      return;
    }

    const current = lines[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        45,
      );
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        25,
      );
    } else {
      setDeleting(false);
      setLineIndex((i) => (i + 1) % lines.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, lineIndex, lines, reducedMotion]);

  return (
    <p className="font-mono text-sm md:text-base text-garage-teal min-h-[1.75rem]">
      {text}
      <span className="animate-pulse">|</span>
    </p>
  );
}
