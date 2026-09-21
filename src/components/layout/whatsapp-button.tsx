import { MessageCircle } from "lucide-react";
import { useCompanyInfo, whatsappUrl } from "@/hooks/use-company-info";

export function WhatsappButton() {
  const { data: company } = useCompanyInfo();

  return (
    <a
      href={whatsappUrl(company.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a UTIL LOCADORA no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl transition hover:scale-105 hover:bg-emerald-600"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
