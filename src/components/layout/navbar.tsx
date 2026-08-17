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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-3" : "bg-background/70 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-foreground/90 border-b-primary text-primary">
            <span className="font-display text-[0.7rem] font-extrabold tracking-tight">UTIL</span>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-extrabold tracking-tight text-foreground">
              UTIL RENT CAR
            </span>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Locadora de Veículos
            </span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 border-b border-border bg-background shadow-lg animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-base font-semibold text-foreground last:border-0"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/cadastro"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-primary px-6 py-3 text-center font-bold text-primary-foreground"
            >
              Solicitar orçamento
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
