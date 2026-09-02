"use client";

import { createContext, useContext } from "react";

export type InvitationPhase = "sealed" | "opening" | "card" | "revealed";

export interface InvitationState {
  phase: InvitationPhase;
  isRevealed: boolean;
  open: () => void;
  skip: () => void;
  /** True when the guest watched the animation this visit — used to fire confetti once. */
  justOpened: boolean;
}

export const InvitationContext = createContext<InvitationState>({
  phase: "revealed",
  isRevealed: true,
  open: () => {},
  skip: () => {},
  justOpened: false,
});

export function useInvitation(): InvitationState {
  return useContext(InvitationContext);
}
