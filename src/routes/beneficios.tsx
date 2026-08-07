import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, Clock, Zap, Star, Shield, Trophy, ArrowRight, Loader2 } from "lucide-react";
import { useLucro } from "@/lib/lucro-store";

export const Route = createFileRoute("/beneficios")({
  head: () => ({
    meta: [
      { title: "Benefícios Premium — LucroReal" },
      { name: "description", content: "Conheça as vantagens do LucroReal Premium e inicie seu teste grátis." },
    ],
  }),
  component: BeneficiosPage,
});

function BeneficiosPage() {
  const { setLoggedIn } = useLucro();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setLoading(true);
    // Simulating transition to the subscription choice or app
    setTimeout(() => {
      setLoggedIn(true);
      navigate({ to: "/assinatura" });
    }, 800);
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-md px-6 pb-12 pt-12">
      <div className="animate-fade-in mb-8 flex items-center justify-between rounded-2xl bg-primary/10 border border-primary/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-primary animate-pulse" />
          <span className="text-[13px] font-bold text-primary">Acesso Liberado por:</span>
        </div>
        <span className="text-sm font-black tabular-nums text-primary">{formatTime(timeLeft)}</span>
      </div>

      <div className="animate-rise inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
        <Sparkles className="size-3.5" />
        Experiência Premium
      </div>
      
      <h1 className="animate-rise mt-4 text-4xl font-extrabold leading-tight tracking-tight">
        O Copiloto que <span className="text-primary">Dobra</span> seus Ganhos.
      </h1>
      
      <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
        Descubra as ferramentas exclusivas que transformam motoristas comuns em profissionais de elite.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4">
        {[
          { icon: Zap, title: "Semáforo Inteligente", desc: "IA que analisa lucro real por segundo.", color: "text-go" },
          { icon: Star, title: "Copiloto por Voz", desc: "Receba avisos sem olhar para o celular.", color: "text-primary" },
          { icon: Shield, title: "Escudo de Segurança", desc: "Zonas de risco e passageiros perigosos.", color: "text-stop" },
          { icon: Trophy, title: "Metas Dinâmicas", desc: "Acompanhe seu progresso em tempo real.", color: "text-warn" },
        ].map((item, i) => (
          <div key={i} className="glass-card flex items-start gap-4 rounded-[28px] p-5 transition-all hover:bg-elevated/40">
            <div className={`grid size-12 place-items-center rounded-2xl bg-elevated/80 ${item.color}`}>
              <item.icon className="size-6" />
            </div>
            <div>
              <p className="text-base font-bold">{item.title}</p>
              <p className="text-[13px] text-muted-foreground leading-relaxed mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-4">
        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 rounded-2xl bg-primary py-5 text-[16px] font-black text-primary-foreground shadow-[0_10px_40px_rgba(var(--primary-rgb),0.3)] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
        >
          {loading ? <Loader2 className="size-5 animate-spin" /> : <Zap className="size-5 fill-current" />}
          VERIFICAR 14 DIAS GRÁTIS
          <ArrowRight className="size-5 ml-1" />
        </button>

        <p className="text-center text-[11px] font-medium text-muted-foreground/60 px-8">
          Ao clicar, você será direcionado para ativar seu período de teste sem compromisso.
        </p>
      </div>
    </div>
  );
}
