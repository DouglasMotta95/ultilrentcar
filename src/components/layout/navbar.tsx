import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "/#quem-somos", label: "Quem somos" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#frota", label: "Frota" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#contato", label: "Contato" },
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
    <nav
      aria-label="Navegação principal"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/80 bg-background/95 py-2.5 shadow-sm backdrop-blur-xl"
          : "bg-background/70 py-4 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-6 px-4">
        <Link
          to="/"
          aria-label="UTIL LOCADORA - página inicial"
          className="min-w-0 shrink-0"
        >
          <img
            src="/logo-util-rent.svg"
            alt="UTIL rent a car — Locadora de veículos"
            className="h-10 w-auto max-w-[235px] object-contain object-left sm:h-12 sm:max-w-[285px]"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/cadastro"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:brightness-95"
          >
            Quero alugar
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/80 text-foreground lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-background/98 shadow-xl backdrop-blur-xl lg:hidden">
          <div className="container mx-auto flex flex-col px-4 pb-5 pt-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-base font-semibold text-foreground last:border-0"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/cadastro"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground"
            >
              Quero alugar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
