import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, HandHelping, MessageSquare, Loader2 } from "lucide-react";
import { useRequests, useInvalidateRequests } from "@/hooks/use-store";
import { claimRequest } from "@/lib/store";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { MentorLeaderboard } from "@/components/MentorLeaderboard";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

export default function MentorBoard() {
  const { data: requests = [], isLoading } = useRequests();
  const invalidate = useInvalidateRequests();
  const navigate = useNavigate();
  const openRequests = requests.filter((r) => !r.claimed_by && !r.resolved);
  const claimedRequests = requests.filter((r) => r.claimed_by);

  const handleClaim = async (id: string) => {
    await claimRequest(id, "You");
    invalidate();
    toast.success("Request claimed! Opening session...");
    setTimeout(() => navigate(`/session/${id}`), 500);
  };

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold mb-2">Mentor Board</h1>
        <p className="text-muted-foreground">Active help requests from learners.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {isLoading && (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            </div>
          )}

          {!isLoading && openRequests.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-12 text-center card-glow">
              <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No open requests right now.</p>
            </div>
          )}

          {openRequests.map((req) => (
            <div key={req.id} className="rounded-xl border border-border bg-card p-6 card-glow">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-semibold text-primary">{req.topic}</span>
                    <UrgencyBadge level={req.urgency as "low" | "medium" | "high"} />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(req.created_at), { addSuffix: true })} · by {req.learner_name}
                  </p>
                </div>
                <Button variant="claim" size="sm" onClick={() => handleClaim(req.id)}>
                  <HandHelping className="h-4 w-4 mr-1" /> Claim
                </Button>
              </div>
              <p className="text-sm text-secondary-foreground leading-relaxed">{req.description}</p>
            </div>
          ))}

          {claimedRequests.length > 0 && (
            <>
              <h3 className="font-mono text-sm text-muted-foreground mt-8 mb-2">Claimed Requests</h3>
              {claimedRequests.map((req) => (
                <div key={req.id} className="rounded-xl border border-border bg-card/50 p-6 opacity-60">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-semibold">{req.topic}</span>
                    <span className="text-xs text-primary font-mono">⬡ Claimed by {req.claimed_by}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{req.description}</p>
                </div>
              ))}
            </>
          )}
        </div>

        <div>
          <MentorLeaderboard />
        </div>
      </div>
    </div>
  );
}
