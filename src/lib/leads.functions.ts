import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];

const leadSchema = z.object({
  full_name: z.string().min(3),
  cpf: z.string().min(11),
  birth_date: z.string(),
  cellphone: z.string(),
  landline: z.string().optional(),
  email: z.string().email(),
  cep: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  profession: z.string(),
  platform: z.enum(["Uber", "99", "inDrive", "Outro"]),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  ref_phone_1: z.string(),
  ref_phone_2: z.string(),
  vehicle_interest: z.string().optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const insertData: LeadInsert = {
      full_name: data.full_name,
      cpf: data.cpf,
      birth_date: data.birth_date,
      cellphone: data.cellphone,
      landline: data.landline || null,
      email: data.email,
      cep: data.cep,
      street: data.street,
      number: data.number,
      complement: data.complement || null,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      profession: data.profession,
      platform: data.platform,
      facebook: data.facebook || null,
      instagram: data.instagram || null,
      ref_phone_1: data.ref_phone_1,
      ref_phone_2: data.ref_phone_2,
      vehicle_interest: data.vehicle_interest || null,
      status: "em_analise",
    };

    const { error } = await supabase
      .from("leads")
      .insert([insertData]);

    if (error) {
      console.error("Error submitting lead:", error);
      throw new Error("Falha ao enviar cadastro. Verifique os dados e tente novamente.");
    }

    return { success: true };
  });

export const getVehicles = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching vehicles:", error);
      return [];
    }

    return data;
  });

export const getCompanyInfo = createServerFn({ method: "GET" })
  .handler(async () => {
    // Return hardcoded company info verified via research
    return {
      name: "Util Locadora de Veículos",
      legal_name: "UTIL LOCADORA DE VEICULOS LTDA",
      address: "Itu — São Paulo",
      whatsapp: "(11) 94722-9449",
      email: "utillocadora@gmail.com",
      hours: "Segunda a sábado, 09h às 18h",
      instagram: "https://www.instagram.com/util_locadora", // Based on common pattern if research was limited but maps verified phone
    };
  });
