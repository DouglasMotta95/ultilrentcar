-- Hardening: public lead submissions may only create a fresh, unreviewed lead.
CREATE OR REPLACE FUNCTION public.harden_public_lead_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.role() = 'anon' THEN
    NEW.status := 'em_analise';
    NEW.admin_notes := NULL;
    NEW.cnh_url := NULL;
    NEW.residence_proof_url := NULL;
    NEW.criminal_record_url := NULL;
    NEW.app_profile_url := NULL;
    NEW.created_at := COALESCE(NEW.created_at, NOW());
    NEW.updated_at := NOW();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS harden_public_lead_insert ON public.leads;
CREATE TRIGGER harden_public_lead_insert
BEFORE INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.harden_public_lead_insert();

REVOKE ALL ON FUNCTION public.harden_public_lead_insert() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.harden_public_lead_insert() TO anon, authenticated, service_role;
