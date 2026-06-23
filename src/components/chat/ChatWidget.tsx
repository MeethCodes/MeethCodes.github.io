import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { links } from "@/data/links";
import { useApp } from "@/context/AppContext";

type Message = { role: "user" | "assistant"; content: string };

const STARTER_PROMPTS = [
  "What does Meeth do at his startup?",
  "What AI tools does he know?",
  "Tell me about his automation work",
  "Is he open to work?",
];

export default function ChatWidget() {
  const { chatOpen, setChatOpen, playClick } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Meeth's AI assistant. Ask me anything about his experience, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    playClick();
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${links.chatApiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chat failed");
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm temporarily offline. Meeth is setting up the AI backend — meanwhile, reach out at aminmeeth89@gmail.com or check his GitHub!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!chatOpen && (
        <button
          type="button"
          onClick={() => {
            playClick();
            setChatOpen(true);
          }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-garage-gradient px-5 py-3 text-sm font-semibold text-garage-bg shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle size={20} />
          Ask My AI
        </button>
      )}

      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(100vw-2rem,400px)] h-[min(70vh,520px)] flex flex-col glass-card hud-border shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <Bot className="text-garage-teal" size={20} />
              <span className="font-semibold text-sm">Meeth&apos;s AI</span>
            </div>
            <button
              type="button"
              onClick={() => {
                playClick();
                setChatOpen(false);
              }}
              className="p-1 text-garage-muted hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hidden">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "text-sm rounded-xl px-3 py-2 max-w-[90%]",
                  msg.role === "user"
                    ? "ml-auto bg-garage-teal/20 text-white"
                    : "bg-white/5 text-garage-muted",
                )}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-garage-muted text-sm">
                <Loader2 size={14} className="animate-spin" /> Thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {STARTER_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => sendMessage(p)}
                  className="text-xs px-2 py-1 rounded-full border border-white/10 text-garage-muted hover:border-garage-teal/40 hover:text-garage-teal transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2 p-3 border-t border-white/10"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Meeth..."
              className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-garage-teal/50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-lg bg-garage-teal/20 text-garage-teal hover:bg-garage-teal/30 disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
