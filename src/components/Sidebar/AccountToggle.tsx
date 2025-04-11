import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const AccountToggle = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Get user role from sessionStorage (or any other method you're using to store user data)
    const user =
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("user") || "{}")
        : null;
    if (user) {
      setUserRole(user.role); // Set user role to state (either 'employee' or 'manager')
    }
  }, []);

  // Conditionally render the access message and the avatar SVG based on the role
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src={
            userRole === "employee"
              ? "https://api.dicebear.com/9.x/thumbs/svg?flip=false" // Employee avatar SVG
              : "https://api.dicebear.com/9.x/notionists/svg" // Manager avatar SVG
          }
          alt="avatar"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">
            {userRole === "employee" ? "Employee Access" : "Manager Access"}
          </span>
        </div>
        {/* Optionally add a chevron down/up icon here if needed */}
        {/* <FiChevronDown className="ml-2" /> */}
      </button>
    </div>
  );
};
