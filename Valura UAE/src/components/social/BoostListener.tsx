"use client";

import { useEffect, useRef } from "react";
import { consumePendingBoostToasts } from "@/app/actions/social";
import { useToastStore } from "@/lib/game/store";

interface BoostListenerProps {
  locale: string;
}

/**
 * Runs once after auth shell loads and surfaces friend-boost payloads as toasts.
 */
export default function BoostListener({ locale }: BoostListenerProps) {
  const addToast = useToastStore((s) => s.addToast);
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;
    void consumePendingBoostToasts().then((rows) => {
      const isAr = locale === "ar";
      rows.forEach((r) =>
        addToast({
          type:   "boost",
          amount: r.coins,
          label:
            `${r.stickerKey} ` +
            (isAr
              ? `دفعة من ${r.senderName}`
              : `Boost from ${r.senderName}`),
        }),
      );
    });
  }, [addToast, locale]);

  return null;
}
