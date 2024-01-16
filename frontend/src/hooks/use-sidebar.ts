import { create } from "zustand";

interface SidebarStore {
  isFull: boolean;
  isDisplay: boolean;
  toggleIsFull: () => void;
  toggleIsDisplay: () => void;
}

const useSidebar = create<SidebarStore>((set) => ({
  isFull: true,
  isDisplay: false,
  toggleIsFull: () => set((state) => ({ isFull: !state.isFull })),
  toggleIsDisplay: () => set((state) => ({ isDisplay: !state.isDisplay })),
}));

export default useSidebar;
