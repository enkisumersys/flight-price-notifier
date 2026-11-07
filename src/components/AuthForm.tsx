import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { supabase } from "@/integrations/supabase/client";
import { Logo, btnPrimary, inputCls } from "@/components/ui-kit";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isUp = mode === "signup";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { data, error } = isUp
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/app" } })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    if (!data.session) return setError("請到信箱確認後再登入 / Please confirm your email, then sign in.");
    navigate("/app");
  }

  return (
    <div className="flex min-h-screen flex-col bg-hero">
      <header className="mx-auto w-full max-w-6xl px-5 py-5"><Logo /></header>
      <main className="flex flex-1 items-center justify-center px-5 pb-20">
        <form onSubmit={onSubmit} className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-border bg-card p-8 duration-500">
          <h1 className="text-2xl font-bold">{isUp ? "Sign up / 註冊" : "Sign in / 登入"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{isUp ? "建立帳號開始追蹤機票" : "歡迎回來"}</p>
          <label className="mt-6 block text-sm font-medium">Email</label>
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls + " mt-1.5"} />
          <label className="mt-4 block text-sm font-medium">Password</label>
          <input type="password" required minLength={6} autoComplete={isUp ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls + " mt-1.5"} />
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          <button type="submit" disabled={loading} className={btnPrimary + " mt-6 w-full py-2.5"}>
            {loading ? "…" : isUp ? "Create account" : "Sign in"}
          </button>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            {isUp ? "已有帳號？" : "還沒有帳號？"}{" "}
            <Link to={isUp ? "/signin" : "/signup"} className="font-medium text-primary-glow hover:underline">
              {isUp ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}
