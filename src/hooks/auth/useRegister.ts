"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/services/config/supabase";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

interface UseRegisterReturn {
  register: (data: RegisterFormData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useRegister(): UseRegisterReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { name: data.name },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // If session exists (auto-confirm/local dev), go to dashboard
      // Otherwise, show verify-email page
      if (signUpData.session) {
        router.push("/dashboard");
      } else {
        router.push("/verify-email");
      }
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}
