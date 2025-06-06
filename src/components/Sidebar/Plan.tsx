import React from "react";
import { FiLifeBuoy } from "react-icons/fi";

export const Plan = () => {
  return (
    <div className="flex sticky top-[calc(100vh_-_48px_-_16px)] flex-col h-12 border-t px-2 border-stone-300 justify-end text-xs">
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-1.5 px-2 py-1.5 font-medium bg-stone-200 hover:bg-stone-300 transition-colors rounded">
          <FiLifeBuoy className="text-sm" /> Support
        </button>
      </div>
    </div>
  );
};
