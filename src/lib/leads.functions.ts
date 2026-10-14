import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function isValidCpf(value: string) {
  const cpf = digits(value);
  if (cpf.length !== 11 || /^([0-9])\1{10}$/.test(cpf)) return false;
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

function leadInsertError(error: { code?: string; message?: string }) {
  const code = error.code || "";
  const message = error.message || "";

  if (code === "23505" && /cpf|leads.*key/i.test(message)) {
    return "Já existe um cadastro com este CPF. Não envie novamente; fale com a equipe pelo WhatsApp para conferir sua solicitação.";
  }
  if (/Limite temporário/i.test(message)) {
    return "Foram recebidas várias tentativas recentes com estes dados. Entre em contato com a equipe pelo WhatsApp para continuar.";
  }
  if (code === "42501" || /row-level security|permission denied/i.test(message)) {
    return "O sistema está sem permissão para concluir o cadastro. A equipe precisa ajustar a configuração do site.";
  }
  if (code === "23502" || code === "22P02" || code === "22007" || code === "23514") {
    return "Algum dado não foi aceito pelo sistema. Confira CPF, data de nascimento, telefones e estado e tente novamente.";
  }
  if (code === "23505") {
    return "Já existe uma solicitação com alguns desses dados. Fale com a equipe para confirmar se o cadastro anterior foi recebido.";
  }
  console.error("Falha ao gravar cadastro no banco:", { code, message });
  return "Não foi possível registrar seu cadastro agora. Tente novamente ou fale com a equipe pelo WhatsApp.";
}

async function sendLeadNotification(data: z.infer<typeof leadSchema>): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "UTIL Rent a Car <comercial@utilrentcar.com.br>";

  if (!apiKey) {
    console.error("[UTIL cadastro] E-mail não enviado: falta configurar a variável segura RESEND_API_KEY.");
    return false;
  }

  const details: Array<[string, string]> = [
    ["Nome completo", data.full_name],
    ["CPF", data.cpf],
    ["Data de nascimento", data.birth_date],
    ["Celular / WhatsApp", data.cellphone],
    ["E-mail do solicitante", data.email],
    ["CEP", data.cep],
    ["Rua", data.street],
    ["Número", data.number],
    ["Complemento", data.complement || "Não informado"],
    ["Bairro", data.neighborhood],
    ["Cidade", data.city],
    ["Estado", data.state],
    ["Profissão", data.profession],
    ["Plataforma principal", data.platform],
    ["Veículo de interesse", data.vehicle_interest || "Não selecionado"],
    ["Telefone de referência 1", data.ref_phone_1],
    ["Telefone de referência 2", data.ref_phone_2],
  ];
  const text = [
    "Nova solicitação de locação recebida pelo site da UTIL Rent a Car.",
    "",
    ...details.map(([label, value]) => `${label}: ${value}`),
    "",
    "Este aviso foi gerado automaticamente pelo formulário de cadastro.",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: ["comercial@utilrentcar.com.br"],
        reply_to: data.email,
        subject: `Novo cadastro de locação — ${data.full_name.slice(0, 100)}`,
        text,
      }),
    });

    if (!response.ok) {
      const providerMessage = await response.text().catch(() => "");
      console.error("[UTIL cadastro] Provedor recusou o e-mail:", response.status, providerMessage.slice(0, 500));
      return false;
    }
    return true;
  } catch (error) {
    console.error("[UTIL cadastro] Erro ao chamar provedor de e-mail:", error);
    return false;
  }
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const insertData: any = {
      full_name: data.full_name.trim(),
      cpf: data.cpf,
      birth_date: data.birth_date,
      cellphone: data.cellphone,
      landline: data.landline || null,
      email: data.email.trim(),
      cep: data.cep,
      street: data.street.trim(),
      number: data.number.trim(),
      complement: data.complement?.trim() || null,
      neighborhood: data.neighborhood.trim(),
      city: data.city.trim(),
      state: data.state.toUpperCase(),
      profession: data.profession.trim(),
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

    let result = await supabase.from("leads").insert([insertData]);

    // Compatibility when the production database has not yet received the privacy migration.
    if (
      result.error &&
      /privacy_consent_at|privacy_policy_version|schema cache|column.*does not exist/i.test(
        result.error.message || "",
      )
    ) {
      const { privacy_consent_at: _consentAt, privacy_policy_version: _policyVersion, ...legacyData } = insertData;
      result = await supabase.from("leads").insert([legacyData]);
    }

    if (result.error) {
      throw new Error(leadInsertError(result.error));
    }

    const emailSent = await sendLeadNotification(data);
    return { success: true as const, emailSent };
  });

