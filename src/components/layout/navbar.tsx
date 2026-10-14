import { useEffect, useState } from "react";
import { ArrowRight, Car, Home, Info, Menu, Phone, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/util-logo-original.jpg.asset.json";

const links = [
  { href: "/#quem-somos", label: "Sobre", icon: Info },
  { href: "/#frota", label: "Frota", icon: Car },
  { href: "/#servicos", label: "Serviços", icon: Car },
  { href: "/#contato", label: "Contato", icon: Phone },
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
    <nav aria-label="Navegação principal" className={`fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur-xl transition-all ${isScrolled ? "border-border py-2 shadow-sm" : "border-border/60 py-3"}`}>
      <div className="container mx-auto flex items-center justify-between gap-6">
        <Link to="/" aria-label="UTIL Rent a Car — página inicial" onClick={closeMenu} className="shrink-0">
          <img src={logo.url} alt="UTIL Rent a Car" width={1048} height={730} className="h-[64px] w-[110px] object-contain sm:h-[76px] sm:w-[132px]" />
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          <Button asChild className="h-11 rounded-full bg-ink px-5 text-ink-foreground hover:bg-primary"><a href="/#inicio"><Home /> Início</a></Button>
          {links.map(({ href, label, icon: Icon }) => <Button key={href} asChild variant="ghost" className="h-11 rounded-full px-4 text-muted-foreground"><a href={href}><Icon />{label}</a></Button>)}
          <Button asChild className="ml-3 h-11 rounded-full px-5 font-bold"><Link to="/cadastro">Quero alugar <ArrowRight /></Link></Button>
        </div>
        <Button variant="outline" size="icon" className="h-11 w-11 rounded-full lg:hidden" onClick={() => setOpen(value => !value)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && <div className="absolute inset-x-0 top-full border-b border-border bg-background shadow-xl lg:hidden"><div className="container mx-auto flex flex-col pb-5 pt-2">
        <a href="/#inicio" onClick={closeMenu} className="flex items-center gap-3 border-b border-border py-3.5 font-semibold"><Home className="h-4 w-4 text-primary" />Início</a>
        {links.map(({ href, label, icon: Icon }) => <a key={href} href={href} onClick={closeMenu} className="flex items-center gap-3 border-b border-border py-3.5 font-semibold"><Icon className="h-4 w-4 text-primary" />{label}</a>)}
        <Button asChild className="mt-4 h-12 rounded-full"><Link to="/cadastro" onClick={closeMenu}>Quero alugar <ArrowRight /></Link></Button>
      </div></div>}
    </nav>
  );
}
