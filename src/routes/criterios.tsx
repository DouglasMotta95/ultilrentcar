import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { BottomNav, Screen } from "@/components/app-shell";
import { Slider } from "@/components/ui/slider";
import { PRESETS, useLucro, type Criteria, type ProfileName } from "@/lib/lucro-store";

export const Route = createFileRoute("/criterios")({
  head: () => ({
    meta: [
      { title: "Critérios da corrida — LucroReal" },
      {
        name: "description",
        content:
          "Defina R$/km, R$/hora, nota mínima, lucro líquido e tempo até o passageiro para o semáforo ficar verde.",
      },
      { property: "og:title", content: "Critérios da corrida — LucroReal" },
      {
        property: "og:description",
        content: "Perfis Conservador, Equilibrado e Agressivo — ou crie o seu.",
      },
    ],
  }),
  component: Criterios,
});

const FIELDS: {
  key: keyof Criteria;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}[] = [
  { key: "minPerKm", label: "Mínimo por km", hint: "Verde a partir deste valor", min: 0.8, max: 5, step: 0.1, prefix: "R$ " },
  { key: "minPerHour", label: "Mínimo por hora", hint: "Lucro líquido por hora rodada", min: 10, max: 90, step: 1, prefix: "R$ " },
  { key: "minRating", label: "Nota mínima", hint: "Avaliação do passageiro", min: 3.5, max: 5, step: 0.1 },
  { key: "minProfit", label: "Lucro líquido mínimo", hint: "Depois de combustível e desgaste", min: 3, max: 60, step: 1, prefix: "R$ " },
  { key: "maxPickupMin", label: "Tempo máx. até o passageiro", hint: "Deslocamento sem ganho", min: 2, max: 25, step: 1, suffix: " min" },
];

function Criterios() {
  const { criteria, setCriteria, profile, setProfile } = useLucro();

  const update = (key: keyof Criteria, value: number) => {
    setCriteria({ ...criteria, [key]: value });
    setProfile("personalizado");
  };

  const aplicarPerfil = (p: keyof typeof PRESETS) => {
    setCriteria(PRESETS[p]);
    setProfile(p as ProfileName);
    toast.success(`Perfil ${p} aplicado`);
  };

  return (
    <>
      <Screen title="Critérios" subtitle="O que faz o semáforo ficar verde para você.">
        <div className="mb-5 grid grid-cols-3 gap-2">
          {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((p) => (
            <button
              key={p}
              onClick={() => aplicarPerfil(p)}
              className={`rounded-2xl border py-3 text-xs font-bold capitalize transition-all duration-300 ${
                profile === p ? "border-primary/60 bg-primary/10 text-primary" : "border-border bg-card/60 text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <p className="mb-4 text-center text-[11px] text-muted-foreground">
          {profile === 'agressivo' && "Perfil Agressivo: Alta seletividade para ganhos máximos (km mais caro)."}
          {profile === 'equilibrado' && "Perfil Equilibrado: O melhor balanço entre ganhos e tempo."}
          {profile === 'conservador' && "Perfil Conservador: Aceita mais corridas (km mais barato) para não ficar parado."}
          {profile === 'personalizado' && "Perfil Personalizado: Suas próprias regras de lucro."}
        </p>

        <div className="space-y-3">
          {FIELDS.map((f) => (
            <div key={f.key} className="glass-card rounded-3xl p-4">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{f.label}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{f.hint}</p>
                </div>
                <input
                  type="number"
                  step={f.step}
                  value={criteria[f.key]}
                  onChange={(e) => update(f.key, Number(e.target.value))}
                  className="w-24 shrink-0 rounded-xl bg-elevated px-3 py-2 text-right text-sm font-bold tabular-nums outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Slider
                className="mt-4"
                value={[criteria[f.key]]}
                min={f.min}
                max={f.max}
                step={f.step}
                onValueChange={([v]) => update(f.key, v ?? f.min)}
              />
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground tabular-nums">
                <span>{f.prefix}{f.min}{f.suffix}</span>
                <span>{f.prefix}{f.max}{f.suffix}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setProfile("personalizado");
            toast.success("Perfil personalizado salvo");
          }}
          className="mt-5 w-full rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground transition-transform duration-200 active:scale-[0.98]"
        >
          Salvar perfil personalizado
        </button>
      </Screen>
      <BottomNav />
    </>
  );
}
