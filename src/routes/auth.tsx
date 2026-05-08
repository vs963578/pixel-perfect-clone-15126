import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in / Sign up — MRKT" },
      { name: "description", content: "Sign in or create your MRKT account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { signIn, signUp, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: isAdmin ? "/admin" : "/" });
  }, [user, isAdmin, loading, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const fn = mode === "signin" ? signIn : signUp;
    const { error } = await fn(email, password);
    setBusy(false);
    if (error) {
      toast.error(error);
      return;
    }
    if (mode === "signup") {
      toast.success("Account created! Check your email to confirm, then sign in.");
      setMode("signin");
    } else {
      toast.success("Welcome back!");
      navigate({ to: "/" });
    }
  };

  return (
    <div className="grid md:grid-cols-2 min-h-[calc(100vh-104px)]">
      <div className="hidden md:flex flex-col justify-between p-12 bg-bg2 border-r border-border">
        <div className="font-display text-2xl font-bold">
          MR<span className="text-accent">K</span>T
        </div>
        <div>
          <h2 className="font-display text-4xl font-bold tracking-[-0.02em] leading-tight mb-4">
            {mode === "signin" ? "Welcome back." : "Join MRKT."}
          </h2>
          <p className="text-ink2 max-w-sm leading-relaxed">
            {mode === "signin"
              ? "Sign in to track orders, save favourites and check out faster."
              : "Create an account to shop curated goods, save your address and track every order."}
          </p>
        </div>
        <div className="text-xs font-mono-store text-ink3">
          © {new Date().getFullYear()} MRKT · Curated general store
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          <h1 className="font-display text-3xl font-bold tracking-[-0.02em] mb-2">
            {mode === "signin" ? "Sign in" : "Create your account"}
          </h1>
          <p className="text-ink2 text-sm mb-8">
            {mode === "signin" ? (
              <>
                New here?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-accent font-medium hover:underline"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have one?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-accent font-medium hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-[12px] font-mono-store text-ink2 mb-1.5 tracking-wide">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-[10px] text-sm bg-background outline-none focus:border-accent transition-colors"
                />
              </div>
            )}
            <div>
              <label className="block text-[12px] font-mono-store text-ink2 mb-1.5 tracking-wide">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-[10px] text-sm bg-background outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-[12px] font-mono-store text-ink2 mb-1.5 tracking-wide">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-[10px] text-sm bg-background outline-none focus:border-accent transition-colors"
              />
              <p className="text-[11px] text-ink3 mt-1.5">Minimum 6 characters</p>
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full py-3.5 bg-accent text-white rounded-[10px] font-semibold hover:bg-accent2 transition-colors disabled:opacity-50"
            >
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="mt-8 text-xs text-ink3 font-mono-store">
            <Link to="/" className="hover:text-ink">← Back to store</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
