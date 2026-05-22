-- Add is_active column to profiles for user management
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- Add email column to profiles for easier querying
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email text;

-- Update trigger to also sync email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  default_role_id uuid;
BEGIN
  -- Insert into profiles (name + email)
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'name',
    new.email
  );

  -- Assign default "user" role
  SELECT id INTO default_role_id
  FROM public.roles
  WHERE name = 'user';

  IF default_role_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role_id)
    VALUES (new.id, default_role_id);
  END IF;

  RETURN new;
END;
$$;

-- Update existing profiles with email from auth.users
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.email IS NULL;
