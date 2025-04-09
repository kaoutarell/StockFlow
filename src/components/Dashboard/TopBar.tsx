import React from "react";
import { FiCalendar } from "react-icons/fi";

interface TopBarProps {
  user: { username: string };
}

export const TopBar = ({ user }: TopBarProps) => {
  // Get the current date and time
  const currentDate = new Date();

  // Format the current date
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Format the current time
  const formattedTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">
            🚀 Good morning, {user?.username || "Guest"}!
          </span>
          <span className="text-xs block text-stone-500">
            {formattedDate} at {formattedTime}
          </span>
        </div>

        {/* <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
          <FiCalendar />
          <span>Prev 6 Months</span>
        </button> */}
      </div>
    </div>
  );
};
