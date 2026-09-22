import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type CompanyInfo = {
  id: number;
  name: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  hours: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  weekly_price_from: number | null;
  map_embed_url: string | null;
};

export const fallbackCompanyInfo: CompanyInfo = {
  id: 1,
  name: "UTIL LOCADORA",
  phone: "(11) 94722-9449",
  whatsapp: "5511947229449",
  email: "utillocadora@gmail.com",
  address: null,
  city: "Itu",
  state: "SP",
  hours: "Segunda a sábado, 09h às 18h",
  instagram_url: null,
  facebook_url: null,
  logo_url: null,
  hero_image_url: null,
  hero_title: "LOCAÇÃO DE CARROS PARA APLICATIVOS",
  hero_subtitle: "Polo Track, HB20 Hatch, HB20 Sedan e Onix Sedan para a rotina de quem trabalha com aplicativos.",
  weekly_price_from: null,
  map_embed_url: null,
};

export function useCompanyInfo() {
  const db = supabase as any;

  return useQuery<CompanyInfo>({
    queryKey: ["company-settings"],
    queryFn: async () => {
      const { data, error } = await db.from("company_settings").select("*").eq("id", 1).maybeSingle();
      if (error || !data) return fallbackCompanyInfo;
      return { ...fallbackCompanyInfo, ...data } as CompanyInfo;
    },
    initialData: fallbackCompanyInfo,
    staleTime: 5 * 60 * 1000,
  });
}

export function whatsappUrl(number?: string | null, text?: string) {
  const digits = (number || fallbackCompanyInfo.whatsapp || "").replace(/\D/g, "");
  const suffix = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${suffix}`;
}
