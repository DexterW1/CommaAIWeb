import { create } from "zustand";
import { presist } from "zustand/middleware";
export const useDeviceStore = create((set) => ({
  isMobile: false,
  setMobile: () => set({ isMobile: true }),
  setDesktop: () => set({ isMobile: false }),
}));
