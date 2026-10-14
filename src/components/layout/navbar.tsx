import { useEffect, useState } from "react";
import { ArrowRight, Home, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "/#quem-somos", label: "Sobre" },
  { href: "/#frota", label: "Frota" },
  { href: "/#servicos", label: "Serviços" },
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

  const closeMenu = () => setOpen(false);

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-border/80 bg-white/95 py-1 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-white/90 py-2 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 sm:gap-6">
        <Link
          to="/"
          aria-label="UTIL Rent a Car — página inicial"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
        >
          <img
            src="/logo-util-rent.svg"
            alt="UTIL Rent a Car"
            className="h-[76px] w-[100px] object-contain object-left sm:h-[88px] sm:w-[116px] lg:h-[96px] lg:w-[128px]"
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <a
            href="/#inicio"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary"
          >
            <Home className="h-4 w-4" />
            Início
          </a>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/cadastro"
            className="group ml-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:brightness-95"
          >
            Quero alugar
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-white text-foreground lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-white shadow-xl lg:hidden">
          <div className="container mx-auto flex flex-col px-4 pb-5 pt-2">
            <a
              href="/#inicio"
              onClick={closeMenu}
              className="flex items-center gap-3 border-b border-border py-3.5 text-base font-semibold text-foreground"
            >
              <Home className="h-4 w-4 text-primary" />
              Início
            </a>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="border-b border-border py-3.5 text-base font-semibold text-foreground last:border-0"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/cadastro"
              onClick={closeMenu}
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
