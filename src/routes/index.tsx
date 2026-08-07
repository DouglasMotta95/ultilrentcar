import { createFileRoute, useNavigate } from "@tanstack/react-router";
// LucroReal: Premium Subscription & Profit Control App
// Now featuring Kart Racing Alert System for real-time race flags.

import { useState } from "react";
import { Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { useLucro } from "@/lib/lucro-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LucroReal — Aceite só corridas lucrativas" },
      {
        name: "description",
        content:
          "App para motoristas de Uber, 99 e inDrive: semáforo de corridas, lucro líquido real e critérios personalizados em 1 segundo.",
      },
      { property: "og:title", content: "LucroReal — Aceite só corridas lucrativas" },
      {
        property: "og:description",
        content: "Semáforo inteligente de corridas e controle do seu lucro líquido real.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const { setLoggedIn } = useLucro();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const entrar = (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoggedIn(true);
    navigate({ to: "/assinatura" });
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-12">
      <div className="animate-rise">
        <div className="grid size-14 place-items-center rounded-3xl bg-primary text-primary-foreground">
          <ShieldCheck className="size-7" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold leading-tight">
          Lucro<span className="text-primary">Real</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Decida em 1 segundo se a corrida vale a pena. Uber, 99 e inDrive.
        </p>
      </div>

      <div className="glass-card animate-rise mt-8 rounded-3xl p-2">
        <div className="grid grid-cols-2 gap-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-2xl py-2.5 text-sm font-semibold transition-all duration-300 ${
                mode === m ? "bg-elevated text-foreground" : "text-muted-foreground"
              }`}
            >
              {m === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        <form onSubmit={entrar} className="space-y-3 p-3 pt-4">
          <label className="flex items-center gap-3 rounded-2xl bg-elevated/70 px-4 py-3.5">
            <Mail className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
          <label className="flex items-center gap-3 rounded-2xl bg-elevated/70 px-4 py-3.5">
            <Lock className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground transition-transform duration-200 active:scale-[0.98]"
          >
            {mode === "login" ? "Entrar" : "Criar minha conta"}
            <ArrowRight className="size-4" />
          </button>

          <div className="flex items-center gap-3 py-1 text-[11px] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />o u
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={() => entrar()}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-elevated/50 py-3.5 text-sm font-semibold transition-transform duration-200 active:scale-[0.98]"
          >
            <GoogleMark />
            Continuar com Google
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
        Ao continuar você aceita os Termos de Uso e a Política de Privacidade.
      </p>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-4" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.6 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.9-2.1 5.4-4.5 7l7.1 5.5c4.2-3.9 6.6-9.6 6.6-16.9z" />
      <path fill="#FBBC05" d="M10.4 28.7a14.5 14.5 0 010-9.4l-7.8-6.1a24 24 0 000 21.6l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.1-5.5c-2 1.4-4.6 2.2-8.8 2.2-6.4 0-11.7-3.7-13.6-9.2l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}
