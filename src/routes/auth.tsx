import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — MRKT" },
      { name: "description", content: "Sign in to manage MRKT orders." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [user, loading, navigate]);

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
      toast.success("Account created. Check your email to confirm, then sign in.");
      setMode("signin");
    } else {
      toast.success("Signed in");
      navigate({ to: "/admin" });
    }
  };

  return (
    <div className="max-w-[420px] mx-auto px-6 py-16">
      <h1 className="font-display text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-2">
        {mode === "signin" ? "Sign in" : "Create account"}
      </h1>
      <p className="text-ink2 text-sm mb-8">
        {mode === "signin"
          ? "Access the admin order dashboard."
          : "New admins sign up here. An admin role must be granted in the database."}
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
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
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full py-3.5 bg-ink text-white rounded-[10px] font-semibold hover:bg-accent transition-colors disabled:opacity-50"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
        className="mt-5 text-sm text-ink2 hover:text-ink underline-offset-4 hover:underline"
      >
        {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
      </button>

      <div className="mt-10 text-xs text-ink3 font-mono-store">
        <Link to="/" className="hover:text-ink">← Back to store</Link>
      </div>
    </div>
  );
}
