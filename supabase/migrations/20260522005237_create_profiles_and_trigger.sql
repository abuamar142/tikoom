-- Create profiles table (minimal: id + name + optional avatar_id + timestamps)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  avatar_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Grant access
GRANT SELECT, UPDATE ON public.profiles TO authenticated;

-- Trigger function: insert profile + assign default "user" role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  default_role_id uuid;
BEGIN
  -- Insert into profiles (name only, email/role come from auth/users_roles)
  INSERT INTO public.profiles (id, name)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'name'
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

-- Attach trigger to auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
