"use client";

import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/profile", label: "Medical profile" },
  { href: "/triage", label: "Start triage" },
  { href: "/appointments", label: "Appointments" },
];

export default function AppShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-canvas">
      <aside className="w-64 shrink-0 border-r border-border bg-surface flex flex-col">
        <div className="px-6 py-7 border-b border-border">
          <p className="font-display italic text-xl text-ink">Meridian Health</p>
          <p className="text-xs text-ink-muted mt-1">Clinical triage & care</p>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <a key={item.href} href={item.href}
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-ink-muted hover:bg-canvas hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-border">
          {userName && (
            <p className="px-3 text-xs text-ink-muted mb-2">Signed in as {userName}</p>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-md text-sm text-ink-muted hover:bg-canvas hover:text-emergency transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">{children}</div>
      </main>
    </div>
  );
}
