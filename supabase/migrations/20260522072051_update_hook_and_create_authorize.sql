-- ============================================
-- Update Custom Access Token Hook
-- ============================================
-- Inject single user_role (text) into JWT claims
-- instead of array of roles

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  claims jsonb;
  user_role text;
BEGIN
  -- Fetch the user's role name via user_roles -> roles join
  SELECT r.name INTO user_role
  FROM public.user_roles ur
  JOIN public.roles r ON r.id = ur.role_id
  WHERE ur.user_id = (event->>'user_id')::uuid;

  claims := event->'claims';

  IF user_role IS NOT NULL THEN
    claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
  ELSE
    claims := jsonb_set(claims, '{user_role}', 'null');
  END IF;

  event := jsonb_set(event, '{claims}', claims);
  RETURN event;
END;
$$;

-- ============================================
-- Create Authorize Function
-- ============================================
-- Centralized permission checker using role_permissions matrix

CREATE OR REPLACE FUNCTION public.authorize(
  requested_permission public.app_permission
)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  bind_permissions int;
  user_role text;
BEGIN
  -- Extract user role from JWT claim
  SELECT (auth.jwt()->>'user_role')::text INTO user_role;

  -- Check if user's role has the requested permission
  SELECT count(*) INTO bind_permissions
  FROM public.role_permissions rp
  JOIN public.roles r ON r.id = rp.role_id
  WHERE rp.permission = requested_permission
    AND r.name = user_role;

  RETURN bind_permissions > 0;
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

-- ============================================
-- RLS Policies for user_roles
-- ============================================

CREATE POLICY "Users can view own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Only super_admin can manage user_roles"
  ON public.user_roles
  FOR ALL
  USING (
    (SELECT authorize('user_roles.manage'))
  )
  WITH CHECK (
    (SELECT authorize('user_roles.manage'))
  );

-- ============================================
-- RLS Policies for role_permissions
-- ============================================
-- Allow authenticated users to read role_permissions
-- (needed for authorize() function to work)

CREATE POLICY "Authenticated users can view role_permissions"
  ON public.role_permissions
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- RLS Policies for categories (using authorize)
-- ============================================

CREATE POLICY "Allow authorized select on categories"
  ON public.categories
  FOR SELECT
  TO authenticated
  USING ((SELECT authorize('categories.select')));

CREATE POLICY "Allow authorized insert on categories"
  ON public.categories
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT authorize('categories.insert')));

CREATE POLICY "Allow authorized update on categories"
  ON public.categories
  FOR UPDATE
  TO authenticated
  USING ((SELECT authorize('categories.update')))
  WITH CHECK ((SELECT authorize('categories.update')));

CREATE POLICY "Allow authorized delete on categories"
  ON public.categories
  FOR DELETE
  TO authenticated
  USING ((SELECT authorize('categories.delete')));
