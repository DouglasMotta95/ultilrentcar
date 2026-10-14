import { useEffect, useState } from "react";
import { ArrowRight, Home } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/util-logo-original.jpg.asset.json";

const links = [
  { href: "/#quem-somos", label: "Sobre" },
  { href: "/#frota", label: "Frota" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#contato", label: "Contato" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="shrink-0 rounded-full px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:px-4 sm:text-sm"
    >
      {label}
    </a>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav aria-label="Navegação principal" className="fixed inset-x-0 top-0 z-50">
      <div
        className={
          "border-b bg-white/95 backdrop-blur-xl transition-shadow " +
          (isScrolled ? "border-border shadow-lg" : "border-border/70 shadow-sm")
        }
      >
        <div className="container mx-auto flex min-h-[88px] max-w-[1320px] items-center justify-between gap-3 px-3 sm:min-h-[98px] sm:px-5 lg:min-h-[112px] lg:px-8">
          <Link to="/" aria-label="UTIL Rent a Car — página inicial" className="flex shrink-0 items-center">
            <img
              src={logo.url}
              alt="UTIL Rent a Car"
              width={1476}
              height={1003}
              className="h-[72px] w-[108px] object-contain sm:h-[82px] sm:w-[122px] lg:h-[94px] lg:w-[138px]"
            />
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            <a
              href="/#inicio"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-bold text-ink-foreground transition hover:bg-primary"
            >
              <Home className="h-4 w-4" /> Início
            </a>
            {links.map((link) => <NavLink key={link.href} {...link} />)}
            <Button asChild className="ml-1 h-10 shrink-0 rounded-full px-4 font-bold">
              <Link to="/cadastro">Quero alugar <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>

          <Button asChild className="h-9 shrink-0 rounded-full px-3 text-xs font-bold sm:h-10 sm:px-4 sm:text-sm lg:hidden">
            <Link to="/cadastro">Quero alugar <ArrowRight className="ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4" /></Link>
          </Button>
        </div>

        <div className="border-t border-border/70 px-2 py-1.5 lg:hidden">
          <div className="flex items-center gap-0.5 overflow-x-auto">
            <NavLink href="/#inicio" label="Início" />
            {links.map((link) => <NavLink key={link.href} {...link} />)}
          </div>
        </div>
      </div>
    </nav>
  );
}
