"use client";

import { useState } from "react";
import { AvailabilityCheck } from "@/components/blocks/AvailabilityCheck";
import { Icon } from "@/components/ui/Icon";
import styles from "./concept-two.module.css";

/** Reuse the existing homeowner prototype without changing its shared trigger. */
export function RequestServiceButton({ label, compact = false }: { label: string; compact?: boolean }) {
  const [openSignal, setOpenSignal] = useState(0);
  return (
    <>
      <button type="button" className={`${styles.button} ${styles.primary} ${compact ? styles.compact : ""}`} onClick={() => setOpenSignal((signal) => signal + 1)}>
        {label}
        {!compact && <Icon name="arrow-right" size={20} />}
      </button>
      <AvailabilityCheck hideTrigger openSignal={openSignal} />
    </>
  );
}
