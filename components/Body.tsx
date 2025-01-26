"use client";
import React from "react";
import MobileNavbar from "./mobile/MobileNavbar";

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" id="dark">
      <body className="mx-auto flex flex-col h-screen px-6 dark:bg-stone-900  dark:text-neutral-200 relative">
        {children}
        <MobileNavbar />
      </body>
    </html>
  );
};

export default Body;
