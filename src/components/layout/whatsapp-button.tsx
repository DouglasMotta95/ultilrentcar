import { MessageCircle } from "lucide-react";

export function WhatsappButton() {
  return (
    <a
      href="https://wa.me/5511947229449"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 font-bold text-white shadow-xl transition hover:brightness-95"
    >
      <MessageCircle className="h-5 w-5" />
      Fale conosco
    </a>
  );
}
