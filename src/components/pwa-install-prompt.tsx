import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Mostrar após 5 segundos se for PWA instalável
      setTimeout(() => setShow(true), 5000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-28 left-4 right-4 z-50 animate-rise">
      <div className="glass-card flex items-center justify-between gap-4 rounded-3xl p-4 ring-2 ring-primary/20">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Download className="size-5" />
          </div>
          <div>
            <p className="text-sm font-bold">Instalar LucroReal</p>
            <p className="text-[10px] text-muted-foreground">Adicione à tela de início para acesso rápido</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={install}
            className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground active:scale-95"
          >
            Instalar
          </button>
          <button 
            onClick={() => setShow(false)}
            className="p-2 text-muted-foreground active:scale-90"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
