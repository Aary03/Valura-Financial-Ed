"use client";

import { useEffect } from "react";
import { useProgress } from "@/lib/atlas/progress";

/** Records the current lesson as "last visited" so /learn can resume here. */
export default function TrackVisit({ id }: { id: string }) {
  const setLastVisited = useProgress((s) => s.setLastVisited);
  useEffect(() => setLastVisited(id), [id, setLastVisited]);
  return null;
}
