import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Criteria = {
  minPerKm: number;
  minPerHour: number;
  minRating: number;
  minProfit: number;
  maxPickupMin: number;
};

export type ProfileName = "conservador" | "equilibrado" | "agressivo" | "personalizado";

export const PRESETS: Record<Exclude<ProfileName, "personalizado">, Criteria> = {
  agressivo: { minPerKm: 2.6, minPerHour: 45, minRating: 4.8, minProfit: 18, maxPickupMin: 5 },
  equilibrado: { minPerKm: 2.0, minPerHour: 35, minRating: 4.6, minProfit: 12, maxPickupMin: 8 },
  conservador: { minPerKm: 1.5, minPerHour: 26, minRating: 4.2, minProfit: 7, maxPickupMin: 12 },
};

export type Settings = {
  voice: boolean;
  push: boolean;
  autoAccept: boolean;
  autoAcceptUber: boolean;
  autoAccept99: boolean;
  cardMode: "clean" | "completo";
  overlayPosition: "topo" | "centro" | "base";
  showFuel: boolean;
  showRating: boolean;
  showPerHour: boolean;
  fuelPrice: number;
  consumption: number;
  dailyGoal: number;
  mode: "uber" | "kart";
  dynamicLock: boolean;
  dynamicLockRadius: number; // km
  targetDynamicRegion: string;
};

export type RideHistoryItem = {
  id: string;
  ride: Ride;
  verdict: Verdict;
  status: "finished" | "rejected";
  timestamp: number;
};

type Store = {
  loggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
  subscribed: boolean;
  setSubscribed: (v: boolean) => void;
  criteria: Criteria;
  setCriteria: (c: Criteria) => void;
  profile: ProfileName;
  setProfile: (p: ProfileName) => void;
  settings: Settings;
  setSettings: (s: Settings) => void;
  history: RideHistoryItem[];
  addToHistory: (ride: Ride, verdict: Verdict, status: "finished" | "rejected") => void;
};

const DEFAULT_SETTINGS: Settings = {
  voice: true,
  push: true,
  autoAccept: false,
  autoAcceptUber: true,
  autoAccept99: true,
  cardMode: "completo",
  overlayPosition: "centro",
  showFuel: true,
  showRating: true,
  showPerHour: true,
  fuelPrice: 6.09,
  consumption: 12,
  dailyGoal: 260,
  mode: "uber",
  dynamicLock: false,
  dynamicLockRadius: 2.5,
  targetDynamicRegion: "Centro Comercial",
};

const Ctx = createContext<Store | null>(null);

function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [key]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, hydrated]);
  return [value, setValue] as const;
}

export function LucroProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = usePersisted("lr.logged", false);
  const [subscribed, setSubscribed] = usePersisted("lr.sub", false);
  const [criteria, setCriteria] = usePersisted<Criteria>("lr.criteria", PRESETS.equilibrado);
  const [profile, setProfile] = usePersisted<ProfileName>("lr.profile", "equilibrado");
  const [settings, setSettings] = usePersisted<Settings>("lr.settings", DEFAULT_SETTINGS);
  const [history, setHistory] = usePersisted<RideHistoryItem[]>("lr.history", []);

  const addToHistory = (ride: Ride, verdict: Verdict, status: "finished" | "rejected") => {
    const newItem: RideHistoryItem = {
      id: Math.random().toString(36).substring(7),
      ride,
      verdict,
      status,
      timestamp: Date.now(),
    };
    setHistory((prev) => [newItem, ...prev]);
  };

  const value = useMemo(
    () => ({
      loggedIn,
      setLoggedIn,
      subscribed,
      setSubscribed,
      criteria,
      setCriteria,
      profile,
      setProfile,
      settings,
      setSettings,
      history,
      addToHistory,
    }),
    [
      loggedIn,
      subscribed,
      criteria,
      profile,
      settings,
      history,
      setLoggedIn,
      setSubscribed,
      setCriteria,
      setProfile,
      setSettings,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLucro() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLucro deve ser usado dentro de LucroProvider");
  return ctx;
}

export type Ride = {
  app: "Uber" | "99" | "inDrive";
  fare: number;
  rating: number;
  distanceKm: number;
  pickupKm: number;
  pickupMin: number;
  tripMin: number;
  passenger: string;
  destino: string;
};

export type Verdict = {
  light: "go" | "warn" | "stop";
  score: number;
  perKm: number;
  perHour: number;
  fuelCost: number;
  netProfit: number;
  totalMin: number;
  totalKm: number;
  reasons: string[];
};

export function evaluateRide(ride: Ride, c: Criteria, s: Settings): Verdict {
  const totalKm = ride.distanceKm + ride.pickupKm;
  const totalMin = ride.tripMin + ride.pickupMin;
  const fuelCost = (totalKm / s.consumption) * s.fuelPrice;
  const wear = totalKm * 0.28;
  const netProfit = ride.fare - fuelCost - wear;
  const perKm = ride.fare / totalKm;
  const perHour = (netProfit / totalMin) * 60;

  const checks = [
    { ok: perKm >= c.minPerKm, w: 26, msg: `R$/km abaixo de ${c.minPerKm.toFixed(2)}` },
    { ok: perHour >= c.minPerHour, w: 28, msg: `R$/hora abaixo de ${c.minPerHour.toFixed(0)}` },
    { ok: netProfit >= c.minProfit, w: 26, msg: `Lucro abaixo de R$ ${c.minProfit.toFixed(0)}` },
    { ok: ride.rating >= c.minRating, w: 10, msg: `Nota ${ride.rating.toFixed(1)} baixa` },
    { ok: ride.pickupMin <= c.maxPickupMin, w: 10, msg: `${ride.pickupMin} min até o passageiro` },
  ];

  const score = checks.reduce((acc, ch) => acc + (ch.ok ? ch.w : 0), 0);
  const reasons = checks.filter((ch) => !ch.ok).map((ch) => ch.msg);
  const light = score >= 85 ? "go" : score >= 55 ? "warn" : "stop";

  return { light, score, perKm, perHour, fuelCost, netProfit, totalMin, totalKm, reasons };
}

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });
