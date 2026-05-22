"use server";

import { createServiceSupabaseClient } from "@/services/config/supabase-service";
import { revalidatePath } from "next/cache";

export interface UserWithRole {
  id: string;
  email: string;
  name: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
}

export async function getUsers(): Promise<{
  data: UserWithRole[] | null;
  error: string | null;
}> {
  const supabase = createServiceSupabaseClient();

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, name, email, is_active, created_at")
    .order("created_at", { ascending: false });

  if (profilesError) {
    return { data: null, error: profilesError.message };
  }

  const { data: userRoles, error: rolesError } = await supabase
    .from("user_roles")
    .select("user_id, roles(name)");

  if (rolesError) {
    return { data: null, error: rolesError.message };
  }

  const users: UserWithRole[] =
    profiles?.map((profile) => {
      const userRole = userRoles?.find((ur) => ur.user_id === profile.id);
      return {
        id: profile.id,
        email: profile.email || "",
        name: profile.name,
        role: (userRole?.roles as any)?.name || "user",
        is_active: profile.is_active ?? true,
        created_at: profile.created_at,
      };
    }) || [];

  return { data: users, error: null };
}

export async function updateUserRole(
  userId: string,
  roleName: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = createServiceSupabaseClient();

  const { data: role } = await supabase
    .from("roles")
    .select("id")
    .eq("name", roleName)
    .single();

  if (!role) {
    return { success: false, error: "Role tidak ditemukan" };
  }

  // Delete existing roles for this user, then insert new role
  const { error: deleteError } = await supabase
    .from("user_roles")
    .delete()
    .eq("user_id", userId);

  if (deleteError) {
    return { success: false, error: deleteError.message };
  }

  const { error } = await supabase
    .from("user_roles")
    .insert({ user_id: userId, role_id: role.id });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true, error: null };
}

export async function toggleUserStatus(
  userId: string,
  isActive: boolean
): Promise<{ success: boolean; error: string | null }> {
  const supabase = createServiceSupabaseClient();

  const { error } = await supabase
    .from("profiles")
    .update({ is_active: isActive })
    .eq("id", userId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true, error: null };
}
