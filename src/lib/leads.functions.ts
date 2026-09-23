import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];

function digits(value: string) {
  return value.replace(/\\D/g, "");
}

function isValidCpf(value: string) {
  const cpf = digits(value);
  if (cpf.length !== 11 || /^([0-9])\\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(cpf[i]) * (10 - i);
  let check = (sum * 10) % 11;
  if (check === 10) check = 0;
  if (check !== Number(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(cpf[i]) * (11 - i);
  check = (sum * 10) % 11;
  if (check === 10) check = 0;
  return check === Number(cpf[10]);
}

function isValidPhone(value: string) {
  const phone = digits(value);
  return phone.length === 10 || phone.length === 11;
}

function isValidCep(value: string) {
  return digits(value).length === 8;
}

const leadSchema = z.object({
  full_name: z.string().trim().min(3),
  cpf: z.string().refine(isValidCpf, "CPF inválido"),
  birth_date: z.string().min(10, "Data de nascimento inválida"),
  cellphone: z.string().refine(isValidPhone, "Celular inválido"),
  landline: z.string().optional(),
  email: z.string().trim().email(),
  cep: z.string().refine(isValidCep, "CEP inválido"),
  street: z.string().trim().min(3),
  number: z.string().trim().min(1),
  complement: z.string().optional(),
  neighborhood: z.string().trim().min(2),
  city: z.string().trim().min(2),
  state: z.string().trim().length(2).transform((value) => value.toUpperCase()),
  profession: z.string().trim().min(2),
  platform: z.enum(["Uber", "99", "inDrive", "Outro"]),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  ref_phone_1: z.string().refine(isValidPhone, "Telefone de referência inválido"),
  ref_phone_2: z.string().refine(isValidPhone, "Telefone de referência inválido"),
  vehicle_interest: z.string().optional(),
  privacy_consent: z.literal(true),
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
      privacy_consent_at: new Date().toISOString(),
      privacy_policy_version: "2026-09",
    };

    const { error } = await supabase.from("leads").insert([insertData]);

    if (error) {
      console.error("Error submitting lead:", error);
      throw new Error("Falha ao enviar cadastro. Verifique os dados e tente novamente.");
    }

    return { success: true };
  });

const publishedFleet = [
  {
    key: "polo",
    brand: "Volkswagen",
    model: "Polo Track",
    body_type: "Hatch",
    gallery_images: [
      "https://assets.volkswagen.com/is/image/volkswagenag/Polo-Track-IPI-ZERO?Zm10PXBuZy1hbHBoYSZ3aWQ9MjQwMCZiZmM9b2ZmJjBhZmM=%3D",
    ],
    match: (value: string) => value.includes("polo"),
  },
  {
    key: "hb20-hatch",
    brand: "Hyundai",
    model: "HB20 Hatch",
    body_type: "Hatch",
    gallery_images: [
      "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/veiculo/360/externo/hb20_cinza_shadow_01.webp",
      "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_lateral.webp",
      "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_traseira.webp",
      "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_grade.webp",
      "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/internas/interna_paineldigital.webp",
    ],
    match: (value: string) =>
      value.includes("hb20") && !value.includes("hb20s") && !value.includes("sedan"),
  },
  {
    key: "hb20-sedan",
    brand: "Hyundai",
    model: "HB20 Sedan (HB20S)",
    body_type: "Sedã",
    gallery_images: [
      "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/veiculo/360/externo_v2/hb20s_cinza_shadow_01.webp",
      "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_lateral.webp",
      "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_traseira.webp",
      "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_grade.webp",
      "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/internas/thumb/interna_paineldigital_330x330.webp",
    ],
    match: (value: string) =>
      value.includes("hb20s") || (value.includes("hb20") && value.includes("sedan")),
  },
  {
    key: "onix",
    brand: "Chevrolet",
    model: "Onix Sedan (Onix Plus)",
    body_type: "Sedã",
    gallery_images: [
      "https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/mh/mh-desk.jpeg?imwidth=2400",
      "https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/accesories/accesories-main/acessorios-todas-as-categorias-onix-plus-1.jpg?imwidth=2400",
      "https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/accesories/accesories-main/acessorios-todas-as-categorias-onix-plus.jpg?imwidth=2400",
      "https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/accesories/accesories-main/acessorios-todas-as-categorias-onix-plus-2.jpg?imwidth=2400",
      "https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh/design/1/design-interior.jpg?imwidth=2400",
    ],
    match: (value: string) => value.includes("onix"),
  },
] as const;

function normalizeVehicleName(vehicle: any) {
  return `${vehicle?.brand ?? ""} ${vehicle?.model ?? ""}`.toLocaleLowerCase("pt-BR");
}

export const getVehicles = createServerFn({ method: "GET" }).handler(async () => {
  const db = supabase as any;

  // Não filtramos mais por ano aqui. O banco publicado ainda pode conter os
  // registros antigos (2022/2023), e esse filtro era justamente o motivo de a
  // home exibir "Nenhum veículo disponível".
  const { data, error } = await db
    .from("vehicles")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  const rows = !error && Array.isArray(data) ? data : [];

  if (error) {
    console.error("Error fetching vehicles:", error);
  }

  const assigned = new Map<string, any>();
  const usedIds = new Set<string>();

  // Primeiro preserva os valores de registros cujo modelo já combina.
  for (const target of publishedFleet) {
    const source = rows.find(
      (vehicle: any) =>
        !usedIds.has(String(vehicle.id)) &&
        target.match(normalizeVehicleName(vehicle)),
    );

    if (source) {
      assigned.set(target.key, source);
      usedIds.add(String(source.id));
    }
  }

  // Depois reaproveita os demais registros apenas para preservar os preços
  // existentes, sem deixar a frota pública desaparecer.
  for (const target of publishedFleet) {
    if (assigned.has(target.key)) continue;

    const source = rows.find((vehicle: any) => !usedIds.has(String(vehicle.id)));
    if (source) {
      assigned.set(target.key, source);
      usedIds.add(String(source.id));
    }
  }

  return publishedFleet.map((target, index) => {
    const source = assigned.get(target.key);

    const sourceMatchesModel = source ? target.match(normalizeVehicleName(source)) : false;
    const managedGallery =
      sourceMatchesModel && Array.isArray(source?.gallery_images)
        ? source.gallery_images.filter(Boolean)
        : [];
    const gallery = managedGallery.length > 0 ? managedGallery : [...target.gallery_images];

    return {
      id: source?.id ?? `published-${target.key}`,
      brand: target.brand,
      model: target.model,
      year: source?.year && Number(source.year) >= 2025 ? Number(source.year) : 2025,
      plate: source?.plate ?? null,
      color: source?.color ?? null,
      price_per_week: Number(source?.price_per_week ?? 0),
      features: [],
      image_url: gallery[0] ?? null,
      gallery_images: gallery,
      is_active: true,
      created_at: source?.created_at ?? null,
      transmission: null,
      body_type: target.body_type,
      app_category: null,
      description: `${target.brand} ${target.model}. Consulte disponibilidade e condições da locação.`,
      sort_order: index + 1,
    };
  });
});
