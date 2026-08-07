import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Check, Sparkles, Loader2, Clock, Zap, Star, Shield, Trophy } from "lucide-react";
import { useLucro } from "@/lib/lucro-store";
import { useServerFn } from "@tanstack/react-start";
import { createCheckoutSession } from "@/lib/subscriptions.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/assinatura")({
  head: () => ({
    meta: [
      { title: "Teste grátis 14 dias — LucroReal Premium" },
      {
        name: "description",
        content:
          "14 dias grátis do LucroReal Premium: semáforo de corridas, alerta por voz, critérios ilimitados e relatório de lucro real.",
      },
      { property: "og:title", content: "Teste grátis 14 dias — LucroReal Premium" },
      {
        property: "og:description",
        content: "Semáforo de corridas, voz e lucro líquido real por menos de R$ 1 por dia.",
      },
    ],
  }),
  component: Assinatura,
});

const PLANOS = [
  { id: "mensal", nome: "Mensal", preco: "R$ 29,90", nota: "por mês" },
  { id: "trimestral", nome: "Trimestral", preco: "R$ 69,90", nota: "R$ 23,30/mês · economize 22%", destaque: true },
  { id: "anual", nome: "Anual", preco: "R$ 199,90", nota: "R$ 16,60/mês · economize 44%" },
];

const BENEFICIOS = [
  "Semáforo instantâneo em cima do app de corrida",
  "Lucro líquido real com combustível e desgaste",
  "Aviso por voz sem tirar os olhos da rua",
  "Critérios e perfis ilimitados",
  "Resumo diário de ganhos e metas",
];

function Assinatura() {
  const { setSubscribed } = useLucro();
  const navigate = useNavigate();
  const [plano, setPlano] = useState("trimestral");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos em segundos
  const checkoutFn = useServerFn(createCheckoutSession);

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

  const começar = async () => {
    setLoading(true);
    try {
      const priceIds: Record<string, string> = {
        mensal: "price_monthly",
        trimestral: "price_quarterly",
        anual: "price_yearly",
      };

      const result = await checkoutFn({
        data: {
          planId: plano as "mensal" | "trimestral" | "anual",
          priceId: priceIds[plano],
        },
      });

      if (result.url) {
        setSubscribed(true);
        if (result.url.startsWith("/")) {
          navigate({ to: result.url as any });
        } else {
          window.location.href = result.url;
        }
      }
    } catch (error) {
      console.error("Erro ao iniciar assinatura:", error);
      toast.error("Erro ao processar assinatura. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-md px-5 pb-12 pt-8">
      {/* Timer Banner */}
      <div className="animate-fade-in mb-6 flex items-center justify-between rounded-2xl bg-primary/10 border border-primary/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-primary animate-pulse" />
          <span className="text-[13px] font-bold text-primary">Oferta de Teste Expira em:</span>
        </div>
        <span className="text-sm font-black tabular-nums text-primary">{formatTime(timeLeft)}</span>
      </div>

      <div className="animate-rise inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
        <Sparkles className="size-3.5" />
        14 dias grátis - Acesso Total
      </div>
      
      <h1 className="animate-rise mt-4 text-3xl font-extrabold leading-tight tracking-tight">
        Multiplique seus ganhos com <span className="text-primary">Inteligência Artificial</span>.
      </h1>
      
      <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
        Aproveite o período de teste e descubra por que os motoristas top da Uber usam o LucroReal.
      </p>

      {/* Benefits with icons for a more premium look */}
      <div className="mt-8 grid grid-cols-1 gap-3">
        {[
          { icon: Zap, title: "Semáforo IA", desc: "Análise instantânea de rentabilidade" },
          { icon: Star, title: "Alerta de Voz", desc: "Foque na estrada, nós avisamos se vale" },
          { icon: Shield, title: "Segurança Total", desc: "Evite regiões perigosas e corridas ruins" },
          { icon: Trophy, title: "Relatório de Elite", desc: "Controle seu lucro líquido real" },
        ].map((item, i) => (
          <div key={i} className="glass-card flex items-center gap-4 rounded-3xl p-4 transition-all hover:bg-elevated/40">
            <div className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary">
              <item.icon className="size-5" />
            </div>
            <div>
              <p className="text-sm font-bold">{item.title}</p>
              <p className="text-[12px] text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-2">
        <p className="px-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">Escolha seu plano após o teste</p>
        {PLANOS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlano(p.id)}
            className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-3xl border p-4 text-left transition-all duration-300 ${
              plano === p.id
                ? "border-primary/60 bg-primary/10"
                : "border-border bg-card/60"
            }`}
          >
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-bold">
                {p.nome}
                {p.destaque && (
                  <span className="rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-bold uppercase text-warn">
                    Popular
                  </span>
                )}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{p.nota}</p>
            </div>
            <span className="shrink-0 text-base font-extrabold tabular-nums">{p.preco}</span>
          </button>
        ))}
      </div>

      <button
        onClick={começar}
        disabled={loading}
        className="mt-8 w-full flex items-center justify-center gap-3 rounded-2xl bg-primary py-4.5 text-[15px] font-black text-primary-foreground shadow-[0_8px_30px_rgb(var(--primary-rgb),0.3)] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? <Loader2 className="size-5 animate-spin" /> : <Zap className="size-5 fill-current" />}
        COMEÇAR MEU TESTE GRÁTIS
      </button>

      <button
        onClick={() => {
          setSubscribed(true);
          navigate({ to: "/corrida" });
        }}
        className="mt-4 w-full rounded-2xl py-3 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground active:opacity-70"
      >
        Continuar sem assinar por enquanto
      </button>

      <p className="mt-6 text-center text-[10px] text-muted-foreground/50">
        Você não será cobrado hoje. O teste de 14 dias é totalmente gratuito.
      </p>
    </div>
  );
}
