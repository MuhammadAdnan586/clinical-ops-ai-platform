"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("access_token", data.access_token);
      router.push("/dashboard");
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
            Get the right care,
            <br />
            at the right time.
          </h1>
          <p className="text-white/70 max-w-sm text-sm leading-relaxed">
            Describe your symptoms, get triaged safely, and connect with a
            doctor — with every high-risk decision reviewed by a human before
            it&apos;s final.
          </p>
        </div>
        <p className="text-xs text-white/40">
          Not a substitute for emergency care. Call your local emergency
          number if you are in crisis.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-canvas">
        <div className="w-full max-w-sm">
          <h2 className="font-display text-2xl text-ink mb-1">Welcome back</h2>
          <p className="text-sm text-ink-muted mb-8">Log in to continue your care.</p>

          {error && (
            <div className="bg-emergency-soft text-emergency text-sm px-4 py-3 rounded-md mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-ink mb-1.5">Email</label>
              <input
                type="email"
                required
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-ink mb-1.5">Password</label>
              <input
                type="password"
                required
                className="w-full border border-border rounded-md px-3 py-2.5 text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2.5 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="text-sm text-ink-muted mt-6">
            New here?{" "}
            <a href="/register" className="text-primary hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}