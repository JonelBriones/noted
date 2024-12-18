import Link from "next/link";
import React from "react";

interface PrimaryBtnInterface {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  url?: string;
  padding?: string;
  setToggleModal?: any;
  deleteNote?: () => {};
}

const PrimaryBtn = ({
  text,
  textColor,
  backgroundColor,
  url,
  padding,
  setToggleModal,
  deleteNote,
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
          onClick={() => setToggleModal(false)}
          className={`block text-center p-2 ${textColor} ${backgroundColor} rounded-lg text-sm font-medium cursor-pointer ${padding}`}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default PrimaryBtn;
