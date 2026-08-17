import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Car, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">
                UTIL <span className="text-primary">LOCADORA</span>
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed">
              A parceira ideal para o motorista de aplicativo. Veículos revisados, seguro completo e a melhor quilometragem do mercado.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-white/60 hover:text-white transition-colors">Início</Link></li>
              <li><a href="#veiculos" className="text-white/60 hover:text-white transition-colors">Nossa Frota</a></li>
              <li><a href="#condicoes" className="text-white/60 hover:text-white transition-colors">Condições</a></li>
              <li><a href="#como-funciona" className="text-white/60 hover:text-white transition-colors">Como Funciona</a></li>
              <li><Link to="/cadastro" className="text-white/60 hover:text-white transition-colors">Fazer Cadastro</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/60">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(00) 00000-0000</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>utillocadora@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Endereço da Locadora, Cidade - UF</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Comece Agora</h4>
            <p className="text-white/60 mb-6">Não perca tempo e comece a rodar com a melhor estrutura.</p>
            <Button className="w-full" asChild>
              <Link to="/cadastro">QUERO ALUGAR</Link>
            </Button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-white/40 text-sm">
          <p>© 2026 Util Locadora. Todos os direitos reservados. CNPJ: 14.502.812/0001-26</p>
        </div>
      </div>
    </footer>
  );
}
