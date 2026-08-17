import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

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
  .input(leadSchema)
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("leads")
      .insert([
        {
          ...data,
          status: "em_analise",
        },
      ]);

    if (error) {
      console.error("Error submitting lead:", error);
      throw new Error("Falha ao enviar cadastro. Verifique os dados e tente novamente.");
    }

    // In a real implementation, we would trigger an email notification here
    // using a server-side helper or a webhook.
    
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
