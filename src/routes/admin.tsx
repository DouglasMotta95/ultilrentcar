import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  Building2,
  Car,
  ImagePlus,
  LogOut,
  Plus,
  RefreshCcw,
  Save,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    title: "Painel Administrativo | UTIL LOCADORA",
    meta: [{ name: "robots", content: "noindex,nofollow" }],
  }),
});

type Tab = "frota" | "leads" | "site" | "seguranca";

type VehicleDraft = {
  id?: string;
  brand: string;
  model: string;
  year: number;
  transmission: string;
  body_type: string;
  app_category: string;
  price_per_week: string;
  features: string;
  description: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
};

const emptyVehicle: VehicleDraft = {
  brand: "",
  model: "",
  year: 2025,
  transmission: "Automático",
  body_type: "",
  app_category: "",
  price_per_week: "",
  features: "",
  description: "",
  image_url: "",
  is_active: true,
  sort_order: 0,
};

const statusLabels: Record<string, string> = {
  em_analise: "Em análise",
  documentacao_pendente: "Documentação pendente",
  aprovado: "Aprovado",
  reprovado: "Reprovado",
  finalizado: "Finalizado",
};

function AdminPage() {
  const db = supabase as any;
  const [authLoading, setAuthLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<Tab>("frota");
  const [busy, setBusy] = useState(false);

  const [loginEmail, setLoginEmail] = useState("utillocadora@gmail.com");
  const [loginPassword, setLoginPassword] = useState("");

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [vehicleDraft, setVehicleDraft] = useState<VehicleDraft>(emptyVehicle);
  const [leads, setLeads] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    void bootstrap();
  }, []);

  async function bootstrap() {
    setAuthLoading(true);
    try {
      const { data } = await db.auth.getSession();
      const user = data?.session?.user ?? null;
      setSessionUser(user);
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data: role, error } = await db
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error || !role) {
        setIsAdmin(false);
        return;
      }

      setIsAdmin(true);
      await loadAdminData();
    } finally {
      setAuthLoading(false);
    }
  }

  async function loadAdminData() {
    const [vehiclesResult, leadsResult, settingsResult] = await Promise.all([
      db.from("vehicles").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: true }),
      db
        .from("leads")
        .select("id,created_at,full_name,cellphone,email,platform,status,vehicle_interest,admin_notes")
        .order("created_at", { ascending: false }),
      db.from("company_settings").select("*").eq("id", 1).maybeSingle(),
    ]);

    if (vehiclesResult.error) toast.error("Erro ao carregar a frota.");
    if (leadsResult.error) toast.error("Erro ao carregar os cadastros.");
    if (settingsResult.error) toast.error("Erro ao carregar os dados da empresa.");

    setVehicles(vehiclesResult.data ?? []);
    setLeads(leadsResult.data ?? []);
    setSettings(settingsResult.data ?? null);
  }

  async function login(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      const { error } = await db.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });
      if (error) throw error;
      await bootstrap();
      toast.success("Acesso liberado.");
    } catch (error: any) {
      toast.error(error?.message || "Não foi possível entrar.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await db.auth.signOut();
    setSessionUser(null);
    setIsAdmin(false);
    setVehicles([]);
    setLeads([]);
    setSettings(null);
  }

  function editVehicle(vehicle: any) {
    setVehicleDraft({
      id: vehicle.id,
      brand: vehicle.brand ?? "",
      model: vehicle.model ?? "",
      year: vehicle.year ?? 2025,
      transmission: vehicle.transmission ?? "",
      body_type: vehicle.body_type ?? "",
      app_category: vehicle.app_category ?? "",
      price_per_week: vehicle.price_per_week == null ? "" : String(vehicle.price_per_week),
      features: Array.isArray(vehicle.features) ? vehicle.features.join(", ") : "",
      description: vehicle.description ?? "",
      image_url: vehicle.image_url ?? "",
      is_active: vehicle.is_active ?? true,
      sort_order: vehicle.sort_order ?? 0,
    });
  }

  async function saveVehicle(event: FormEvent) {
    event.preventDefault();
    if (!vehicleDraft.brand.trim() || !vehicleDraft.model.trim()) {
      toast.error("Informe marca e modelo.");
      return;
    }

    setBusy(true);
    try {
      const payload = {
        brand: vehicleDraft.brand.trim(),
        model: vehicleDraft.model.trim(),
        year: Number(vehicleDraft.year),
        transmission: vehicleDraft.transmission.trim() || null,
        body_type: vehicleDraft.body_type.trim() || null,
        app_category: vehicleDraft.app_category.trim() || null,
        price_per_week: vehicleDraft.price_per_week.trim()
          ? Number(vehicleDraft.price_per_week.replace(",", "."))
          : null,
        features: vehicleDraft.features
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        description: vehicleDraft.description.trim() || null,
        image_url: vehicleDraft.image_url.trim() || null,
        is_active: vehicleDraft.is_active,
        sort_order: Number(vehicleDraft.sort_order) || 0,
      };

      const result = vehicleDraft.id
        ? await db.from("vehicles").update(payload).eq("id", vehicleDraft.id).select("*").single()
        : await db.from("vehicles").insert(payload).select("*").single();

      if (result.error) throw result.error;

      toast.success(vehicleDraft.id ? "Veículo atualizado." : "Veículo adicionado.");
      setVehicleDraft(emptyVehicle);
      await loadAdminData();
    } catch (error: any) {
      toast.error(error?.message || "Não foi possível salvar o veículo.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteVehicle(id: string) {
    if (!window.confirm("Excluir este veículo da frota?")) return;
    setBusy(true);
    try {
      const { error } = await db.from("vehicles").delete().eq("id", id);
      if (error) throw error;
      if (vehicleDraft.id === id) setVehicleDraft(emptyVehicle);
      await loadAdminData();
      toast.success("Veículo excluído.");
    } catch (error: any) {
      toast.error(error?.message || "Não foi possível excluir.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadVehiclePhoto(file: File) {
    if (!vehicleDraft.id) {
      toast.error("Salve o veículo primeiro e depois envie a foto.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Selecione uma imagem.");
      return;
    }

    setBusy(true);
    try {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `vehicles/${vehicleDraft.id}/${Date.now()}.${extension}`;
      const { error: uploadError } = await db.storage.from("site-media").upload(path, file, {
        upsert: true,
        contentType: file.type,
      });
      if (uploadError) throw uploadError;

      const { data } = db.storage.from("site-media").getPublicUrl(path);
      const imageUrl = data.publicUrl;

      const { error: updateError } = await db
        .from("vehicles")
        .update({ image_url: imageUrl })
        .eq("id", vehicleDraft.id);
      if (updateError) throw updateError;

      setVehicleDraft((current) => ({ ...current, image_url: imageUrl }));
      await loadAdminData();
      toast.success("Foto atualizada.");
    } catch (error: any) {
      toast.error(error?.message || "Não foi possível enviar a foto.");
    } finally {
      setBusy(false);
    }
  }

  async function saveLead(lead: any) {
    setBusy(true);
    try {
      const { error } = await db
        .from("leads")
        .update({ status: lead.status, admin_notes: lead.admin_notes || null })
        .eq("id", lead.id);
      if (error) throw error;
      toast.success("Cadastro atualizado.");
      await loadAdminData();
    } catch (error: any) {
      toast.error(error?.message || "Não foi possível atualizar o cadastro.");
    } finally {
      setBusy(false);
    }
  }

  function patchLead(id: string, patch: Record<string, any>) {
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead)));
  }

  async function uploadSiteAsset(file: File, field: "logo_url" | "hero_image_url") {
    if (!file.type.startsWith("image/")) {
      toast.error("Selecione uma imagem.");
      return;
    }
    setBusy(true);
    try {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `site/${field}/${Date.now()}.${extension}`;
      const { error: uploadError } = await db.storage.from("site-media").upload(path, file, {
        upsert: true,
        contentType: file.type,
      });
      if (uploadError) throw uploadError;
      const { data } = db.storage.from("site-media").getPublicUrl(path);
      setSettings((current: any) => ({ ...current, [field]: data.publicUrl }));
      toast.success("Imagem enviada. Clique em Salvar alterações.");
    } catch (error: any) {
      toast.error(error?.message || "Não foi possível enviar a imagem.");
    } finally {
      setBusy(false);
    }
  }

  async function saveSettings(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      const payload = {
        ...settings,
        id: 1,
        weekly_price_from:
          settings?.weekly_price_from === "" || settings?.weekly_price_from == null
            ? null
            : Number(String(settings.weekly_price_from).replace(",", ".")),
      };
      const { error } = await db.from("company_settings").upsert(payload, { onConflict: "id" });
      if (error) throw error;
      toast.success("Dados do site atualizados.");
      await loadAdminData();
    } catch (error: any) {
      toast.error(error?.message || "Não foi possível salvar os dados do site.");
    } finally {
      setBusy(false);
    }
  }

  const activeVehicles = useMemo(() => vehicles.filter((vehicle) => vehicle.is_active).length, [vehicles]);

  if (authLoading) {
    return <CenteredMessage text="Verificando acesso administrativo..." />;
  }

  if (!sessionUser || !isAdmin) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
        <div className="mx-auto flex min-h-[75vh] max-w-md items-center">
          <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">UTIL LOCADORA</p>
                <h1 className="text-2xl font-extrabold">Painel administrativo</h1>
              </div>
            </div>

            {sessionUser && !isAdmin && (
              <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
                Este usuário está autenticado, mas não possui perfil de administrador.
                <button onClick={logout} className="mt-3 block font-bold underline">Sair desta conta</button>
              </div>
            )}

            {!sessionUser && (
              <form onSubmit={login} className="space-y-4">
                <Field label="E-mail">
                  <input className="admin-input" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                </Field>
                <Field label="Senha">
                  <input className="admin-input" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                </Field>
                <button disabled={busy} className="w-full rounded-2xl bg-cyan-400 px-5 py-3.5 font-extrabold text-slate-950 disabled:opacity-50">
                  Entrar
                </button>
              </form>
            )}
          </div>
        </div>
        <AdminStyles />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">UTIL LOCADORA</p>
            <h1 className="mt-1 text-2xl font-extrabold">Painel administrativo</h1>
            <p className="mt-1 text-sm text-slate-400">{sessionUser.email}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => void loadAdminData()} className="admin-dark-button"><RefreshCcw className="h-4 w-4" /> Atualizar</button>
            <button onClick={logout} className="admin-dark-button"><LogOut className="h-4 w-4" /> Sair</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <Metric label="Veículos ativos" value={String(activeVehicles)} />
          <Metric label="Cadastros recebidos" value={String(leads.length)} />
          <Metric label="Fotos gerenciáveis" value={String(vehicles.filter((v) => v.image_url).length)} />
        </div>

        <nav className="mb-6 flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm">
          <TabButton active={tab === "frota"} onClick={() => setTab("frota")} icon={Car} label="Frota" />
          <TabButton active={tab === "leads"} onClick={() => setTab("leads")} icon={Users} label="Cadastros" />
          <TabButton active={tab === "site"} onClick={() => setTab("site")} icon={Building2} label="Site e contatos" />
          <TabButton active={tab === "seguranca"} onClick={() => setTab("seguranca")} icon={ShieldCheck} label="Segurança" />
        </nav>

        {tab === "frota" && (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold">Frota cadastrada</h2>
                  <p className="text-sm text-slate-500">Clique em um carro para editar.</p>
                </div>
                <button onClick={() => setVehicleDraft(emptyVehicle)} className="admin-primary-button"><Plus className="h-4 w-4" /> Novo</button>
              </div>
              <div className="space-y-3">
                {vehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => editVehicle(vehicle)}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition ${vehicleDraft.id === vehicle.id ? "border-cyan-500 bg-cyan-50" : "border-slate-200 hover:border-slate-300"}`}
                  >
                    <div className="h-16 w-24 overflow-hidden rounded-xl bg-slate-100">
                      {vehicle.image_url ? <img src={vehicle.image_url} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-xs text-slate-400">Sem foto</div>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-extrabold">{vehicle.brand} {vehicle.model}</p>
                      <p className="text-sm text-slate-500">{vehicle.year} · {vehicle.transmission || "Câmbio não informado"}</p>
                      <p className={`mt-1 text-xs font-bold ${vehicle.is_active ? "text-emerald-600" : "text-slate-400"}`}>{vehicle.is_active ? "Visível no site" : "Oculto"}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={saveVehicle} className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold">{vehicleDraft.id ? "Editar veículo" : "Adicionar veículo"}</h2>
                  <p className="text-sm text-slate-500">Foto, preço, disponibilidade e informações ficam sob seu controle.</p>
                </div>
                {vehicleDraft.id && (
                  <button type="button" onClick={() => void deleteVehicle(vehicleDraft.id!)} className="rounded-xl p-2 text-red-600 hover:bg-red-50" title="Excluir veículo">
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Marca"><input className="admin-input" value={vehicleDraft.brand} onChange={(e) => setVehicleDraft({ ...vehicleDraft, brand: e.target.value })} /></Field>
                <Field label="Modelo"><input className="admin-input" value={vehicleDraft.model} onChange={(e) => setVehicleDraft({ ...vehicleDraft, model: e.target.value })} /></Field>
                <Field label="Ano"><input className="admin-input" type="number" min="2025" value={vehicleDraft.year} onChange={(e) => setVehicleDraft({ ...vehicleDraft, year: Number(e.target.value) })} /></Field>
                <Field label="Câmbio"><input className="admin-input" value={vehicleDraft.transmission} onChange={(e) => setVehicleDraft({ ...vehicleDraft, transmission: e.target.value })} /></Field>
                <Field label="Tipo"><input className="admin-input" placeholder="Sedã, SUV, Hatch..." value={vehicleDraft.body_type} onChange={(e) => setVehicleDraft({ ...vehicleDraft, body_type: e.target.value })} /></Field>
                <Field label="Categoria no app"><input className="admin-input" placeholder="Preencha somente se confirmado" value={vehicleDraft.app_category} onChange={(e) => setVehicleDraft({ ...vehicleDraft, app_category: e.target.value })} /></Field>
                <Field label="Preço semanal"><input className="admin-input" inputMode="decimal" placeholder="Deixe vazio se quiser consultar" value={vehicleDraft.price_per_week} onChange={(e) => setVehicleDraft({ ...vehicleDraft, price_per_week: e.target.value })} /></Field>
                <Field label="Ordem"><input className="admin-input" type="number" value={vehicleDraft.sort_order} onChange={(e) => setVehicleDraft({ ...vehicleDraft, sort_order: Number(e.target.value) })} /></Field>
              </div>

              <Field label="Destaques (separados por vírgula)">
                <input className="admin-input" value={vehicleDraft.features} onChange={(e) => setVehicleDraft({ ...vehicleDraft, features: e.target.value })} />
              </Field>
              <Field label="Descrição">
                <textarea className="admin-input min-h-24" value={vehicleDraft.description} onChange={(e) => setVehicleDraft({ ...vehicleDraft, description: e.target.value })} />
              </Field>

              <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-28 w-full overflow-hidden rounded-xl bg-slate-100 sm:w-44">
                    {vehicleDraft.image_url ? <img src={vehicleDraft.image_url} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-slate-400">Sem foto</div>}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Foto real do veículo</p>
                    <p className="mb-3 text-sm text-slate-500">JPG, PNG ou WebP. O painel salva no armazenamento do projeto.</p>
                    <label className="admin-secondary-button cursor-pointer">
                      <ImagePlus className="h-4 w-4" /> Trocar foto
                      <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => e.target.files?.[0] && void uploadVehiclePhoto(e.target.files[0])} />
                    </label>
                  </div>
                </div>
              </div>

              <label className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 font-semibold">
                <input type="checkbox" checked={vehicleDraft.is_active} onChange={(e) => setVehicleDraft({ ...vehicleDraft, is_active: e.target.checked })} className="h-5 w-5" />
                Mostrar este veículo no site
              </label>

              <button disabled={busy} className="admin-primary-button mt-5 w-full justify-center py-3.5"><Save className="h-4 w-4" /> Salvar veículo</button>
            </form>
          </section>
        )}

        {tab === "leads" && (
          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-extrabold">Cadastros recebidos</h2>
              <p className="text-sm text-slate-500">Somente administradores autenticados podem visualizar esta área.</p>
            </div>
            <div className="space-y-4">
              {leads.length === 0 && <p className="rounded-2xl bg-slate-50 p-5 text-slate-500">Nenhum cadastro recebido.</p>}
              {leads.map((lead) => (
                <div key={lead.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
                    <div>
                      <p className="font-extrabold">{lead.full_name}</p>
                      <p className="mt-1 text-sm text-slate-500">{lead.cellphone} · {lead.email} · {lead.platform}</p>
                      {lead.vehicle_interest && <p className="mt-2 text-sm"><strong>Interesse:</strong> {lead.vehicle_interest}</p>}
                    </div>
                    <select className="admin-input" value={lead.status || "em_analise"} onChange={(e) => patchLead(lead.id, { status: e.target.value })}>
                      {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </div>
                  <textarea
                    className="admin-input mt-3 min-h-20"
                    placeholder="Observações internas"
                    value={lead.admin_notes || ""}
                    onChange={(e) => patchLead(lead.id, { admin_notes: e.target.value })}
                  />
                  <button disabled={busy} onClick={() => void saveLead(lead)} className="admin-secondary-button mt-3"><Save className="h-4 w-4" /> Salvar status</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "site" && settings && (
          <form onSubmit={saveSettings} className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold">Site, marca e contatos</h2>
              <p className="text-sm text-slate-500">Esses dados alimentam as áreas públicas do site.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Nome da empresa"><input className="admin-input" value={settings.name || ""} onChange={(e) => setSettings({ ...settings, name: e.target.value })} /></Field>
              <Field label="WhatsApp (somente números)"><input className="admin-input" value={settings.whatsapp || ""} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} /></Field>
              <Field label="Telefone"><input className="admin-input" value={settings.phone || ""} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} /></Field>
              <Field label="E-mail"><input className="admin-input" type="email" value={settings.email || ""} onChange={(e) => setSettings({ ...settings, email: e.target.value })} /></Field>
              <Field label="Endereço"><input className="admin-input" value={settings.address || ""} onChange={(e) => setSettings({ ...settings, address: e.target.value })} /></Field>
              <Field label="Horário"><input className="admin-input" value={settings.hours || ""} onChange={(e) => setSettings({ ...settings, hours: e.target.value })} /></Field>
              <Field label="Instagram"><input className="admin-input" value={settings.instagram_url || ""} onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })} /></Field>
              <Field label="Facebook"><input className="admin-input" value={settings.facebook_url || ""} onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })} /></Field>
              <Field label="Preço inicial semanal"><input className="admin-input" placeholder="Deixe vazio para não exibir" value={settings.weekly_price_from ?? ""} onChange={(e) => setSettings({ ...settings, weekly_price_from: e.target.value })} /></Field>
              <Field label="Link de mapa/embed"><input className="admin-input" value={settings.map_embed_url || ""} onChange={(e) => setSettings({ ...settings, map_embed_url: e.target.value })} /></Field>
            </div>

            <Field label="Título principal"><input className="admin-input" value={settings.hero_title || ""} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} /></Field>
            <Field label="Texto principal"><textarea className="admin-input min-h-24" value={settings.hero_subtitle || ""} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} /></Field>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <AssetBox
                title="Logo"
                url={settings.logo_url}
                onFile={(file) => void uploadSiteAsset(file, "logo_url")}
              />
              <AssetBox
                title="Foto principal"
                url={settings.hero_image_url}
                onFile={(file) => void uploadSiteAsset(file, "hero_image_url")}
              />
            </div>

            <button disabled={busy} className="admin-primary-button mt-6 w-full justify-center py-3.5"><Save className="h-4 w-4" /> Salvar alterações do site</button>
          </form>
        )}

        {tab === "seguranca" && (
          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-extrabold">Segurança</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-emerald-50 p-5">
                <p className="font-extrabold text-emerald-900">Acesso protegido por Supabase Auth</p>
                <p className="mt-2 text-sm text-emerald-800">O painel valida a função <strong>admin</strong> antes de liberar dados ou alterações.</p>
              </div>
              <div className="rounded-2xl bg-cyan-50 p-5">
                <p className="font-extrabold text-cyan-950">Cadastros protegidos por RLS</p>
                <p className="mt-2 text-sm text-cyan-900">A leitura pública temporária dos leads foi removida. Visitantes só podem enviar um cadastro.</p>
              </div>
            </div>
          </section>
        )}
      </div>

      <AdminStyles />
    </main>
  );
}

function CenteredMessage({ text }: { text: string }) {
  return <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-center font-semibold text-slate-200">{text}</main>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="mt-4 block"><span className="mb-1.5 block text-sm font-bold text-slate-700">{label}</span>{children}</label>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-1 text-3xl font-extrabold">{value}</p></div>;
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
  return (
    <button onClick={onClick} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${active ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

function AssetBox({ title, url, onFile }: { title: string; url?: string | null; onFile: (file: File) => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-4">
      <p className="font-extrabold">{title}</p>
      <div className="mt-3 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
        {url ? <img src={url} alt={title} className="h-full w-full object-contain" /> : <span className="text-sm text-slate-400">Nenhuma imagem</span>}
      </div>
      <label className="admin-secondary-button mt-3 cursor-pointer">
        <ImagePlus className="h-4 w-4" /> Trocar imagem
        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      </label>
    </div>
  );
}


function AdminStyles() {
  return (
    <style>{`
      .admin-input { width: 100%; border-radius: 0.875rem; border: 1px solid rgb(203 213 225); background: white; padding: 0.75rem 0.875rem; font-size: 0.875rem; outline: none; color: rgb(15 23 42); }
      .admin-input:focus { border-color: rgb(6 182 212); box-shadow: 0 0 0 3px rgb(207 250 254); }
      .admin-primary-button { display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 0.875rem; background: rgb(8 145 178); padding: 0.7rem 1rem; color: white; font-size: 0.875rem; font-weight: 800; }
      .admin-primary-button:disabled { opacity: 0.5; }
      .admin-secondary-button { display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 0.875rem; border: 1px solid rgb(203 213 225); background: white; padding: 0.7rem 1rem; color: rgb(15 23 42); font-size: 0.875rem; font-weight: 800; }
      .admin-dark-button { display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 0.875rem; border: 1px solid rgb(51 65 85); padding: 0.7rem 1rem; color: white; font-size: 0.875rem; font-weight: 700; }
    `}</style>
  );
}
