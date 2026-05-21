"use client";

import { createBrowserSupabaseClient } from "@/services/config/supabase";
import { User } from "@/interfaces/auth";
import { useEffect, useState } from "react";

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    const getUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email || "",
          created_at: authUser.created_at,
          updated_at: authUser.updated_at || authUser.created_at,
        });
      }

      setIsLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          created_at: session.user.created_at,
          updated_at: session.user.updated_at || session.user.created_at,
        });
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signOut,
  };
}
