"use client";
import { createContext, useContext } from "react";
export const IntakeContext = createContext({ service: () => {}, bid: () => {} });
export function useRequestService() { return useContext(IntakeContext).service; }
export function useRequestBid() { return useContext(IntakeContext).bid; }
