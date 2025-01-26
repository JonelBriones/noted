"use client";
import { Note } from "@/app/_types/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<any>(undefined);

const ContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [settings, setSettings] = useState({
    colorTheme: "Light Mode",
    fontTheme: "sans-serif",
    password: "",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [viewToggledNote, setViewToggledNote] = useState<Note | undefined>(
    undefined
  );

  useEffect(() => {
    if (settings.colorTheme) {
      setDarkMode(settings?.colorTheme == "Dark Mode" ? true : false);
    }
  }, [settings]);

  return (
    <ThemeContext.Provider
      value={{
        search,
        setSearch,
        viewToggledNote,
        setViewToggledNote,
        settings,
        setSettings,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ContextWrapper;

export function useAppContext() {
  return useContext(ThemeContext);
}
