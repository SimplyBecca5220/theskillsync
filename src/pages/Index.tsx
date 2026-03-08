import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Shield, Zap, Code2, GitBranch } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Proof-of-Learning",
    description: "Every session is tracked. Mentors earn badges, learners build verified skill trees.",
  },
  {
    icon: Users,
    title: "Peer Matching",
    description: "Get matched with mentors who've solved your exact blocker before.",
  },
  {
    icon: Shield,
    title: "Quality First",
    description: "Rated sessions and mentor reputation ensure high-quality help every time.",
  },
];

export default function Index() {
  return (
    <div className="relative">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Hero */}
      <section className="relative container flex flex-col items-center justify-center min-h-[85vh] text-center py-20">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-8">
            <Zap className="h-3.5 w-3.5 text-primary animate-pulse-glow" />
            <span className="text-xs font-mono text-primary">Peer-to-Peer Developer Mentorship</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-mono font-bold tracking-tight mb-6">
            Learn by <span className="gradient-text">proving</span>
            <br />
            you learned.
          </h1>

          <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed">
            SkillSync connects developers who need help with mentors who've been there.
            Every session builds your <span className="text-primary font-medium">Proof-of-Learning</span> profile.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/dashboard">
                Request Help <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/mentor-board">
                Browse Requests <Code2 className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 opacity-20">
          <GitBranch className="h-32 w-32 text-primary" />
        </div>
        <div className="absolute bottom-1/4 right-10 opacity-10">
          <Code2 className="h-40 w-40 text-accent" />
        </div>
      </section>

      {/* Features */}
      <section className="relative container py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-8 card-glow"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-mono font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative container pb-20">
        <div className="rounded-xl border border-border bg-card p-10 text-center card-glow">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: "2.4K+", label: "Sessions Completed" },
              { value: "380+", label: "Active Mentors" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-mono font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
