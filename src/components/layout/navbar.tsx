import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Car } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-2xl py-3 border-white/5" : "bg-transparent py-5 border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Car className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-foreground">
            UTIL <span className="text-primary">LOCADORA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Início
          </Link>
          <a href="#veiculos" className="text-sm font-medium hover:text-primary transition-colors">
            Veículos
          </a>
          <a href="#como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
            Como Funciona
          </a>
          <Link to="/cadastro" className="text-sm font-medium hover:text-primary transition-colors">
            Cadastro
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <a href="https://wa.me/5511947265882" target="_blank" rel="noopener noreferrer">
              <Phone className="w-4 h-4" />
              WhatsApp
            </a>
          </Button>
          <Button size="sm" asChild>
            <Link to="/cadastro">Quero Alugar</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-white/5 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-4 gap-4">
            <Link 
              to="/" 
              className="text-lg font-medium py-2 border-b border-white/5 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Início
            </Link>
            <a 
              href="#veiculos" 
              className="text-lg font-medium py-2 border-b border-white/5 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Veículos
            </a>
            <a 
              href="#como-funciona" 
              className="text-lg font-medium py-2 border-b border-white/5 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Como Funciona
            </a>
            <Link 
              to="/cadastro" 
              className="text-lg font-medium py-2 border-b border-white/5 text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cadastro
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button className="w-full justify-center gap-2" asChild>
                <a href="https://wa.me/5511947265882" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4" />
                  Falar com a Locadora
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
