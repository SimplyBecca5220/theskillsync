import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2 } from "lucide-react";
import { addRequest, type UrgencyLevel } from "@/lib/store";
import { MentorLeaderboard } from "@/components/MentorLeaderboard";
import { useInvalidateRequests } from "@/hooks/use-store";
import { toast } from "sonner";

const topics = ["React", "Python", "TypeScript", "Rust", "Go", "Node.js", "CSS", "SQL", "Docker", "Other"];

export default function Dashboard() {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState<UrgencyLevel>("medium");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const invalidate = useInvalidateRequests();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !description.trim() || !name.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await addRequest(topic, description.trim(), urgency, name.trim());
      invalidate();
      toast.success("Request submitted! A mentor will pick it up soon.");
      setSubmitted(true);
      setTimeout(() => {
        setTopic("");
        setDescription("");
        setUrgency("medium");
        setName("");
        setSubmitted(false);
      }, 2000);
    } catch {
      toast.error("Failed to submit request. Try again.");
    }
  };

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold mb-2">Learner Dashboard</h1>
        <p className="text-muted-foreground">Submit a request and get matched with a mentor.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-8 card-glow space-y-6">
            <h2 className="font-mono font-semibold text-lg flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Request Help
            </h2>

            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" placeholder="e.g., Alex Chen" value={name} onChange={(e) => setName(e.target.value)} className="bg-secondary/50 border-border" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Technical Topic</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Select a topic..." />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description of Blocker</Label>
              <Textarea id="description" placeholder="Describe what you're stuck on..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="bg-secondary/50 border-border resize-none" />
            </div>

            <div className="space-y-2">
              <Label>Urgency Level</Label>
              <div className="flex gap-3">
                {(["low", "medium", "high"] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setUrgency(level)}
                    className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-mono font-medium capitalize transition-all ${
                      urgency === level
                        ? level === "high" ? "border-urgent bg-urgent/10 text-urgent"
                          : level === "medium" ? "border-medium bg-medium/10 text-medium"
                          : "border-low bg-low/10 text-low"
                        : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" variant="hero" className="w-full" disabled={submitted}>
              {submitted ? (
                <><CheckCircle2 className="h-4 w-4 mr-1" /> Submitted!</>
              ) : (
                <>Submit Request <Send className="h-4 w-4 ml-1" /></>
              )}
            </Button>
          </form>
        </div>

        <div>
          <MentorLeaderboard />
        </div>
      </div>
    </div>
  );
}
