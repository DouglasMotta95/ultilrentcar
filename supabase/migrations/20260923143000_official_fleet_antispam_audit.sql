-- Útil Locadora: frota oficial, anti-abuso e trilha administrativa
-- Mantém o site limitado à frota realmente publicada e adiciona controles operacionais.

-- 1) Frota oficial: somente os quatro modelos definidos para o site ficam ativos.
-- Registros legados permanecem no banco para histórico, mas não são publicados.
UPDATE public.vehicles
SET is_active = false
WHERE NOT (
  lower(brand) = 'volkswagen' AND lower(model) LIKE 'polo track%'
)
AND NOT (
  lower(brand) = 'hyundai' AND lower(model) LIKE 'hb20%' AND (
    lower(model) LIKE '%sedan%' OR lower(model) LIKE '%hatch%' OR lower(model) LIKE '%hb20s%'
  )
)
AND NOT (
  lower(brand) = 'chevrolet' AND lower(model) IN ('onix plus', 'onix sedan (onix plus)')
);

-- Normaliza nomes publicados quando os registros já existem.
UPDATE public.vehicles
SET brand = 'Volkswagen', model = 'Polo Track', body_type = 'Hatch', sort_order = 1
WHERE lower(brand) = 'volkswagen' AND lower(model) LIKE 'polo track%';

UPDATE public.vehicles
SET brand = 'Hyundai', model = 'HB20 Hatch', body_type = 'Hatch', sort_order = 2
WHERE lower(brand) = 'hyundai'
  AND lower(model) LIKE 'hb20%'
  AND lower(model) NOT LIKE '%sedan%'
  AND lower(model) NOT LIKE '%hb20s%';

UPDATE public.vehicles
SET brand = 'Hyundai', model = 'HB20 Sedan (HB20S)', body_type = 'Sedã', sort_order = 3
WHERE lower(brand) = 'hyundai'
  AND (lower(model) LIKE '%hb20s%' OR lower(model) LIKE '%hb20%sedan%');

UPDATE public.vehicles
SET brand = 'Chevrolet', model = 'Onix Sedan (Onix Plus)', body_type = 'Sedã', sort_order = 4
WHERE lower(brand) = 'chevrolet'
  AND lower(model) IN ('onix plus', 'onix sedan (onix plus)');

-- 2) Anti-abuso básico para o formulário público.
-- Bloqueia repetição excessiva usando os identificadores já fornecidos pelo visitante.
CREATE OR REPLACE FUNCTION public.limit_public_lead_spam()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INTEGER;
  normalized_email TEXT := lower(trim(COALESCE(NEW.email, '')));
  normalized_cpf TEXT := regexp_replace(COALESCE(NEW.cpf, ''), '\\D', '', 'g');
  normalized_phone TEXT := regexp_replace(COALESCE(NEW.cellphone, ''), '\\D', '', 'g');
BEGIN
  IF auth.role() <> 'anon' THEN
    RETURN NEW;
  END IF;

  SELECT COUNT(*) INTO recent_count
  FROM public.leads
  WHERE created_at >= NOW() - INTERVAL '24 hours'
    AND (
      (normalized_email <> '' AND lower(trim(email)) = normalized_email)
      OR (normalized_cpf <> '' AND regexp_replace(COALESCE(cpf, ''), '\\D', '', 'g') = normalized_cpf)
      OR (normalized_phone <> '' AND regexp_replace(COALESCE(cellphone, ''), '\\D', '', 'g') = normalized_phone)
    );

  IF recent_count >= 3 THEN
    RAISE EXCEPTION 'Limite temporário de novos cadastros atingido. Tente novamente mais tarde.';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS limit_public_lead_spam ON public.leads;
CREATE TRIGGER limit_public_lead_spam
BEFORE INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.limit_public_lead_spam();

REVOKE ALL ON FUNCTION public.limit_public_lead_spam() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.limit_public_lead_spam() TO anon, authenticated, service_role;

-- 3) Trilha de auditoria para alterações administrativas.
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  summary TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS admin_audit_log_created_at_idx
  ON public.admin_audit_log (created_at DESC);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.admin_audit_log FROM anon;
REVOKE ALL ON public.admin_audit_log FROM authenticated;

DROP POLICY IF EXISTS "Admins can view audit log" ON public.admin_audit_log;
CREATE POLICY "Admins can view audit log"
ON public.admin_audit_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.write_admin_audit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_id TEXT;
  actor UUID;
  action_name TEXT;
  summary_text TEXT;
  detail_json JSONB;
BEGIN
  actor := auth.uid();

  IF TG_OP = 'INSERT' THEN
    target_id := COALESCE(to_jsonb(NEW)->>'id', '');
    action_name := 'insert';
    detail_json := to_jsonb(NEW);
  ELSIF TG_OP = 'UPDATE' THEN
    target_id := COALESCE(to_jsonb(NEW)->>'id', to_jsonb(OLD)->>'id', '');
    action_name := 'update';
    detail_json := jsonb_build_object('before', to_jsonb(OLD), 'after', to_jsonb(NEW));
  ELSE
    target_id := COALESCE(to_jsonb(OLD)->>'id', '');
    action_name := 'delete';
    detail_json := to_jsonb(OLD);
  END IF;

  summary_text := TG_TABLE_NAME || ' ' || action_name;

  INSERT INTO public.admin_audit_log (actor_user_id, action, entity, entity_id, summary, details)
  VALUES (actor, action_name, TG_TABLE_NAME, target_id, summary_text, detail_json);

  RETURN COALESCE(NEW, OLD);
END;
$$;

REVOKE ALL ON FUNCTION public.write_admin_audit() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.write_admin_audit() TO authenticated, service_role;

DROP TRIGGER IF EXISTS audit_vehicles ON public.vehicles;
CREATE TRIGGER audit_vehicles
AFTER INSERT OR UPDATE OR DELETE ON public.vehicles
FOR EACH ROW EXECUTE FUNCTION public.write_admin_audit();

DROP TRIGGER IF EXISTS audit_leads ON public.leads;
CREATE TRIGGER audit_leads
AFTER INSERT OR UPDATE OR DELETE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.write_admin_audit();

DROP TRIGGER IF EXISTS audit_company_settings ON public.company_settings;
CREATE TRIGGER audit_company_settings
AFTER INSERT OR UPDATE OR DELETE ON public.company_settings
FOR EACH ROW EXECUTE FUNCTION public.write_admin_audit();

COMMENT ON TABLE public.admin_audit_log IS 'Trilha de alterações administrativas da UTIL LOCADORA.';
