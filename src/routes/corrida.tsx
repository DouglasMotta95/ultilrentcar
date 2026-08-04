import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RefreshCw, LayoutGrid, Rows2 } from "lucide-react";
import { BottomNav, Screen } from "@/components/app-shell";
import { RideCard } from "@/components/ride-card";
import { useLucro, type Ride } from "@/lib/lucro-store";

export const Route = createFileRoute("/corrida")({
  head: () => ({
    meta: [
      { title: "Overlay da corrida — LucroReal" },
      {
        name: "description",
        content:
          "Card flutuante com semáforo, R$/km, R$/hora e lucro líquido estimado da corrida em tempo real.",
      },
      { property: "og:title", content: "Overlay da corrida — LucroReal" },
      {
        property: "og:description",
        content: "Semáforo verde, amarelo ou vermelho em 1 segundo para cada corrida.",
      },
    ],
  }),
  component: Corrida,
});

const RIDES: Ride[] = [
  { app: "Uber", fare: 38.4, rating: 4.9, distanceKm: 11.2, pickupKm: 1.4, pickupMin: 4, tripMin: 24, passenger: "Marina", destino: "Jardins → Moema" },
  { app: "99", fare: 12.9, rating: 4.3, distanceKm: 9.8, pickupKm: 3.6, pickupMin: 11, tripMin: 31, passenger: "Rafael", destino: "Centro → Zona Leste" },
  { app: "inDrive", fare: 24.0, rating: 4.7, distanceKm: 8.1, pickupKm: 2.0, pickupMin: 7, tripMin: 22, passenger: "Cláudia", destino: "Pinheiros → Lapa" },
];

function Corrida() {
  const { settings, setSettings, criteria } = useLucro();
  const [i, setI] = useState(0);
  const ride = RIDES[i]!;

  return (
    <>
      <Screen title="Corrida recebida" subtitle="Arraste o card para onde preferir na tela.">
        <div className="mb-4 flex items-center gap-2">
          <div className="glass-card flex flex-1 gap-1 rounded-2xl p-1">
            {(["clean", "completo"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setSettings({ ...settings, cardMode: m })}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold capitalize transition-all duration-300 ${
                  settings.cardMode === m ? "bg-elevated text-primary" : "text-muted-foreground"
                }`}
              >
                {m === "clean" ? <Rows2 className="size-3.5" /> : <LayoutGrid className="size-3.5" />}
                {m}
              </button>
            ))}
          </div>
          <button
            onClick={() => setI((v) => (v + 1) % RIDES.length)}
            aria-label="Simular próxima corrida"
            className="glass-card grid size-11 shrink-0 place-items-center rounded-2xl text-muted-foreground transition-transform duration-200 active:scale-95"
          >
            <RefreshCw className="size-4" />
          </button>
        </div>

        <RideCard
          key={i}
          ride={ride}
          criteria={criteria}
          settings={settings}
          onToggleVoice={() => setSettings({ ...settings, voice: !settings.voice })}
        />

        <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground">
          Simulação do overlay que aparece por cima do {ride.app}. Toque no ícone de atualizar para
          ver outra corrida.
        </p>
      </Screen>
      <BottomNav />
    </>
  );
}
