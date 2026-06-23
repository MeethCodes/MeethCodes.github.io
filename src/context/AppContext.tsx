import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AppContextValue = {
  recruiterMode: boolean;
  setRecruiterMode: (value: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  playClick: () => void;
  chatOpen: boolean;
  setChatOpen: (value: boolean) => void;
  reducedMotion: boolean;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const playClick = useCallback(() => {
    if (!soundEnabled || recruiterMode) return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      gain.gain.value = 0.03;
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      /* ignore */
    }
  }, [soundEnabled, recruiterMode]);

  const value = useMemo(
    () => ({
      recruiterMode,
      setRecruiterMode,
      soundEnabled,
      setSoundEnabled,
      playClick,
      chatOpen,
      setChatOpen,
      reducedMotion: reducedMotion || recruiterMode,
    }),
    [
      recruiterMode,
      soundEnabled,
      playClick,
      chatOpen,
      reducedMotion,
    ],
  );

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
