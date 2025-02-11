import { create } from 'zustand';

interface DashboardStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
})); 