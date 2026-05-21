"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/services/config/supabase";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

interface UseLoginReturn {
  login: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
