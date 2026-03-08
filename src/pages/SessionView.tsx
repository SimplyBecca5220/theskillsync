import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Video, Send, Bot, User, CheckCircle2, Loader2 } from "lucide-react";
import { getRequestById, resolveRequest } from "@/lib/store";
import { UrgencyBadge } from "@/components/UrgencyBadge";
import { Confetti } from "@/components/Confetti";
import { Certificate } from "@/components/Certificate";

interface ChatMessage {
  id: number;
  sender: "mentor" | "learner";
  text: string;
}

export default function SessionView() {
  const { id } = useParams<{ id: string }>();
  const { data: request, isLoading } = useQuery({
    queryKey: ["help-request", id],
    queryFn: () => getRequestById(id!),
    enabled: !!id,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [resolved, setResolved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize messages once request loads
  if (request && !initialized) {
    setMessages([
      { id: 1, sender: "learner", text: request.description },
      { id: 2, sender: "mentor", text: "Hi! I just claimed your request. Let me take a look at what you're working on." },
    ]);
    setResolved(request.resolved);
    setInitialized(true);
  }

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground mb-4">Session not found.</p>
        <Button variant="outline" asChild>
          <Link to="/mentor-board"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Board</Link>
        </Button>
      </div>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "mentor", text: input.trim() },
    ]);
    setInput("");
  };

  const handleResolve = async () => {
    await resolveRequest(request.id);
    setShowConfetti(true);
    setResolved(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="container py-10 max-w-4xl">
      <Confetti active={showConfetti} />

      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/mentor-board"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-mono font-bold text-xl">{request.topic} Session</h1>
            <UrgencyBadge level={request.urgency as "low" | "medium" | "high"} />
            {resolved && (
              <span className="inline-flex items-center gap-1 rounded-full bg-low/15 border border-low/30 px-2.5 py-0.5 text-xs font-mono font-semibold text-low">
                <CheckCircle2 className="h-3 w-3" /> Resolved
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">with {request.learner_name}</p>
        </div>
        {!resolved && (
          <Button variant="hero" size="sm" onClick={handleResolve}>
            <CheckCircle2 className="h-4 w-4 mr-1" /> Mark as Resolved
          </Button>
        )}
      </div>

      {resolved && (
        <div className="mb-8">
          <Certificate request={request} mentorName="You" />
        </div>
      )}

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 mb-6 flex items-center gap-3">
        <Video className="h-5 w-5 text-primary" />
        <div className="flex-1">
          <p className="text-sm font-medium">Meeting Link</p>
          <p className="text-xs text-muted-foreground font-mono">https://meet.skillsync.dev/session-{request.id.slice(0, 8)}</p>
        </div>
        <Button variant="claim" size="sm">Join Call</Button>
      </div>

      <div className="rounded-xl border border-border bg-card card-glow overflow-hidden">
        <div className="h-[400px] overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === "mentor" ? "justify-end" : ""}`}>
              {msg.sender === "learner" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
              <div className={`max-w-[70%] rounded-xl px-4 py-3 text-sm ${
                msg.sender === "mentor"
                  ? "bg-primary/10 text-foreground border border-primary/20"
                  : "bg-secondary text-secondary-foreground"
              }`}>
                {msg.text}
              </div>
              {msg.sender === "mentor" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4 flex gap-3">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="bg-secondary/50 border-border"
            disabled={resolved}
          />
          <Button variant="hero" size="icon" onClick={handleSend} disabled={resolved}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
