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
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileTags, setShowMobileTags] = useState(false);
  const [showMobileView, setShowMobileView] = useState(true);

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
        showMobileSearch,
        setShowMobileSearch,
        showMobileTags,
        setShowMobileTags,
        showMobileView,
        setShowMobileView,
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
