import { createFileRoute } from "@tanstack/react-router";
import { BottomNav, Screen } from "@/components/app-shell";
import { brl, useLucro } from "@/lib/lucro-store";
import { Star, MapPin, Clock, Gauge, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/historico")({
  head: () => ({
    title: "Histórico de Corridas — LucroReal",
    meta: [
      { name: "description", content: "Histórico detalhado das suas corridas finalizadas." },
      { property: "og:title", content: "Histórico de Corridas — LucroReal" },
    ],
  }),
  component: Historico,
});

function Historico() {
  const { history } = useLucro();

  // Filtrar apenas corridas finalizadas
  const finishedRides = history
    .filter((h) => h.status === "finished")
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
      <Screen
        title="Histórico"
        subtitle={`${finishedRides.length} corridas finalizadas`}
      >
        <div className="space-y-4">
          {finishedRides.length === 0 ? (
            <div className="glass-card flex flex-col items-center justify-center rounded-3xl py-12 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-elevated text-muted-foreground">
                <Clock className="size-8" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Nenhuma corrida finalizada ainda.
              </p>
            </div>
          ) : (
            finishedRides.map((item) => (
              <div
                key={item.id}
                className="glass-card animate-rise overflow-hidden rounded-3xl"
              >
                {/* Header do Card com Semáforo */}
                <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-3 rounded-full animate-signal ${
                        item.verdict.light === "go"
                          ? "bg-go text-go"
                          : item.verdict.light === "warn"
                            ? "bg-warn text-warn"
                            : "bg-stop text-stop"
                      }`}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {new Date(item.timestamp).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-elevated px-2 py-0.5">
                    <Star className="size-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-[11px] font-bold tabular-nums">
                      {item.ride.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Conteúdo Principal */}
                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {item.ride.app}
                      </p>
                      <h3 className="mt-0.5 line-clamp-1 text-sm font-bold">
                        {item.ride.destino}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Valor
                      </p>
                      <p className="mt-0.5 text-lg font-extrabold text-go">
                        {brl(item.ride.fare)}
                      </p>
                    </div>
                  </div>

                  {/* Grid de Métricas */}
                  <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-4">
                    <div>
                      <div className="mb-1 flex items-center gap-1.5 text-muted-foreground">
                        <TrendingUp className="size-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wide">
                          R$ por KM
                        </span>
                      </div>
                      <p className="text-sm font-extrabold tabular-nums">
                        {brl(item.verdict.perKm)}
                      </p>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-1.5 text-muted-foreground">
                        <Gauge className="size-3" />
                        <span className="text-[10px] font-bold uppercase tracking-wide">
                          R$ por Hora
                        </span>
                      </div>
                      <p className="text-sm font-extrabold tabular-nums">
                        {brl(item.verdict.perHour)}
                      </p>
                    </div>
                  </div>

                  {/* Lucro Líquido */}
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-elevated/50 px-4 py-3">
                    <span className="text-xs font-bold text-muted-foreground">
                      Lucro Líquido Real
                    </span>
                    <span className="font-display text-lg font-black tabular-nums text-primary">
                      {brl(item.verdict.netProfit)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Screen>
      <BottomNav />
    </>
  );
}
