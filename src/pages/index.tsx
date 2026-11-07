import { Link } from "react-router";
import { Radar, Mail, CircleX } from "lucide-react";
import { Logo, Reveal, btnPrimary, btnGhost } from "@/components/ui-kit";
import { usePageMeta } from "@/lib/use-page-meta";

const features = [
  { icon: Radar, title: "盯緊熱門航線", en: "Always-on route watching", body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
  { icon: Mail, title: "達標自動通知", en: "Target-price email alerts", body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
  { icon: CircleX, title: "隨時取消", en: "Cancel anytime", body: "月訂閱制，不想用隨時停，沒有綁約。" },
];

export default function Index() {
  usePageMeta({
    title: "Flight Price Notifier 機票降價通知",
    description: "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
  });
  return (
    <div className="min-h-screen bg-hero">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <Link to="/signin" className={btnPrimary}>Sign in / 登入</Link>
      </header>

      <main>
        <section className="mx-auto max-w-4xl px-5 pb-24 pt-20 text-center sm:pt-28">
          <Reveal>
            <p className="mb-5 inline-block rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
              台北出發 · TPE → NRT / ICN
            </p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              <span className="text-gradient">Flight Price</span> Notifier
            </h1>
            <p className="mt-6 text-xl font-medium sm:text-2xl">設定航線與目標價，機票降價就通知你</p>
            <p className="mt-3 text-muted-foreground">Set a route and a target price — we email you when the fare drops.</p>
            <div className="mt-10 flex justify-center gap-3">
              <Link to="/signup" className={btnPrimary + " px-6 py-3"}>免費註冊 Get started</Link>
              <Link to="/signin" className={btnGhost + " px-6 py-3"}>登入</Link>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-28">
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.en} delay={i * 100}>
                <div className="h-full rounded-2xl border border-border bg-card p-7 transition hover:border-primary/50">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                    <f.icon className="h-5 w-5 text-primary-glow" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-primary-glow">{f.en}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}
