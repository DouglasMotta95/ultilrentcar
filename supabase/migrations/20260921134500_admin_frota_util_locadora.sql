-- Útil Locadora: painel administrativo, segurança e frota oficial
-- Corrige dados legados do projeto anterior e prepara gestão real via Supabase.

-- 1) Remover job legado do projeto antigo, se ainda existir.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM cron.job
    WHERE jobname = 'daily-billing-reminder'
  ) THEN
    PERFORM cron.unschedule('daily-billing-reminder');
  END IF;
EXCEPTION
  WHEN undefined_table THEN NULL;
END $$;

-- 2) Fechar leitura pública indevida dos cadastros.
DROP POLICY IF EXISTS "Anyone can view leads (temporary for testing)" ON public.leads;
REVOKE SELECT ON public.leads FROM anon;

DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
CREATE POLICY "Admins can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3) Evoluir cadastro da frota para edição completa pelo painel.
ALTER TABLE public.vehicles
  ALTER COLUMN price_per_week DROP NOT NULL;

ALTER TABLE public.vehicles
  ADD COLUMN IF NOT EXISTS transmission TEXT,
  ADD COLUMN IF NOT EXISTS body_type TEXT,
  ADD COLUMN IF NOT EXISTS app_category TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

DROP TRIGGER IF EXISTS set_vehicles_updated_at ON public.vehicles;
CREATE TRIGGER set_vehicles_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

DROP POLICY IF EXISTS "Admins can view all vehicles" ON public.vehicles;
CREATE POLICY "Admins can view all vehicles"
ON public.vehicles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert vehicles" ON public.vehicles;
CREATE POLICY "Admins can insert vehicles"
ON public.vehicles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update vehicles" ON public.vehicles;
CREATE POLICY "Admins can update vehicles"
ON public.vehicles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete vehicles" ON public.vehicles;
CREATE POLICY "Admins can delete vehicles"
ON public.vehicles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Oculta a carga antiga (HB20 2023 / Onix Plus 2022 / Argo 2023 e qualquer outro legado).
UPDATE public.vehicles SET is_active = false;

-- Frota informada para o projeto. Sem inventar preços ou fotos: ambos ficam para o painel.
INSERT INTO public.vehicles
  (brand, model, year, transmission, body_type, app_category, price_per_week, features, image_url, is_active, sort_order)
SELECT *
FROM (
  VALUES
    ('CAOA Chery', 'Arrizo 6 Pro', 2025, 'Automático', 'Sedã', NULL::TEXT, NULL::DECIMAL, ARRAY[]::TEXT[], NULL::TEXT, true, 1),
    ('Volkswagen', 'Nivus', 2025, 'Automático', 'SUV/Crossover', NULL::TEXT, NULL::DECIMAL, ARRAY[]::TEXT[], NULL::TEXT, true, 2),
    ('Chevrolet', 'Tracker', 2025, 'Automático', 'SUV', NULL::TEXT, NULL::DECIMAL, ARRAY[]::TEXT[], NULL::TEXT, true, 3),
    ('Chevrolet', 'Onix Plus', 2025, 'Automático', 'Sedã', NULL::TEXT, NULL::DECIMAL, ARRAY[]::TEXT[], NULL::TEXT, true, 4),
    ('Toyota', 'Yaris Sedan', 2025, 'Automático', 'Sedã', NULL::TEXT, NULL::DECIMAL, ARRAY[]::TEXT[], NULL::TEXT, true, 5),
    ('Volkswagen', 'Polo', 2025, 'Automático', 'Hatch', NULL::TEXT, NULL::DECIMAL, ARRAY[]::TEXT[], NULL::TEXT, true, 6)
) AS fleet(brand, model, year, transmission, body_type, app_category, price_per_week, features, image_url, is_active, sort_order)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.vehicles v
  WHERE lower(v.brand) = lower(fleet.brand)
    AND lower(v.model) = lower(fleet.model)
    AND v.year = fleet.year
);

UPDATE public.vehicles v
SET
  transmission = fleet.transmission,
  body_type = fleet.body_type,
  is_active = true,
  sort_order = fleet.sort_order
FROM (
  VALUES
    ('CAOA Chery', 'Arrizo 6 Pro', 2025, 'Automático', 'Sedã', 1),
    ('Volkswagen', 'Nivus', 2025, 'Automático', 'SUV/Crossover', 2),
    ('Chevrolet', 'Tracker', 2025, 'Automático', 'SUV', 3),
    ('Chevrolet', 'Onix Plus', 2025, 'Automático', 'Sedã', 4),
    ('Toyota', 'Yaris Sedan', 2025, 'Automático', 'Sedã', 5),
    ('Volkswagen', 'Polo', 2025, 'Automático', 'Hatch', 6)
) AS fleet(brand, model, year, transmission, body_type, sort_order)
WHERE lower(v.brand) = lower(fleet.brand)
  AND lower(v.model) = lower(fleet.model)
  AND v.year = fleet.year;

-- 4) Dados do site editáveis no painel.
CREATE TABLE IF NOT EXISTS public.company_settings (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  name TEXT NOT NULL DEFAULT 'UTIL LOCADORA',
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  hours TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  logo_url TEXT,
  hero_image_url TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  weekly_price_from DECIMAL(10,2),
  map_embed_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.company_settings (
  id, name, phone, whatsapp, email, address, city, state, hours,
  hero_title, hero_subtitle
)
VALUES (
  1,
  'UTIL LOCADORA',
  '(11) 94722-9449',
  '5511947229449',
  'utillocadora@gmail.com',
  NULL,
  'Itu',
  'SP',
  'Segunda a sábado, 09h às 18h',
  'LOCAÇÃO DE CARROS PARA APLICATIVOS',
  'Veículos 2025 ou mais novos, preparados para a rotina de quem trabalha com aplicativos.'
)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.company_settings TO anon, authenticated;
GRANT INSERT, UPDATE ON public.company_settings TO authenticated;
GRANT ALL ON public.company_settings TO service_role;

DROP POLICY IF EXISTS "Public can view company settings" ON public.company_settings;
CREATE POLICY "Public can view company settings"
ON public.company_settings
FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Admins can insert company settings" ON public.company_settings;
CREATE POLICY "Admins can insert company settings"
ON public.company_settings
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update company settings" ON public.company_settings;
CREATE POLICY "Admins can update company settings"
ON public.company_settings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS set_company_settings_updated_at ON public.company_settings;
CREATE TRIGGER set_company_settings_updated_at
BEFORE UPDATE ON public.company_settings
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 5) Bucket público para fotos publicadas; escrita somente por administradores.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-media',
  'site-media',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE
SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public can view site media" ON storage.objects;
CREATE POLICY "Public can view site media"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'site-media');

DROP POLICY IF EXISTS "Admins can upload site media" ON storage.objects;
CREATE POLICY "Admins can upload site media"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'site-media'
  AND public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Admins can update site media" ON storage.objects;
CREATE POLICY "Admins can update site media"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'site-media'
  AND public.has_role(auth.uid(), 'admin')
)
WITH CHECK (
  bucket_id = 'site-media'
  AND public.has_role(auth.uid(), 'admin')
);

DROP POLICY IF EXISTS "Admins can delete site media" ON storage.objects;
CREATE POLICY "Admins can delete site media"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'site-media'
  AND public.has_role(auth.uid(), 'admin')
);

-- 6) Se o proprietário já existir no Auth, preserva/concede a função admin.
-- Novos usuários NÃO recebem admin automaticamente por e-mail.
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE lower(email) = 'utillocadora@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
