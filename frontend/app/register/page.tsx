"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "patient",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser(formData);
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-ink text-white flex-col justify-between p-12">
        <p className="font-display italic text-2xl">Meridian Health</p>
        <div>
          <h1 className="font-display text-4xl leading-tight mb-4">
            Your care,
            <br />
            coordinated safely.
          </h1>
          <p className="text-white/70 max-w-sm text-sm leading-relaxed">
            One place to describe symptoms, track appointments, and stay in
            touch with your care team.
          </p>
        </div>
        <p className="text-xs text-white/40">
          This tool assists with triage. It does not replace a doctor.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-canvas">
        <div className="w-full max-w-sm">
          <h2 className="font-display text-2xl text-ink mb-1">Create your account</h2>
          <p className="text-sm text-ink-muted mb-8">It takes less than a minute.</p>

          {error && (
            <div className="bg-emergency-soft text-emergency text-sm px-4 py-3 rounded-md mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-ink mb-1.5">Full name</label>
              <input
                type="text"
                required
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-ink mb-1.5">Email</label>
              <input
                type="email"
                required
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-ink mb-1.5">Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2.5 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-sm text-ink-muted mt-6">
            Already registered?{" "}
            <a href="/login" className="text-primary hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}