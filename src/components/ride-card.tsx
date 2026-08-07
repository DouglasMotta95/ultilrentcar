import { useEffect, useRef, useState } from "react";
import {
  Volume2,
  VolumeX,
  Fuel,
  Clock,
  Route as RouteIcon,
  Star,
  GripHorizontal,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { brl, evaluateRide, type Criteria, type Ride, type Settings } from "@/lib/lucro-store";
import { cn } from "@/lib/utils";

const LIGHT = {
  go: {
    label: "ACEITAR",
    text: "text-go",
    bg: "bg-go-soft",
    dot: "bg-go",
    ring: "ring-go/40",
    bar: "bg-go",
  },
  warn: {
    label: "AVALIAR",
    text: "text-warn",
    bg: "bg-warn-soft",
    dot: "bg-warn",
    ring: "ring-warn/40",
    bar: "bg-warn",
  },
  stop: {
    label: "RECUSAR",
    text: "text-stop",
    bg: "bg-stop-soft",
    dot: "bg-stop",
    ring: "ring-stop/40",
    bar: "bg-stop",
  },
} as const;

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-elevated/70 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className="mt-1 text-sm font-bold tabular-nums">{value}</div>
    </div>
  );
}

export function RideCard({
  ride,
  criteria,
  settings,
  draggable = true,
  onToggleVoice,
}: {
  ride: Ride;
  criteria: Criteria;
  settings: Settings;
  draggable?: boolean;
  onToggleVoice?: () => void;
}) {
  const v = evaluateRide(ride, criteria, settings);
  const l = LIGHT[v.light];
  const clean = settings.cardMode === "clean";

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => setPos({ x: 0, y: 0 }), [settings.overlayPosition]);

  const start = (e: React.PointerEvent) => {
    if (!draggable) return;
    drag.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setDragging(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setPos({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y });
  };
  const end = () => {
    drag.current = null;
    setDragging(false);
  };

  return (
    <div
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      className={cn(
        "glass-card animate-rise select-none rounded-[28px] p-4 ring-1",
        l.ring,
        dragging ? "scale-[1.02] transition-none" : "transition-transform duration-300",
      )}
    >
      {draggable && (
        <div
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          className="mx-auto mb-2 flex w-16 cursor-grab touch-none justify-center py-1 active:cursor-grabbing"
        >
          <GripHorizontal className="size-4 text-muted-foreground" />
        </div>
      )}

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className={cn("animate-signal size-3 shrink-0 rounded-full", l.dot)} />
          <div className="min-w-0">
            <p className={cn("text-sm font-extrabold tracking-wide", l.text)}>
              {settings.autoAccept && v.light === "go" ? "AUTO-ACEITANDO" : l.label}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {ride.app} · {ride.destino}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              // Custom event to trigger AI drawer with context
              window.dispatchEvent(new CustomEvent('open-ai-chat', { 
                detail: { question: `Vale aceitar esta corrida para ${ride.destino}?` } 
              }));
            }}
            aria-label="Perguntar à IA sobre esta corrida"
            className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 hover:bg-primary/20 active:scale-90"
          >
            <Sparkles className="size-5" />
          </button>
          <button
            onClick={onToggleVoice}
            aria-label={settings.voice ? "Desligar voz" : "Ligar voz"}
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-2xl transition-colors duration-300",
              settings.voice ? "bg-primary text-primary-foreground" : "bg-elevated text-muted-foreground",
            )}
          >
            {settings.voice ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
          </button>
        </div>
      </div>

      <div className={cn("mt-4 rounded-3xl px-4 py-4", l.bg)}>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Lucro líquido estimado
        </p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <span className={cn("font-display text-[40px] font-extrabold leading-none tabular-nums", l.text)}>
            {brl(v.netProfit)}
          </span>
          <span className="pb-1 text-xs font-semibold text-muted-foreground tabular-nums">
            corrida {brl(ride.fare)}
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background/50">
          <div
            className={cn("h-full rounded-full transition-all duration-700", l.bar)}
            style={{ width: `${Math.max(6, v.score)}%` }}
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Metric icon={RouteIcon} label="R$ / km" value={v.perKm.toFixed(2)} />
        {settings.showPerHour && (
          <Metric icon={TrendingUp} label="R$ / hora" value={v.perHour.toFixed(0)} />
        )}
      </div>

      {!clean && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          <Metric icon={Clock} label="Tempo" value={`${v.totalMin} min`} />
          <Metric icon={RouteIcon} label="Distância" value={`${v.totalKm.toFixed(1)} km`} />
          {settings.showFuel && <Metric icon={Fuel} label="Combustível" value={brl(v.fuelCost)} />}
        </div>
      )}

      {settings.showRating && (
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5 text-warn" />
            Nota {ride.rating.toFixed(1)} · {ride.pickupMin} min até você
          </span>
          <span className="font-semibold tabular-nums">{v.score}/100</span>
        </div>
      )}

      {!clean && v.reasons.length > 0 && (
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          {v.reasons.join(" · ")}
        </p>
      )}
    </div>
  );
}
