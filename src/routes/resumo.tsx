import { createFileRoute } from "@tanstack/react-router";
import { BottomNav, Screen } from "@/components/app-shell";
import { brl, useLucro } from "@/lib/lucro-store";

export const Route = createFileRoute("/resumo")({
  head: () => ({
    meta: [
      { title: "Resumo do dia — LucroReal" },
      {
        name: "description",
        content:
          "Ganho bruto, lucro líquido real, meta do dia e desempenho das corridas verdes, amarelas e vermelhas.",
      },
      { property: "og:title", content: "Resumo do dia — LucroReal" },
      { property: "og:description", content: "Saiba quanto você realmente lucrou hoje." },
    ],
  }),
  component: Resumo,
});

function Resumo() {
  const { settings, history } = useLucro();
  
  // Filtra apenas corridas finalizadas para o resumo real
  const finishedRides = history.filter(h => h.status === "finished");
  
  const stats = finishedRides.reduce((acc, curr) => {
    acc.bruto += curr.ride.fare;
    acc.custos += curr.verdict.fuelCost + (curr.verdict.totalKm * 0.28);
    acc.verdes += curr.verdict.light === "go" ? 1 : 0;
    acc.amarelas += curr.verdict.light === "warn" ? 1 : 0;
    acc.vermelhas += curr.verdict.light === "stop" ? 1 : 0;
    acc.minutos += curr.verdict.totalMin;
    return acc;
  }, { bruto: 0, custos: 0, verdes: 0, amarelas: 0, vermelhas: 0, minutos: 0 });

  const liquido = stats.bruto - stats.custos;
  const progresso = settings.dailyGoal > 0 ? Math.min(100, (liquido / settings.dailyGoal) * 100) : 0;
  const horasTotal = stats.minutos / 60;

  const barras = [
    { label: "Verdes", value: stats.verdes, cls: "bg-go", text: "text-go" },
    { label: "Amarelas", value: stats.amarelas, cls: "bg-warn", text: "text-warn" },
    { label: "Vermelhas", value: stats.vermelhas, cls: "bg-stop", text: "text-stop" },
  ];

  return (
    <>
      <Screen title="Resumo do dia" subtitle={`${new Date().toLocaleDateString('pt-BR', { weekday: 'long' })} · ${horasTotal.toFixed(1)}h rodando`}>
        <section className="glass-card animate-rise rounded-3xl p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Lucro líquido real
          </p>
          <p className="font-display mt-1 text-[44px] font-extrabold leading-none tabular-nums text-go">
            {brl(liquido)}
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-elevated">
            <div
              className="h-full rounded-full bg-go transition-all duration-700"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {progresso.toFixed(0)}% da meta de {brl(settings.dailyGoal)}
          </p>
        </section>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            { l: "Ganho bruto", v: brl(stats.bruto) },
            { l: "Custos do dia", v: brl(stats.custos) },
            { l: "Corridas", v: String(finishedRides.length) },
            { l: "Lucro por hora", v: brl(horasTotal > 0 ? liquido / horasTotal : 0) },
          ].map((k) => (
            <div key={k.l} className="glass-card rounded-3xl p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {k.l}
              </p>
              <p className="mt-1 text-xl font-extrabold tabular-nums">{k.v}</p>
            </div>
          ))}
        </div>

        <section className="glass-card mt-3 rounded-3xl p-5">
          <p className="text-sm font-bold">Desempenho das decisões</p>
          <div className="mt-4 space-y-3">
            {barras.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className={b.text}>{b.label}</span>
                  <span className="tabular-nums text-muted-foreground">{b.value} finalizadas</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-elevated">
                  <div
                    className={`h-full rounded-full ${b.cls} transition-all duration-700`}
                    style={{ width: `${finishedRides.length > 0 ? (b.value / finishedRides.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
            O resumo exibe apenas dados de corridas concluídas. Recusar corridas "Vermelhas" protege seu lucro real no final do dia.
          </p>
        </section>
      </Screen>
      <BottomNav />
    </>
  );
}
