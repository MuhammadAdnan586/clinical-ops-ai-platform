"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";

export default function TriagePage() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO (Phase 9): connect to /triage/submit once the Triage Agent exists
    console.log("Symptoms submitted (not yet processed):", symptoms);
    setTimeout(() => router.push("/triage/result"), 600);
  };

  return (
    <AppShell>
      <p className="text-sm text-ink-muted mb-1">Symptom check</p>
      <h1 className="font-display text-3xl text-ink mb-6">Describe your symptoms</h1>

      <div className="bg-emergency-soft border border-emergency/20 rounded-lg px-5 py-4 mb-6">
        <p className="text-sm text-emergency">
          If you have chest pain, difficulty breathing, severe bleeding, or
          believe this is an emergency, call your local emergency number now
          instead of using this form.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm text-ink mb-1.5">
            What are you experiencing?
          </label>
          <textarea
            required
            rows={7}
            placeholder="e.g. I've had a headache and mild fever since yesterday…"
            className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-primary text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit for triage"}
        </button>
      </form>
    </AppShell>
  );
}