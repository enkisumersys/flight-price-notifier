import { useNavigate } from "react-router";
import { supabase } from "@/integrations/supabase/client";
import { Logo, btnGhost } from "@/components/ui-kit";
import { useAuthUser } from "@/components/RequireAuth";
import { usePageMeta } from "@/lib/use-page-meta";

export default function AppPage() {
  usePageMeta({
    title: "Dashboard — Flight Price Notifier",
    description: "Your Flight Price Notifier dashboard.",
    noindex: true,
  });
  const user = useAuthUser();
  const navigate = useNavigate();
  async function signOut() {
    // Leave the protected page first so the auth guard doesn't bounce to /signin on SIGNED_OUT.
    navigate("/");
    await supabase.auth.signOut();
  }
  return (
    <div className="min-h-screen bg-hero">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <button onClick={signOut} className={btnGhost}>Sign out / 登出</button>
      </header>
      <main className="mx-auto max-w-3xl px-5 pt-16">
        <div className="animate-in fade-in slide-in-from-bottom-2 rounded-2xl border border-border bg-card p-8 duration-500 sm:p-10">
          <h1 className="break-all text-3xl font-bold">Hi {user.email}</h1>
          <p className="mt-4 text-lg">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</p>
          <p className="mt-2 text-muted-foreground">Your dashboard is coming soon. Route-subscription will be added in the next milestone.</p>
        </div>
      </main>
    </div>
  );
}
