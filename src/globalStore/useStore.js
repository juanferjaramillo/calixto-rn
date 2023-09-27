import { create } from "zustand";

export const useStore = create((set) => ({
  bg: "lightblue",
  darkBg: () => set((state) => ({ bg: "tomato" })),
  lightBg: () => set((state) => ({ bg: "lightblue" })),
}));
