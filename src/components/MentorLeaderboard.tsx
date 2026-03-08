import { Trophy, Award, Star } from "lucide-react";
import { useMentors } from "@/hooks/use-store";

const badgeColors = [
  "text-badge-gold",
  "text-badge-silver",
  "text-badge-bronze",
];

export function MentorLeaderboard() {
  const mentors = useMentors();

  return (
    <div className="rounded-xl border border-border bg-card p-5 card-glow">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-badge-gold" />
        <h3 className="font-mono font-semibold text-sm">Mentor Leaderboard</h3>
      </div>

      <div className="space-y-3">
        {mentors.map((mentor, i) => (
          <div
            key={mentor.id}
            className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-secondary/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-mono text-xs font-bold">
              {mentor.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{mentor.name}</p>
              <p className="text-xs text-muted-foreground">{mentor.specialty}</p>
            </div>
            <div className="flex items-center gap-1">
              <Award className={`h-4 w-4 ${badgeColors[Math.min(i, 2)]}`} />
              <span className="text-xs font-mono font-bold">{mentor.badges}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
