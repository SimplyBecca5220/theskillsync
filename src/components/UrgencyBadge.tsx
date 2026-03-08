import { type UrgencyLevel } from "@/lib/store";

const config: Record<UrgencyLevel, { label: string; className: string }> = {
  high: { label: "Urgent", className: "bg-urgent/15 text-urgent border-urgent/30" },
  medium: { label: "Medium", className: "bg-medium/15 text-medium border-medium/30" },
  low: { label: "Low", className: "bg-low/15 text-low border-low/30" },
};

export function UrgencyBadge({ level }: { level: UrgencyLevel }) {
  const c = config[level];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono font-semibold ${c.className}`}>
      {c.label}
    </span>
  );
}
