-- ============================================
-- Drop Old Schema
-- ============================================

-- Drop old RLS policies
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only super_admin can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only super_admin can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only super_admin can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admin and super_admin can view categories" ON public.categories;
DROP POLICY IF EXISTS "Admin and super_admin can create categories" ON public.categories;
DROP POLICY IF EXISTS "Admin and super_admin can update categories" ON public.categories;
DROP POLICY IF EXISTS "Only super_admin can delete categories" ON public.categories;

-- Drop old trigger and function first (before dropping tables)
DROP TRIGGER IF EXISTS set_categories_updated_at ON public.categories;
DROP FUNCTION IF EXISTS public.set_updated_at() CASCADE;

-- Drop old tables
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.roles CASCADE;

-- ============================================
-- Create Permission Enum
-- ============================================

CREATE TYPE public.app_permission AS ENUM (
  'categories.select',
  'categories.insert',
  'categories.update',
  'categories.delete',
  'user_roles.manage'
);

-- ============================================
-- Create Roles Table (flexible, not enum)
-- ============================================

CREATE TABLE IF NOT EXISTS public.roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Insert default roles
INSERT INTO public.roles (name, description) VALUES
  ('super_admin', 'Full system access. Can manage users, roles, and all resources.'),
  ('admin', 'Administrative access. Can manage categories and view most resources.'),
  ('user', 'Standard user access. Limited to own resources.');

-- ============================================
-- Create User Roles Junction Table
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, role_id)
);

-- ============================================
-- Create Role Permissions Junction Table
-- ============================================

CREATE TABLE IF NOT EXISTS public.role_permissions (
  role_id uuid NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  permission public.app_permission NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (role_id, permission)
);

-- Insert default role-permission mappings
INSERT INTO public.role_permissions (role_id, permission)
SELECT r.id, p.permission::public.app_permission
FROM public.roles r
CROSS JOIN (VALUES
  ('categories.select'::public.app_permission),
  ('categories.insert'::public.app_permission),
  ('categories.update'::public.app_permission),
  ('categories.delete'::public.app_permission),
  ('user_roles.manage'::public.app_permission)
) AS p(permission)
WHERE r.name = 'super_admin'

UNION ALL

SELECT r.id, p.permission::public.app_permission
FROM public.roles r
CROSS JOIN (VALUES
  ('categories.select'::public.app_permission),
  ('categories.insert'::public.app_permission),
  ('categories.update'::public.app_permission)
) AS p(permission)
WHERE r.name = 'admin';

-- ============================================
-- Create Categories Table
-- ============================================

CREATE TABLE IF NOT EXISTS public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- Create Updated At Trigger
-- ============================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_categories_updated_at ON public.categories;
CREATE TRIGGER set_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- Enable RLS
-- ============================================

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Grants
-- ============================================

GRANT SELECT ON public.roles TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT ON public.role_permissions TO authenticated;
GRANT ALL ON public.categories TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
