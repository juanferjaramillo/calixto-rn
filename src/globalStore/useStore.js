import { create } from "zustand";

export const useStore = create((set) => ({
  userAuth: 1,
  setUserLogin: (uId) => set((state) => ({ userAuth: uId })),
  prods: [],
  setUserProds: (pr) => set((state) => ({ prods: pr })),
  filteredProds: [],
  setFilteredProds: (pr) => set((state) => ({filteredProds: pr})),
  bg: "lightblue",
  setDarkBg: () => set((state) => ({ bg: "tomato" })),
  setLightBg: () => set((state) => ({ bg: "lightblue" })),
}));
