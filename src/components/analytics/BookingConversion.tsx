"use client";

import { useEffect } from "react";
import { trackConfirmedBooking } from "@/lib/google-ads";

export function BookingConversion() {
  useEffect(() => { trackConfirmedBooking(); }, []);
  return null;
}
