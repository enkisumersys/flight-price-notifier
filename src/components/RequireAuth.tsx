import { useEffect, useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthState =
  { status: "loading" } | { status: "signed-out" } | { status: "signed-in"; user: User };

/** Guards child routes: renders them only for a signed-in user, otherwise redirects to /signin. */
export function RequireAuth() {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setAuth(data.user ? { status: "signed-in", user: data.user } : { status: "signed-out" });
    });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setAuth(
        session?.user ? { status: "signed-in", user: session.user } : { status: "signed-out" },
      );
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  if (auth.status === "loading") return <div className="min-h-screen bg-hero" />;
  if (auth.status === "signed-out") return <Navigate to="/signin" replace />;
  return <Outlet context={{ user: auth.user }} />;
}

/** The signed-in user, for pages rendered inside <RequireAuth />. */
export function useAuthUser(): User {
  return useOutletContext<{ user: User }>().user;
}
