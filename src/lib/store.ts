export type UrgencyLevel = "low" | "medium" | "high";

export interface HelpRequest {
  id: string;
  topic: string;
  description: string;
  urgency: UrgencyLevel;
  createdAt: Date;
  claimedBy: string | null;
  learnerName: string;
}

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  badges: number;
  specialty: string;
}

// In-memory store (no backend)
let requests: HelpRequest[] = [
  {
    id: "1",
    topic: "React",
    description: "Struggling with useEffect cleanup functions and memory leaks in my component.",
    urgency: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
    claimedBy: null,
    learnerName: "Alex Chen",
  },
  {
    id: "2",
    topic: "Python",
    description: "Need help understanding async/await patterns with aiohttp.",
    urgency: "medium",
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
    claimedBy: null,
    learnerName: "Sarah Kim",
  },
  {
    id: "3",
    topic: "TypeScript",
    description: "Can't figure out generic constraints with conditional types.",
    urgency: "low",
    createdAt: new Date(Date.now() - 1000 * 60 * 120),
    claimedBy: null,
    learnerName: "Jordan Lee",
  },
];

const mentors: Mentor[] = [
  { id: "m1", name: "Priya Sharma", avatar: "PS", badges: 12, specialty: "React" },
  { id: "m2", name: "Marcus Johnson", avatar: "MJ", badges: 9, specialty: "Python" },
  { id: "m3", name: "Elena Volkov", avatar: "EV", badges: 7, specialty: "TypeScript" },
  { id: "m4", name: "David Park", avatar: "DP", badges: 5, specialty: "Rust" },
  { id: "m5", name: "Amira Hassan", avatar: "AH", badges: 4, specialty: "Go" },
];

let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function getRequests() {
  return [...requests];
}

export function getMentors() {
  return [...mentors];
}

export function addRequest(topic: string, description: string, urgency: UrgencyLevel, learnerName: string) {
  const req: HelpRequest = {
    id: Date.now().toString(),
    topic,
    description,
    urgency,
    createdAt: new Date(),
    claimedBy: null,
    learnerName,
  };
  requests = [req, ...requests];
  notify();
  return req;
}

export function claimRequest(requestId: string, mentorName: string) {
  requests = requests.map((r) =>
    r.id === requestId ? { ...r, claimedBy: mentorName } : r
  );
  notify();
}

export function getRequestById(id: string) {
  return requests.find((r) => r.id === id) || null;
}
