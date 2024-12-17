import Link from "next/link";
import React from "react";

interface PrimaryBtnInterface {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  url?: string;
}

const PrimaryBtn = ({
  text,
  textColor,
  backgroundColor,
  url,
}: PrimaryBtnInterface) => {
  return (
    <>
      {url ? (
        <Link
          href={url}
          className={`block text-center p-2 ${textColor} ${backgroundColor} rounded-lg text-white text-sm font-medium cursor-pointer`}
        >
          {text}
        </Link>
      ) : (
        <button
          className={`block text-center p-2 ${textColor} ${backgroundColor} rounded-lg text-sm font-medium cursor-pointer`}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default PrimaryBtn;
