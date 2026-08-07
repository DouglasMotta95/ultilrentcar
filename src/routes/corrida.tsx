import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BottomNav, Screen } from "@/components/app-shell";
import { RideCard } from "@/components/ride-card";
import { useLucro, type Ride } from "@/lib/lucro-store";
import { WifiOff, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/corrida")({
  head: () => ({
    meta: [
      { title: "Radar de Corridas — LucroReal" },
      {
        name: "description",
        content: "Monitore suas corridas e alertas da pista em tempo real com o overlay inteligente.",
      },
      { property: "og:title", content: "Radar de Corridas — LucroReal" },
      { property: "og:description", content: "O semáforo do motorista e piloto." },
    ],
  }),
  component: Corrida,
});

function Corrida() {
  const { criteria, settings, setSettings } = useLucro();
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const [online, setOnline] = useState(true);
  const [kartStatus, setKartStatus] = useState<"verde" | "amarela" | "vermelha">("verde");

  useEffect(() => {
    // Simulador de status em tempo real (otimizado para baixo consumo)
    const interval = setInterval(() => {
      if (settings.mode === "kart") {
        const states: ("verde" | "amarela" | "vermelha")[] = ["verde", "amarela", "vermelha"];
        const newState = states[Math.floor(Math.random() * states.length)] || "verde";
        setKartStatus(newState);
        
        // Simulação de voz
        if (settings.voice) {
          const speech = new SpeechSynthesisUtterance(`Bandeira ${newState}`);
          speech.lang = "pt-BR";
          window.speechSynthesis.speak(speech);
        }

        // Simulação de Push (Browser Notification)
        if (settings.push && "Notification" in window && Notification.permission === "granted") {
          new Notification("LucroReal Kart", { body: `Status da Corrida: ${newState.toUpperCase()}` });
        }
      }
    }, 8000);

    // Monitor de conexão
    const handleStatus = () => setOnline(navigator.onLine);
    window.addEventListener("online", handleStatus);
    window.addEventListener("offline", handleStatus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleStatus);
      window.removeEventListener("offline", handleStatus);
    };
  }, [settings.mode, settings.voice, settings.push]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (settings.mode === "uber") {
      timeout = setTimeout(() => {
        setCurrentRide({
          app: "Uber",
          fare: 28.5,
          rating: 4.9,
          distanceKm: 8.4,
          pickupKm: 1.2,
          pickupMin: 4,
          tripMin: 18,
          passenger: "Ricardo Silva",
          destino: "Aeroporto Internacional",
        });
      }, 2000);
    } else {
      setCurrentRide(null);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [settings.mode]);

  return (
    <>
      <Screen
        title={settings.mode === "uber" ? "Radar de Corridas" : "Status Kart"}
        subtitle={
          settings.mode === "uber"
            ? "O overlay aparecerá automaticamente aqui."
            : "Alertas em tempo real da pista."
        }
      >
        {!online && (
          <div className="mb-4 flex items-center gap-2 rounded-2xl bg-stop-soft p-3 text-xs font-bold text-stop">
            <WifiOff className="size-4" />
            CONEXÃO PERDIDA - ÚLTIMO STATUS MANTIDO
          </div>
        )}

        {settings.mode === "kart" && (
          <div className="animate-rise space-y-4">
            <div
              className={cn(
                "glass-card flex flex-col items-center justify-center gap-6 rounded-[40px] p-12 text-center ring-4 transition-all duration-500",
                kartStatus === "verde" && "ring-go/40 bg-go-soft",
                kartStatus === "amarela" && "ring-warn/40 bg-warn-soft",
                kartStatus === "vermelha" && "ring-stop/40 bg-stop-soft"
              )}
            >
              <div
                className={cn(
                  "animate-pulse-subtle size-32 rounded-full shadow-2xl",
                  kartStatus === "verde" && "bg-go",
                  kartStatus === "amarela" && "bg-warn",
                  kartStatus === "vermelha" && "bg-stop"
                )}
              />
              <div>
                <h2
                  className={cn(
                    "text-4xl font-black uppercase tracking-tighter",
                    kartStatus === "verde" && "text-go",
                    kartStatus === "amarela" && "text-warn",
                    kartStatus === "vermelha" && "text-stop"
                  )}
                >
                  Bandeira {kartStatus}
                </h2>
                <p className="mt-2 text-sm font-bold text-muted-foreground">
                  {kartStatus === "verde" && "Pista liberada. Acelere!"}
                  {kartStatus === "amarela" && "Atenção redobrada na pista."}
                  {kartStatus === "vermelha" && "Perigo imediato. Reduza ou pare."}
                </p>
              </div>
            </div>

            <div className="glass-card flex items-center gap-3 rounded-2xl p-4 text-[11px] text-muted-foreground">
              <Info className="size-4 text-primary" />
              <span>
                Alertas por {settings.voice && "Voz"}
                {settings.voice && settings.push && " e "}
                {settings.push && "Push"} ativos.
              </span>
            </div>
          </div>
        )}

        {currentRide && settings.mode === "uber" ? (
          <RideCard
            ride={currentRide}
            criteria={criteria}
            settings={settings}
            onToggleVoice={() => setSettings({ ...settings, voice: !settings.voice })}
          />
        ) : settings.mode === "uber" ? (
          <div className="mt-20 flex flex-col items-center justify-center text-center opacity-40">
            <div className="animate-pulse-subtle size-24 rounded-full bg-elevated" />
            <p className="mt-6 text-sm font-medium">Buscando sinal do app...</p>
          </div>
        ) : null}
      </Screen>
      <BottomNav />
    </>
  );
}
