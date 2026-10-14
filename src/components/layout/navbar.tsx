import { useEffect, useState } from "react";
import { ArrowRight, Home, Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/util-logo-original.jpg.asset.json";

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
    const onHashChange = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <nav aria-label="Navegação principal" className="fixed inset-x-3 top-3 z-50">
      <div
        className={
          "mx-auto max-w-[1320px] overflow-visible rounded-2xl border bg-background/95 shadow-sm backdrop-blur-xl transition-colors " +
          (isScrolled ? "border-border shadow-md" : "border-border/70")
        }
      >
        <div className="flex min-h-[78px] items-center justify-between gap-3 px-3 sm:gap-5 sm:px-5 lg:px-6">
          <Link to="/" aria-label="UTIL Rent a Car — página inicial" onClick={closeMenu} className="flex shrink-0 items-center">
            <img src={logo.url} alt="UTIL Rent a Car" width={1048} height={730} className="h-[66px] w-[106px] object-contain sm:h-[72px] sm:w-[118px] lg:h-[76px] lg:w-[124px]" />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <a href="/#inicio" className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-ink-foreground transition hover:bg-primary">
              <Home className="h-4 w-4" /> Início
            </a>
            {links.map((link) => (
              <a key={link.href} href={link.href} className="rounded-full px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground xl:px-4">
                {link.label}
              </a>
            ))}
            <Button asChild className="ml-1 h-10 rounded-full px-4 font-bold">
              <Link to="/cadastro">Quero alugar <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>

          <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 rounded-full lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {open && (
          <div className="border-t border-border bg-background px-3 pb-4 pt-2 lg:hidden">
            <div className="flex flex-col">
              <a href="/#inicio" onClick={closeMenu} className="flex items-center gap-3 rounded-xl px-3 py-3 font-semibold hover:bg-secondary"><Home className="h-4 w-4 text-primary" /> Início</a>
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={closeMenu} className="rounded-xl px-3 py-3 font-semibold hover:bg-secondary">
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-3 h-11 rounded-full font-bold">
                <Link to="/cadastro" onClick={closeMenu}>Quero alugar <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
