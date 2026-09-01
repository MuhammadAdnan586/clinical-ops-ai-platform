"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/api";
import AppShell from "@/components/AppShell";

interface UserData {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
      return;
    }
    getCurrentUser(token)
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("access_token");
        router.push("/login");
      });
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <p className="text-sm text-ink-muted">Loading…</p>
      </div>
    );
  }

  const cards = [
    { href: "/profile", title: "Medical profile", desc: "Update your history, allergies and medications." },
    { href: "/triage", title: "Start triage", desc: "Describe symptoms and get an urgency assessment." },
    { href: "/appointments", title: "Appointments", desc: "View and manage upcoming visits." },
  ];

  return (
    <AppShell userName={user.full_name}>
      <p className="text-sm text-ink-muted mb-1">Overview</p>
      <h1 className="font-display text-3xl text-ink mb-8">
        Welcome back, {user.full_name.split(" ")[0]}
      </h1>

      <div className="bg-urgent-soft border border-urgent/20 rounded-lg px-5 py-4 mb-8 flex gap-3">
        <span className="text-urgent">⚠</span>
        <p className="text-sm text-ink">
          This tool assists with triage and does not replace professional
          medical diagnosis. In an emergency, call your local emergency
          number immediately.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        {cards.map((card) => (
          <a key={card.href} href={card.href}
            className="block bg-surface border border-border rounded-lg p-5 hover:border-primary transition-colors"
          >
            <p className="font-medium text-ink mb-1">{card.title}</p>
            <p className="text-xs text-ink-muted leading-relaxed">{card.desc}</p>
          </a>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <p className="text-sm text-ink-muted mb-4">Account details</p>
        <dl className="grid grid-cols-2 gap-y-3 text-sm">
          <dt className="text-ink-muted">Full name</dt>
          <dd className="text-ink">{user.full_name}</dd>
          <dt className="text-ink-muted">Email</dt>
          <dd className="text-ink">{user.email}</dd>
          <dt className="text-ink-muted">Role</dt>
          <dd className="text-ink capitalize">{user.role}</dd>
          <dt className="text-ink-muted">Status</dt>
          <dd className="text-ink">{user.is_active ? "Active" : "Inactive"}</dd>
        </dl>
      </div>
    </AppShell>
  );
}
