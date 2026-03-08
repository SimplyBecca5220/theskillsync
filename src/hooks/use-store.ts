import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRequests, getMentors } from "@/lib/store";

export function useRequests() {
  return useQuery({
    queryKey: ["help-requests"],
    queryFn: fetchRequests,
    refetchInterval: 5000, // poll every 5s for live updates
  });
}

export function useInvalidateRequests() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["help-requests"] });
}

export function useMentors() {
  return getMentors();
}
