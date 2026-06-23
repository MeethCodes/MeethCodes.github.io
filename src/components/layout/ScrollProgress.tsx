import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { reducedMotion } = useApp();

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-white/5">
      <div
        className="h-full bg-garage-gradient transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
