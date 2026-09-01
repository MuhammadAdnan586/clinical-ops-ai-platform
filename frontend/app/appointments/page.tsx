"use client";

import AppShell from "@/components/AppShell";

export default function AppointmentsPage() {
  const appointments = [
    { id: 1, doctor: "Dr. Ahmed", date: "5 Sep 2026", time: "10:00 AM", status: "scheduled" },
  ];

  const statusColor: Record<string, string> = {
    scheduled: "text-routine",
    completed: "text-ink-muted",
    cancelled: "text-emergency",
  };

  return (
    <AppShell>
      <p className="text-sm text-ink-muted mb-1">Care schedule</p>
      <h1 className="font-display text-3xl text-ink mb-6">Appointments</h1>

      <p className="text-sm text-ink-muted mb-6">
        Booking will connect to the Scheduling Agent in a later phase. Shown
        below is placeholder data.
      </p>

      <div className="bg-surface border border-border rounded-lg divide-y divide-border">
        {appointments.map((appt) => (
          <div key={appt.id} className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm font-medium text-ink">{appt.doctor}</p>
              <p className="text-xs text-ink-muted mt-0.5">{appt.date} · {appt.time}</p>
            </div>
            <span className={`text-xs font-medium capitalize ${statusColor[appt.status]}`}>
              {appt.status}
            </span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
