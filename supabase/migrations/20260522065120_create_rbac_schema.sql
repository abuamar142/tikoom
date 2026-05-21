-- Create roles type as text with CHECK constraint for flexibility
CREATE TABLE IF NOT EXISTS public.roles (
    name text PRIMARY KEY,
    description text,
    created_at timestamptz DEFAULT now()
);

-- Insert default roles
INSERT INTO public.roles (name, description) VALUES
    ('super_admin', 'Full system access. Can manage users, roles, and all resources.'),
    ('admin', 'Administrative access. Can manage categories and view most resources.'),
    ('user', 'Standard user access. Limited to own resources.')
ON CONFLICT (name) DO NOTHING;

-- Create user_roles junction table
CREATE TABLE IF NOT EXISTS public.user_roles (
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role text NOT NULL REFERENCES public.roles(name) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    PRIMARY KEY (user_id, role)
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    description text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create updated_at trigger function
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

-- Attach trigger to categories
DROP TRIGGER IF EXISTS set_categories_updated_at ON public.categories;
CREATE TRIGGER set_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies for user_roles
-- ============================================

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
    ON public.user_roles
    FOR SELECT
    USING (auth.uid() = user_id);

-- Only super_admin can manage roles
CREATE POLICY "Only super_admin can insert roles"
    ON public.user_roles
    FOR INSERT
    WITH CHECK (
        (auth.jwt()->'app_metadata'->'user_roles') ? 'super_admin'
    );

CREATE POLICY "Only super_admin can update roles"
    ON public.user_roles
    FOR UPDATE
    USING (
        (auth.jwt()->'app_metadata'->'user_roles') ? 'super_admin'
    )
    WITH CHECK (
        (auth.jwt()->'app_metadata'->'user_roles') ? 'super_admin'
    );

CREATE POLICY "Only super_admin can delete roles"
    ON public.user_roles
    FOR DELETE
    USING (
        (auth.jwt()->'app_metadata'->'user_roles') ? 'super_admin'
    );

-- ============================================
-- RLS Policies for categories
-- ============================================

-- Only super_admin and admin can SELECT categories
CREATE POLICY "Admin and super_admin can view categories"
    ON public.categories
    FOR SELECT
    USING (
        (auth.jwt()->'app_metadata'->'user_roles') ?| array['super_admin', 'admin']
    );

-- Only super_admin and admin can INSERT categories
CREATE POLICY "Admin and super_admin can create categories"
    ON public.categories
    FOR INSERT
    WITH CHECK (
        (auth.jwt()->'app_metadata'->'user_roles') ?| array['super_admin', 'admin']
    );

-- Only super_admin and admin can UPDATE categories
CREATE POLICY "Admin and super_admin can update categories"
    ON public.categories
    FOR UPDATE
    USING (
        (auth.jwt()->'app_metadata'->'user_roles') ?| array['super_admin', 'admin']
    )
    WITH CHECK (
        (auth.jwt()->'app_metadata'->'user_roles') ?| array['super_admin', 'admin']
    );

-- Only super_admin can DELETE categories
CREATE POLICY "Only super_admin can delete categories"
    ON public.categories
    FOR DELETE
    USING (
        (auth.jwt()->'app_metadata'->'user_roles') ? 'super_admin'
    );

-- ============================================
-- Grants for authenticated users
-- ============================================

-- Allow authenticated users to read roles list
GRANT SELECT ON public.roles TO authenticated;

-- Allow authenticated users to read their own user_roles
GRANT SELECT ON public.user_roles TO authenticated;

-- Allow admin/super_admin to manage categories
GRANT ALL ON public.categories TO authenticated;

-- Allow sequence usage for categories id
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
