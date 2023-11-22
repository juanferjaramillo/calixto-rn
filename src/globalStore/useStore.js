import { create } from "zustand";

export const useStore = create((set) => ({
  userAuth: null,
  setUserLogin: (uId) => set((state) => ({ userAuth: uId })),
  filteredProds: [],
  setFilteredProds: (pr) => set((state) => ({ filteredProds: pr })),
  // prods: [],
  // setUserProds: (pr) => set((state) => ({ prods: pr })),
  // categs: [],
  // setCategs: (cat) => set((state) => ({ categs: cat })),

  bg: "lightblue",
  setDarkBg: () => set((state) => ({ bg: "tomato" })),
  setLightBg: () => set((state) => ({ bg: "lightblue" })),
}));
