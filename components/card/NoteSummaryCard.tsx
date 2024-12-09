import React from "react";

const NoteSummaryCard = () => {
  return (
    <div className="flex flex-col gap-3 p-2 rounded-md bg-neutral-100">
      <h1 className="font-bold text-black">React Performance Optimization</h1>
      <div className="flex gap-2 text-neutral-950 text-xs">
        <span className="flex place-items-center bg-neutral-200 px-2 py-1 rounded-md">
          Dev
        </span>
        <span className="flex place-items-center bg-neutral-200 px-2 py-1 rounded-md">
          React
        </span>
      </div>

      <span className="text-neutral-700 text-xs">29 Oct 2024</span>
    </div>
  );
};

export default NoteSummaryCard;
