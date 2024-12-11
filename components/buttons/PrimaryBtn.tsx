import React from "react";

interface PrimaryBtnInterface {
  text: string;
  textColor?: string;
  backgroundColor?: string;
}

const PrimaryBtn = ({
  text,
  textColor,
  backgroundColor,
}: PrimaryBtnInterface) => {
  return (
    <div
      className={`block h text-center p-2 ${textColor} ${backgroundColor} rounded-lg text-white text-sm font-medium cursor-pointer`}
    >
      {text}
    </div>
  );
};

export default PrimaryBtn;
