import React from "react";

interface PrimaryBtnInterface {
  text: string;
}

const PrimaryBtn = ({ text }: PrimaryBtnInterface) => {
  return (
    <div className="w-full text-center p-2 bg-blue-700 rounded-lg text-white text-sm font-medium">
      {text}
    </div>
  );
};

export default PrimaryBtn;
