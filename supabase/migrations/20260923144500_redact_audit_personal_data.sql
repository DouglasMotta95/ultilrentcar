-- Privacy hardening for the administrative audit trail.
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
  ELSIF TG_OP = 'UPDATE' THEN
    target_id := COALESCE(to_jsonb(NEW)->>'id', to_jsonb(OLD)->>'id', '');
    action_name := 'update';
  ELSE
    target_id := COALESCE(to_jsonb(OLD)->>'id', '');
    action_name := 'delete';
  END IF;

  -- Leads may contain CPF, birth date, address and other personal data.
  -- The audit trail stores only operational metadata for them.
  IF TG_TABLE_NAME = 'leads' THEN
    IF TG_OP = 'DELETE' THEN
      detail_json := jsonb_build_object(
        'status', OLD.status,
        'platform', OLD.platform,
        'vehicle_interest', OLD.vehicle_interest
      );
    ELSE
      detail_json := jsonb_build_object(
        'status', NEW.status,
        'platform', NEW.platform,
        'vehicle_interest', NEW.vehicle_interest
      );
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    detail_json := jsonb_build_object('before', to_jsonb(OLD), 'after', to_jsonb(NEW));
  ELSIF TG_OP = 'INSERT' THEN
    detail_json := to_jsonb(NEW);
  ELSE
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
