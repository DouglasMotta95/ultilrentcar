import { Link } from "@tanstack/react-router";
import { Gauge, SlidersHorizontal, BarChart3, Settings2, History } from "lucide-react";

const items = [
  { to: "/corrida", label: "Corrida", icon: Gauge },
  { to: "/resumo", label: "Resumo", icon: BarChart3 },
  { to: "/historico", label: "Histórico", icon: History },
  { to: "/ajustes", label: "Ajustes", icon: Settings2 },
] as const;

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <div className="glass-card flex items-center justify-between gap-1 rounded-3xl px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold text-muted-foreground transition-all duration-300 data-[status=active]:bg-elevated data-[status=active]:text-primary"
            activeProps={{ className: "tab-glow" }}
          >
            <Icon className="size-5 transition-transform duration-300 group-active:scale-90" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Screen({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md px-5 pb-32 pt-[calc(1rem+env(safe-area-inset-top))]">
      {title && (
        <header className="animate-rise mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </header>
      )}
      {children}
    </div>
  );
}
