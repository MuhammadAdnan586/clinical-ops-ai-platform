"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    date_of_birth: "",
    gender: "",
    phone_number: "",
    address: "",
    chronic_conditions: "",
    allergies: "",
    current_medications: "",
    consent_given: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO (backend): connect to a real /patients/profile endpoint
    console.log("Profile data (not yet saved to backend):", formData);
    setSaved(true);
  };

  return (
    <AppShell>
      <p className="text-sm text-ink-muted mb-1">Your record</p>
      <h1 className="font-display text-3xl text-ink mb-8">Medical profile</h1>

      {saved && (
        <div className="bg-routine-soft text-routine text-sm px-4 py-3 rounded-md mb-6">
          Saved locally. Backend integration lands in a later phase.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-lg p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-ink mb-1.5">Date of birth</label>
            <input
              type="date"
              className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              value={formData.date_of_birth}
              onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-ink mb-1.5">Gender</label>
            <select
              className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-ink mb-1.5">Phone number</label>
          <input
            type="tel"
            className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            value={formData.phone_number}
            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-ink mb-1.5">Address</label>
          <input
            type="text"
            className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-ink mb-1.5">Chronic conditions</label>
          <textarea
            rows={2}
            placeholder="e.g. Diabetes, hypertension"
            className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            value={formData.chronic_conditions}
            onChange={(e) => setFormData({ ...formData, chronic_conditions: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-ink mb-1.5">Allergies</label>
          <textarea
            rows={2}
            placeholder="e.g. Penicillin"
            className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            value={formData.allergies}
            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-ink mb-1.5">Current medications</label>
          <textarea
            rows={2}
            className="w-full border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            value={formData.current_medications}
            onChange={(e) => setFormData({ ...formData, current_medications: e.target.value })}
          />
        </div>

        <label className="flex items-start gap-2.5 text-sm text-ink-muted">
          <input
            type="checkbox"
            className="mt-0.5"
            checked={formData.consent_given}
            onChange={(e) => setFormData({ ...formData, consent_given: e.target.checked })}
          />
          I consent to my medical data being used for triage and care purposes.
        </label>

        <button
          type="submit"
          disabled={!formData.consent_given}
          className="bg-primary text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-40"
        >
          Save profile
        </button>
      </form>
    </AppShell>
  );
}