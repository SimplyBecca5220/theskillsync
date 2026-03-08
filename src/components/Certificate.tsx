import { Award, Cpu, Calendar, BookOpen } from "lucide-react";
import { format } from "date-fns";
import type { HelpRequest } from "@/lib/store";

interface CertificateProps {
  request: HelpRequest;
  mentorName: string;
}

export function Certificate({ request, mentorName }: CertificateProps) {
  return (
    <div className="animate-scale-in">
      <div className="relative rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-8 sm:p-10 card-glow overflow-hidden">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/40 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/40 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/40 rounded-br-2xl" />

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-3">
            <Cpu className="h-5 w-5 text-primary" />
            <span className="font-mono text-sm text-primary tracking-widest uppercase">SkillSync</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold gradient-text mb-1">
            Certificate of Completion
          </h2>
          <p className="text-xs text-muted-foreground font-mono">Proof-of-Learning Verified</p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <Award className="h-6 w-6 text-badge-gold" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="text-center space-y-4 mb-8">
          <p className="text-sm text-muted-foreground">This certifies that</p>
          <p className="text-xl font-mono font-bold text-foreground">{request.learnerName}</p>
          <p className="text-sm text-muted-foreground">successfully completed a mentorship session on</p>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-mono font-semibold text-primary">{request.topic}</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            "{request.description}"
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Mentor</p>
            <p className="text-sm font-mono font-medium">{mentorName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
              <Calendar className="h-3 w-3" /> Issued
            </p>
            <p className="text-sm font-mono font-medium">{format(new Date(), "MMM d, yyyy")}</p>
          </div>
        </div>

        {/* Certificate ID */}
        <p className="text-center mt-4 text-[10px] font-mono text-muted-foreground/50 tracking-widest">
          CERT-{request.id.slice(-4).toUpperCase()}-{Date.now().toString(36).toUpperCase()}
        </p>
      </div>
    </div>
  );
}
