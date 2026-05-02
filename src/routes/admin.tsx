import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogOut, ShieldAlert } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — MRKT" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="p-12 text-center text-ink2 text-sm">Loading…</div>;
  }
  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="max-w-[520px] mx-auto px-6 py-20 text-center">
        <ShieldAlert className="h-10 w-10 mx-auto text-accent mb-4" />
        <h1 className="font-display text-2xl font-bold mb-2">Not an admin</h1>
        <p className="text-ink2 text-sm mb-6">
          Your account ({user.email}) doesn't have admin access. Ask an existing admin
          to grant you the <code className="font-mono-store text-xs">admin</code> role
          in the <code className="font-mono-store text-xs">user_roles</code> table.
        </p>
        <p className="text-xs text-ink3 font-mono-store mb-6 break-all">
          user id: {user.id}
        </p>
        <button
          onClick={async () => {
            await signOut();
            navigate({ to: "/auth" });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white rounded-[10px] text-sm font-semibold"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-border">
        <div>
          <div className="text-[11px] font-mono-store text-ink3 uppercase tracking-wider">
            Admin
          </div>
          <Link to="/admin" className="font-display text-2xl font-bold">Orders</Link>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-ink3 font-mono-store hidden sm:inline">{user.email}</span>
          <button
            onClick={async () => {
              await signOut();
              navigate({ to: "/auth" });
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-border rounded-[10px] hover:border-ink"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