const publishedFleet = [
  {
    key: "polo",
    brand: "Volkswagen",
    model: "Polo Track",
    body_type: "Hatch",
    gallery_images: [
      "https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36482.webp",
      "https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36481.webp",
      "https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36479.webp",
      "https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36478.webp",
      "https://cdn.dealerspace.ai/dealersites/vehicles/models/volkswagen/foto730_36480.webp",
    ],
    match: (value: string) => value.includes("polo"),
  },
  {
    key: "hb20-hatch",
    brand: "Hyundai",
    model: "HB20 Hatch",
    body_type: "Hatch",
    gallery_images: [
      "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_traseira.webp",
      "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_lateral.webp",
      "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/veiculo/360/externo/hb20_cinza_shadow_01.webp",
      "https://hyundai.com.br/content/dam/hmb/product-page/novo-hyndai-hb20/design/features/thumb/design_grade.webp",
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
      "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_traseira.webp",
      "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_lateral.webp",
      "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/veiculo/360/externo_v2/hb20s_cinza_shadow_01.webp",
      "https://www.hyundai.com.br/content/dam/hmb/product-page/novo-hyundai-hb20s/design/features/thumb/design_grade.webp",
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
      "https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-01.jpeg?imwidth=2400",
      "https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-02.jpeg?imwidth=2400",
      "https://www.chevrolet.com.br/content/dam/chevrolet/south-america/brazil/portuguese/index/visid/cars/onix-plus/refresh-v2/gallery/abierta/galeria-03.jpeg?imwidth=2400",
    ],
    match: (value: string) => value.includes("onix"),
  },
] as const;

function normalizeVehicleName(vehicle: any) {
  return `${vehicle?.brand ?? ""} ${vehicle?.model ?? ""}`.toLocaleLowerCase("pt-BR");
}

export type LeadFormData = z.infer<typeof leadSchema>;

export async function submitLeadDirect(data: LeadFormData) {
  const baseData: any = {
    full_name: data.full_name.trim(),
    cpf: data.cpf,
    birth_date: data.birth_date,
    cellphone: data.cellphone,
    landline: data.landline || null,
    email: data.email.trim(),
    cep: data.cep,
    street: data.street.trim(),
    number: data.number.trim(),
    complement: data.complement?.trim() || null,
    neighborhood: data.neighborhood.trim(),
    city: data.city.trim(),
    state: data.state.toUpperCase(),
    profession: data.profession.trim(),
    platform: data.platform,
    facebook: data.facebook?.trim() || null,
    instagram: data.instagram?.trim() || null,
    ref_phone_1: data.ref_phone_1,
    ref_phone_2: data.ref_phone_2,
    vehicle_interest: data.vehicle_interest || null,
    status: "em_analise",
  };

  let result = await supabase.from("leads").insert([
    {
      ...baseData,
      privacy_consent_at: new Date().toISOString(),
      privacy_policy_version: "2026-09",
    },
  ]);

  // Compatibilidade com banco que ainda não recebeu a migration de privacidade.
  if (
    result.error &&
    /privacy_consent_at|privacy_policy_version|schema cache|column.*does not exist/i.test(
      result.error.message || "",
    )
  ) {
    result = await supabase.from("leads").insert([baseData]);
  }

  if (result.error) {
    console.error("Erro ao enviar cadastro:", result.error);
    const message = /Limite temporário/i.test(result.error.message || "")
      ? "Limite temporário de cadastros atingido. Tente novamente mais tarde."
      : "Não foi possível enviar seu cadastro agora. Confira os dados e tente novamente.";
    throw new Error(message);
  }

  return { success: true };
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

  // Nunca reutilizamos um veículo de outro modelo para preencher uma vaga.
  // Quando o registro correto não existe, o alvo publicado usa apenas os dados
  // oficiais/fallback definidos acima.
  return publishedFleet.map((target, index) => {
    const source = assigned.get(target.key);

    const sourceMatchesModel = source ? target.match(normalizeVehicleName(source)) : false;
    // Exibimos somente fotos externas para não sugerir equipamentos internos
    // (como central multimídia) que podem variar conforme o veículo entregue.
    const isExteriorPhoto = (url: string) =>
      !/(interior|interna|interior|painel|dashboard|cockpit)/i.test(url);
    const managedGallery =
      sourceMatchesModel && Array.isArray(source?.gallery_images)
        ? source.gallery_images.filter((url: string) => Boolean(url) && isExteriorPhoto(url))
        : [];
    const gallery = managedGallery.length > 0 ? managedGallery : [...target.gallery_images];

    return {
      id: source?.id ?? `published-${target.key}`,
      brand: target.brand,
      model: target.model,
      year: Number(source?.year ?? 0),
      plate: source?.plate ?? null,
      color: source?.color ?? null,
      price_per_week: Number(source?.price_per_week ?? 0),
      features: Array.isArray(source?.features) ? source.features.filter(Boolean).slice(0, 6) : [],
      image_url: gallery[0] ?? null,
      gallery_images: gallery,
      is_active: true,
      created_at: source?.created_at ?? null,
      transmission: source?.transmission ?? null,
      body_type: target.body_type,
      app_category: source?.app_category ?? null,
      description: source?.description || `${target.brand} ${target.model}. Consulte disponibilidade e condições da locação.`,
      sort_order: index + 1,
    };
  });
});
