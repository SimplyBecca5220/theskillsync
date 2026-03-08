import { Link, useLocation } from "react-router-dom";
import { Cpu, BookOpen, Users, Zap } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Zap },
  { to: "/dashboard", label: "Learner", icon: BookOpen },
  { to: "/mentor-board", label: "Mentors", icon: Users },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-mono font-bold text-lg">
          <Cpu className="h-6 w-6 text-primary" />
          <span className="gradient-text">SkillSync</span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
