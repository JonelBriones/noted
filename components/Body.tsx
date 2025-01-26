"use client";
import React, { useEffect, useState } from "react";
import MobileNavbar from "./mobile/MobileNavbar";
import { useAppContext } from "./Providers";

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" id="dark">
      <body className="mx-auto flex flex-col h-screen px-6 relative dark:bg-stone-900  dark:text-neutral-200">
        {children}
        <MobileNavbar />
      </body>
    </html>
  );
};

export default Body;
