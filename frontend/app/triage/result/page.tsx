"use client";

import AppShell from "@/components/AppShell";

export default function TriageResultPage() {
  const result = {
    severity: "routine" as "emergency" | "urgent" | "routine",
    recommendation:
      "Based on what you described, this appears non-urgent. We recommend booking a routine appointment with a doctor.",
  };

  const styles = {
    emergency: { bg: "bg-emergency-soft", border: "border-emergency", text: "text-emergency", label: "Emergency" },
    urgent: { bg: "bg-urgent-soft", border: "border-urgent", text: "text-urgent", label: "Urgent" },
    routine: { bg: "bg-routine-soft", border: "border-routine", text: "text-routine", label: "Routine" },
  }[result.severity];

  return (
    <AppShell>
      <p className="text-sm text-ink-muted mb-1">Result</p>
      <h1 className="font-display text-3xl text-ink mb-8">Your triage result</h1>

      <div className={`${styles.bg} border-l-4 ${styles.border} rounded-lg px-6 py-5 mb-6`}>
        <p className={`text-sm font-semibold ${styles.text} mb-2`}>{styles.label}</p>
        <p className="text-sm text-ink leading-relaxed">{result.recommendation}</p>
      </div>

      <p className="text-xs text-ink-muted mb-8 leading-relaxed">
        This is not a diagnosis. Please consult a doctor for a full
        evaluation. This result is currently a placeholder — the real Triage
        Agent will be built in Phase 9.
      </p>

      <div className="flex gap-3">
        <a href="/appointments" className="bg-primary text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors">
          Book an appointment
        </a>
        <a href="/dashboard" className="border border-border text-ink px-5 py-2.5 rounded-md text-sm font-medium hover:bg-surface transition-colors">
          Back to overview
        </a>
      </div>
    </AppShell>
  );
}
