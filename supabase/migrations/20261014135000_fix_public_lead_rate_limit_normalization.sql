-- Normaliza CPF e telefone removendo todo caractere que não seja dígito.
-- A classe [^0-9] evita ambiguidades de escape entre SQL e expressão regular.
CREATE OR REPLACE FUNCTION public.limit_public_lead_spam()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INTEGER;
  normalized_email TEXT := lower(trim(COALESCE(NEW.email, '')));
  normalized_cpf TEXT := regexp_replace(COALESCE(NEW.cpf, ''), '[^0-9]', '', 'g');
  normalized_phone TEXT := regexp_replace(COALESCE(NEW.cellphone, ''), '[^0-9]', '', 'g');
BEGIN
  IF auth.role() <> 'anon' THEN
    RETURN NEW;
  END IF;

  SELECT COUNT(*) INTO recent_count
  FROM public.leads
  WHERE created_at >= NOW() - INTERVAL '24 hours'
    AND (
      (normalized_email <> '' AND lower(trim(email)) = normalized_email)
      OR (
        normalized_cpf <> ''
        AND regexp_replace(COALESCE(cpf, ''), '[^0-9]', '', 'g') = normalized_cpf
      )
      OR (
        normalized_phone <> ''
        AND regexp_replace(COALESCE(cellphone, ''), '[^0-9]', '', 'g') = normalized_phone
      )
    );

  IF recent_count >= 3 THEN
    RAISE EXCEPTION 'Limite temporário de novos cadastros atingido. Tente novamente mais tarde.';
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.limit_public_lead_spam() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.limit_public_lead_spam() TO anon, authenticated, service_role;
