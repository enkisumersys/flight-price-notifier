import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";

import { App } from "@/App";

// The landing and not-found pages never touch Supabase, but stub the client so
// the test run needs no network or environment variables.
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

class IntersectionObserverStub {
  observe() {}
  disconnect() {}
  unobserve() {}
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routing", () => {
  it("renders the landing page for / instead of falling back to not found", () => {
    renderAt("/");
    expect(screen.getByText("設定航線與目標價，機票降價就通知你")).toBeInTheDocument();
    expect(screen.queryByText("Page not found")).not.toBeInTheDocument();
  });

  it("renders the sign-in page", () => {
    renderAt("/signin");
    expect(screen.getByRole("heading", { name: "Sign in / 登入" })).toBeInTheDocument();
  });

  it("renders the sign-up page", () => {
    renderAt("/signup");
    expect(screen.getByRole("heading", { name: "Sign up / 註冊" })).toBeInTheDocument();
  });

  it("shows not found for unknown paths", () => {
    renderAt("/does-not-exist");
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
