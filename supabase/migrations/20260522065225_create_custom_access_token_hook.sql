-- ============================================
-- Custom Access Token Hook for RBAC
-- ============================================
-- This hook injects user roles into the JWT claims
-- so that RLS policies can check user roles via auth.jwt()
--
-- Reference: https://supabase.com/docs/guides/api/custom-claims-and-role-based-access-control-rbac

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    claims jsonb;
    user_id uuid;
    user_roles jsonb;
    existing_app_metadata jsonb;
BEGIN
    -- Extract user_id from the event
    user_id := (event->>'user_id')::uuid;

    -- If no user_id, return event unchanged (e.g., anonymous user)
    IF user_id IS NULL THEN
        RETURN event;
    END IF;

    -- Fetch all roles for this user as a JSONB array
    SELECT coalesce(jsonb_agg(role), '[]'::jsonb)
    INTO user_roles
    FROM public.user_roles
    WHERE user_roles.user_id = custom_access_token_hook.user_id;

    -- Get existing claims
    claims := event->'claims';

    -- Get or initialize app_metadata
    existing_app_metadata := coalesce(claims->'app_metadata', '{}'::jsonb);

    -- Inject user_roles into app_metadata
    existing_app_metadata := jsonb_set(
        existing_app_metadata,
        '{user_roles}',
        user_roles
    );

    -- Update claims with modified app_metadata
    claims := jsonb_set(claims, '{app_metadata}', existing_app_metadata);

    -- Return modified event with updated claims
    RETURN jsonb_set(event, '{claims}', claims);
END;
$$;

-- ============================================
-- Grants (REQUIRED for hook to work)
-- ============================================

-- Grant execute to supabase_auth_admin so the auth system can call this hook
GRANT EXECUTE ON FUNCTION public.custom_access_token_hook TO supabase_auth_admin;

-- Grant select on user_roles so the hook can read roles
GRANT SELECT ON TABLE public.user_roles TO supabase_auth_admin;

-- Grant select on roles so the hook can read role definitions
GRANT SELECT ON TABLE public.roles TO supabase_auth_admin;
