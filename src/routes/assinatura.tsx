import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sparkles, Loader2 } from "lucide-react";
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
  const checkoutFn = useServerFn(createCheckoutSession);

  const começar = async () => {
    setLoading(true);
    try {
      // In a production app, we would use the actual price IDs from Stripe
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
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Erro ao iniciar assinatura:", error);
      toast.error("Erro ao processar assinatura. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-md px-5 pb-12 pt-12">
      <div className="animate-rise inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary">
        <Sparkles className="size-3.5" />
        14 dias grátis
      </div>
      <h1 className="animate-rise mt-4 text-3xl font-extrabold leading-tight">
        Pare de rodar de graça.
        <br />
        Comece hoje sem pagar nada.
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Teste todos os recursos por 14 dias. Cancele quando quiser, sem multa.
      </p>

      <ul className="glass-card mt-6 space-y-3 rounded-3xl p-5">
        {BENEFICIOS.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-go-soft text-go">
              <Check className="size-3.5" />
            </span>
            <span className="text-foreground/90">{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-2">
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
        className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground transition-transform duration-200 active:scale-[0.98] disabled:opacity-70"
      >
        {loading ? <Loader2 className="size-4 animate-spin" /> : null}
        Começar teste grátis
      </button>
      <button
        onClick={começar}
        className="mt-2 w-full rounded-2xl py-3 text-xs font-semibold text-muted-foreground"
      >
        Continuar sem assinar por enquanto
      </button>
    </div>
  );
}
