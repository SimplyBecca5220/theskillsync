import { supabase } from "@/integrations/supabase/client";

export type UrgencyLevel = "low" | "medium" | "high";

export interface HelpRequest {
  id: string;
  topic: string;
  description: string;
  urgency: UrgencyLevel;
  created_at: string;
  claimed_by: string | null;
  learner_name: string;
  resolved: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  badges: number;
  specialty: string;
}

const mentors: Mentor[] = [
  { id: "m1", name: "Priya Sharma", avatar: "PS", badges: 12, specialty: "React" },
  { id: "m2", name: "Marcus Johnson", avatar: "MJ", badges: 9, specialty: "Python" },
  { id: "m3", name: "Elena Volkov", avatar: "EV", badges: 7, specialty: "TypeScript" },
  { id: "m4", name: "David Park", avatar: "DP", badges: 5, specialty: "Rust" },
  { id: "m5", name: "Amira Hassan", avatar: "AH", badges: 4, specialty: "Go" },
];

export function getMentors() {
  return [...mentors];
}

export async function fetchRequests(): Promise<HelpRequest[]> {
  const { data, error } = await supabase
    .from("help_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as HelpRequest[];
}

export async function addRequest(
  topic: string,
  description: string,
  urgency: UrgencyLevel,
  learnerName: string
) {
  const { data, error } = await supabase
    .from("help_requests")
    .insert({ topic, description, urgency, learner_name: learnerName })
    .select()
    .single();
  if (error) throw error;
  return data as HelpRequest;
}

export async function claimRequest(requestId: string, mentorName: string) {
  const { error } = await supabase
    .from("help_requests")
    .update({ claimed_by: mentorName })
    .eq("id", requestId);
  if (error) throw error;
}

export async function resolveRequest(requestId: string) {
  const { error } = await supabase
    .from("help_requests")
    .update({ resolved: true })
    .eq("id", requestId);
  if (error) throw error;
}

export async function getRequestById(id: string): Promise<HelpRequest | null> {
  const { data, error } = await supabase
    .from("help_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as HelpRequest | null;
}
