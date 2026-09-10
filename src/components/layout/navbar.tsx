import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "#quem-somos", label: "Quem somos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#frota", label: "Nossa frota" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav aria-label="Navegação principal" className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 py-3 shadow-sm backdrop-blur-md" : "bg-background/80 py-4 backdrop-blur-sm"}`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" aria-label="Util Locadora - página inicial" className="flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-foreground/90 border-b-primary text-primary">
            <span className="font-display text-[0.7rem] font-extrabold tracking-tight">UTIL</span>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-extrabold tracking-tight text-foreground">UTIL LOCADORA</span>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Locadora de Veículos</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => <a key={l.href} href={l.href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">{l.label}</a>)}
          <Link to="/cadastro" className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-95">Quero alugar</Link>
        </div>

        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-border bg-background shadow-lg lg:hidden">
          <div className="flex flex-col p-4">
            {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-border py-3 text-base font-semibold text-foreground last:border-0">{l.label}</a>)}
            <Link to="/cadastro" onClick={() => setOpen(false)} className="mt-4 rounded-full bg-primary px-6 py-3 text-center font-bold text-primary-foreground">Quero alugar</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
