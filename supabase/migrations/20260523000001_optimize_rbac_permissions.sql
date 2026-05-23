-- ============================================
-- Optimize RBAC: Pre-compute permissions in JWT
-- Remove SECURITY DEFINER from hooks
-- ============================================

-- Update Custom Access Token Hook
-- Pre-fetch permissions array into JWT claims for fast RLS checks

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path = ''
AS $$
DECLARE
  claims jsonb;
  user_role text;
  user_permissions text[];
BEGIN
  -- Fetch the user's role name via user_roles -> roles join
  SELECT r.name INTO user_role
  FROM public.user_roles ur
  JOIN public.roles r ON r.id = ur.role_id
  WHERE ur.user_id = (event->>'user_id')::uuid;

  -- Pre-fetch permissions to avoid JOIN in RLS policies
  SELECT array_agg(rp.permission::text) INTO user_permissions
  FROM public.role_permissions rp
  JOIN public.roles r ON r.id = rp.role_id
  WHERE r.name = user_role;

  claims := event->'claims';

  IF user_role IS NOT NULL THEN
    claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    claims := jsonb_set(claims, '{user_permissions}', coalesce(to_jsonb(user_permissions), '[]'::jsonb));
  ELSE
    claims := jsonb_set(claims, '{user_role}', 'null');
    claims := jsonb_set(claims, '{user_permissions}', '[]'::jsonb);
  END IF;

  event := jsonb_set(event, '{claims}', claims);
  RETURN event;
END;
$$;

-- Update Authorize Function with fast path via JWT claims

CREATE OR REPLACE FUNCTION public.authorize(
  requested_permission public.app_permission
)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SET search_path = ''
AS $$
DECLARE
  user_role text;
BEGIN
  -- Fast path: check permissions array in JWT (avoids DB roundtrip)
  IF (auth.jwt()->'user_permissions') ? requested_permission::text THEN
    RETURN true;
  END IF;

  -- Fallback: database lookup
  user_role := (auth.jwt()->>'user_role')::text;

  RETURN EXISTS (
    SELECT 1
    FROM public.role_permissions rp
    JOIN public.roles r ON r.id = rp.role_id
    WHERE rp.permission = requested_permission
      AND r.name = user_role
  );
END;
$$;

-- ============================================
-- Grants (REQUIRED)
-- ============================================

GRANT USAGE ON SCHEMA public TO supabase_auth_admin;

GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;

GRANT EXECUTE ON FUNCTION public.authorize TO authenticated;

GRANT SELECT ON TABLE public.user_roles TO supabase_auth_admin;
GRANT SELECT ON TABLE public.roles TO supabase_auth_admin;
GRANT SELECT ON TABLE public.role_permissions TO supabase_auth_admin;

-- Revoke execute from public/anon for security
REVOKE EXECUTE ON FUNCTION public.custom_access_token_hook FROM authenticated, anon, public;
REVOKE EXECUTE ON FUNCTION public.authorize FROM anon, public;
