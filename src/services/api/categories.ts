"use server";

import { createServerSupabaseClient } from "@/services/config/supabase-server";
import { revalidatePath } from "next/cache";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
}

export async function getCategories(): Promise<{
  data: Category[] | null;
  error: string | null;
}> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getCategoryById(
  id: string
): Promise<{ data: Category | null; error: string | null }> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function createCategory(
  formData: CategoryFormData
): Promise<{ data: Category | null; error: string | null }> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: formData.name,
      description: formData.description || null,
    })
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/admin/categories");
  return { data, error: null };
}

export async function updateCategory(
  id: string,
  formData: CategoryFormData
): Promise<{ data: Category | null; error: string | null }> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .update({
      name: formData.name,
      description: formData.description || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  revalidatePath("/admin/categories");
  return { data, error: null };
}

export async function deleteCategory(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/categories");
  return { success: true, error: null };
}
