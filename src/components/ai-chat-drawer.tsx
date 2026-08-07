import { useState, useEffect, useRef } from "react";
import { X, Send, Bot, User, Share2, Bookmark } from "lucide-react";
import { useLucro } from "@/lib/lucro-store";
import { askAI } from "@/lib/ai.functions.ts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Message = {
  role: "user" | "ai";
  content: string;
};

export function AIChatDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { criteria, settings } = useLucro();
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Olá! Sou seu copiloto inteligente. Como posso ajudar com seus ganhos hoje?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await askAI({
        data: {
          question: userMsg,
          driverData: {
            ...criteria,
            ...settings,
          },
        },
      });

      setMessages((prev) => [...prev, { role: "ai", content: res.answer }]);
    } catch (err) {
      toast.error("Erro ao processar pergunta");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-300">
      <div className="glass-card relative flex h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-t-[40px] border-t border-white/10 shadow-glow animate-in slide-in-from-bottom duration-500">
        <header className="flex items-center justify-between border-b border-white/5 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-primary/20 text-primary">
              <Bot className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Copiloto IA</h2>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Online · Dados Reais</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-2xl bg-elevated/50 p-2.5 text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto px-6 py-6 scrollbar-none">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex w-full animate-rise", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("flex max-w-[85%] flex-col gap-2", m.role === "user" ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "rounded-[24px] px-5 py-4 text-sm leading-relaxed",
                    m.role === "user" ? "bg-primary font-bold text-primary-foreground" : "bg-elevated/80 text-foreground shadow-sm ring-1 ring-white/5",
                  )}
                >
                  {m.content}
                </div>
                {m.role === "ai" && (
                  <div className="flex gap-4 px-2">
                    <button onClick={() => toast.success("Salvo para referência")} className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1">
                      <Bookmark className="size-3" /> SALVAR
                    </button>
                    <button onClick={() => toast.success("Link de compartilhamento copiado")} className="text-[10px] font-bold text-muted-foreground hover:text-primary flex items-center gap-1">
                      <Share2 className="size-3" /> COMPARTILHAR
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-rise">
              <div className="bg-elevated/80 rounded-[24px] px-5 py-4 ring-1 ring-white/5">
                <div className="flex gap-1">
                  <span className="size-1.5 animate-bounce rounded-full bg-primary" />
                  <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.2s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="border-t border-white/5 bg-card/50 p-6 backdrop-blur-md">
          <div className="flex gap-2 rounded-[24px] bg-elevated/80 p-1.5 ring-1 ring-white/10 focus-within:ring-primary/50 transition-all">
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte ao seu copiloto..."
              className="flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              disabled={!input.trim() || loading}
              className="grid size-11 place-items-center rounded-2xl bg-primary text-primary-foreground disabled:opacity-50 transition-transform active:scale-95 shadow-lg shadow-primary/20"
            >
              <Send className="size-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
