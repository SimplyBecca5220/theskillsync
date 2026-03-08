import { useSyncExternalStore, useCallback } from "react";
import { getRequests, getMentors, subscribe } from "@/lib/store";

export function useRequests() {
  return useSyncExternalStore(
    subscribe,
    getRequests,
    getRequests
  );
}

export function useMentors() {
  return getMentors();
}
