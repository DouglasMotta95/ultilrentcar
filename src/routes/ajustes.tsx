import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BottomNav, Screen } from "@/components/app-shell";
import { Switch } from "@/components/ui/switch";
import { useLucro } from "@/lib/lucro-store";

export const Route = createFileRoute("/ajustes")({
  head: () => ({
    meta: [
      { title: "Ajustes — LucroReal" },
      {
        name: "description",
        content:
          "Configure voz, informações do card, posição do overlay, preço do combustível e meta diária.",
      },
      { property: "og:title", content: "Ajustes — LucroReal" },
      { property: "og:description", content: "Deixe o overlay do jeito que você dirige." },
    ],
  }),
  component: Ajustes,
});

function Row({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{title}</p>
        {desc && <p className="truncate text-[11px] text-muted-foreground">{desc}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Ajustes() {
  const { settings, setSettings, setLoggedIn } = useLucro();
  const navigate = useNavigate();
  const set = <K extends keyof typeof settings>(k: K, v: (typeof settings)[K]) =>
    setSettings({ ...settings, [k]: v });

  return (
    <>
      <Screen title="Ajustes" subtitle="Personalize o comportamento do overlay.">
        <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Geral
        </p>
        <section className="glass-card divide-y divide-border overflow-hidden rounded-3xl">
          <Row title="Modo do App" desc="Alterar entre Uber e Kart">
            <div className="flex gap-1 rounded-xl bg-elevated p-1">
              {(["uber", "kart"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => set("mode", m)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors duration-300 ${
                    settings.mode === m ? "bg-card text-primary" : "text-muted-foreground"
                  }`}
                >
                  {m === "uber" ? "Uber/99" : "Kart"}
                </button>
              ))}
            </div>
          </Row>
          <Row title="Aviso por voz" desc="Fala o status em tempo real">
            <Switch checked={settings.voice} onCheckedChange={(v) => set("voice", v)} />
          </Row>
          <Row title="Notificações Push" desc="Alertas na tela bloqueada">
            <Switch checked={settings.push} onCheckedChange={(v) => set("push", v)} />
          </Row>
        </section>

        {settings.mode === "uber" ? (
          <>
            <p className="mb-2 mt-6 px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Exibição (Uber)
            </p>
            <section className="glass-card divide-y divide-border overflow-hidden rounded-3xl">
              <Row title="Mostrar combustível" desc="Custo estimado no card">
                <Switch checked={settings.showFuel} onCheckedChange={(v) => set("showFuel", v)} />
              </Row>
              <Row title="Mostrar nota" desc="Avaliação do passageiro">
                <Switch checked={settings.showRating} onCheckedChange={(v) => set("showRating", v)} />
              </Row>
              <Row title="Mostrar R$/hora">
                <Switch checked={settings.showPerHour} onCheckedChange={(v) => set("showPerHour", v)} />
              </Row>
            </section>
          </>
        ) : (
          <>
            <p className="mb-2 mt-6 px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Alertas Kart
            </p>
            <section className="glass-card divide-y divide-border overflow-hidden rounded-3xl p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-go" />
                  <span className="text-sm font-medium">Bandeira Verde: Pista Livre</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-warn" />
                  <span className="text-sm font-medium">Bandeira Amarela: Atenção</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-stop" />
                  <span className="text-sm font-medium">Bandeira Vermelha: Perigo</span>
                </div>
              </div>
              <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
                Os alertas são otimizados para baixa conexão e dispositivos leves. Em caso de perda de sinal, o último status permanecerá visível com aviso de "Offline".
              </p>
            </section>
          </>
        )}

        <p className="mb-2 mt-6 px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Overlay
        </p>
        <section className="glass-card divide-y divide-border overflow-hidden rounded-3xl">
          <Row title="Modo do card">
            <div className="flex gap-1 rounded-xl bg-elevated p-1">
              {(["clean", "completo"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => set("cardMode", m)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors duration-300 ${
                    settings.cardMode === m ? "bg-card text-primary" : "text-muted-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </Row>
          <Row title="Posição preferida">
            <div className="flex gap-1 rounded-xl bg-elevated p-1">
              {(["topo", "centro", "base"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => set("overlayPosition", p)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold capitalize transition-colors duration-300 ${
                    settings.overlayPosition === p ? "bg-card text-primary" : "text-muted-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Row>
        </section>

        <p className="mb-2 mt-6 px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Custos e meta
        </p>
        <section className="glass-card divide-y divide-border overflow-hidden rounded-3xl">
          <Row title="Preço do combustível" desc="R$ por litro">
            <input
              type="number"
              step="0.01"
              value={settings.fuelPrice}
              onChange={(e) => set("fuelPrice", Number(e.target.value))}
              className="w-24 rounded-xl bg-elevated px-3 py-2 text-right text-sm font-bold tabular-nums outline-none"
            />
          </Row>
          <Row title="Consumo do carro" desc="km por litro">
            <input
              type="number"
              step="0.5"
              value={settings.consumption}
              onChange={(e) => set("consumption", Number(e.target.value))}
              className="w-24 rounded-xl bg-elevated px-3 py-2 text-right text-sm font-bold tabular-nums outline-none"
            />
          </Row>
          <Row title="Meta diária" desc="Lucro líquido alvo">
            <input
              type="number"
              step="10"
              value={settings.dailyGoal}
              onChange={(e) => set("dailyGoal", Number(e.target.value))}
              className="w-24 rounded-xl bg-elevated px-3 py-2 text-right text-sm font-bold tabular-nums outline-none"
            />
          </Row>
        </section>

        <button
          onClick={() => {
            setLoggedIn(false);
            navigate({ to: "/" });
          }}
          className="mt-6 w-full rounded-2xl border border-border py-3.5 text-sm font-semibold text-muted-foreground"
        >
          Sair da conta
        </button>
      </Screen>
      <BottomNav />
    </>
  );
}
