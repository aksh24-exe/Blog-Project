"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      toggleTheme: () => set({ isDarkMode: !get().isDarkMode }),
    }),
    {
      name: "theme-storage", // key in localStorage
    }
  )
);
