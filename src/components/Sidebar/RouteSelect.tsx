import React, { useState } from "react";
import { IconType } from "react-icons";
import {
  FiDollarSign,
  FiHome,
  FiPieChart,
  FiPaperclip,
  FiBox,
  FiLogOut,
} from "react-icons/fi";
import { useRouter } from "next/navigation"; // Import useRouter

export const RouteSelect = ({
  onRouteChange,
}: {
  onRouteChange: (route: string) => void;
}) => {
  const [selectedRoute, setSelectedRoute] = useState("Inventory");
  const router = useRouter(); // Initialize the router for redirection

  const handleRouteChange = (route: string) => {
    setSelectedRoute(route); // Set the new selected route
    onRouteChange(route); // Notify the parent component

    // Handle logout action
    if (route === "Log out") {
      // Clear the user session
      sessionStorage.clear();

      // Redirect to the login page
      router.push("/login"); // Redirect to the login page after logging out
    }
  };

  return (
    <div className="space-y-1">
      <Route
        Icon={FiHome}
        selected={selectedRoute === "Inventory"}
        title="Inventory"
        onClick={() => handleRouteChange("Inventory")}
      />
      <Route
        Icon={FiBox}
        selected={selectedRoute === "All products"}
        title="All products"
        onClick={() => handleRouteChange("All products")}
      />
      <Route
        Icon={FiPieChart}
        selected={selectedRoute === "Analytics"}
        title="Analytics"
        onClick={() => handleRouteChange("Analytics")}
      />
      <Route
        Icon={FiDollarSign}
        selected={selectedRoute === "Finance"}
        title="Finance"
        onClick={() => handleRouteChange("Finance")}
      />
      <Route
        Icon={FiLogOut}
        selected={selectedRoute === "Log out"}
        title="Log out"
        onClick={() => handleRouteChange("Log out")}
      />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  onClick,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};
