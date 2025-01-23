"use client";
import { updateSettings } from "@/app/_actions/updateSettings";
import Image from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppContext } from "../Providers";

const FontTheme = () => {
  const { settings } = useAppContext();
  const [toggleFontTheme, setToggleFontTheme] = useState(settings.fontTheme);
  const fontTheme = ["sans-serif", "serif", "monospace"];

  return (
    <div>
      <h1>Choose your font theme:</h1>
      <div className="flex flex-col gap-4 mt-6">
        {fontTheme.map((font) => (
          <button
            key={font}
            className={`flex gap-4 border border-neutral-200 p-4 rounded-xl place-items-center ${
              font == toggleFontTheme ? "bg-neutral-100" : ""
            }`}
            onClick={() => {
              setToggleFontTheme(font), updateSettings({ fontTheme: font });
            }}
          >
            <div className="flex place-items-center justify-center rounded-xl border-2 border-neutral-200 h-[40px] w-[40px] bg-white">
              <Image
                src={`/images/icon-font-${font}.svg`}
                width={0}
                height={0}
                alt={`icon-${font}`}
                className="size-[24px]"
              />
            </div>
            <div className="flex flex-col justify-center flex-1 place-items-start">
              <h4 className="text-sm">
                {font.charAt(0).toUpperCase() + font.slice(1)}
              </h4>
              <p className="text-xs text-neutral-700">
                Clean and modern, easy to read.
              </p>
            </div>
            <div
              className={twMerge(
                "size-[16px] rounded-full border border-neutral-300",
                font == toggleFontTheme
                  ? "border-blue-500 border-4 bg-white"
                  : "border-neutral-300"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontTheme;
