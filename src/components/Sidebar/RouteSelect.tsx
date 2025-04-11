import React, { useState, useEffect } from "react";
import { IconType } from "react-icons";
import {
  FiMessageSquare,
  FiHome,
  FiPieChart,
  FiBox,
  FiLogOut,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

export const RouteSelect = ({
  onRouteChange,
}: {
  onRouteChange: (route: string) => void;
}) => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router for redirection

  // Retrieve user from sessionStorage
  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user") || "{}")
      : null;

  // Set the default route based on the user role
  useEffect(() => {
    if (user?.role === "employee") {
      setSelectedRoute("All products"); // Default for employee
    } else if (user?.role === "manager") {
      setSelectedRoute("Inventory"); // Default for manager
    }
  }, [user]); // Run when the user role changes

  // If no user or selectedRoute is null, return loading state
  if (selectedRoute === null) {
    return <div>Loading...</div>; // Loading state while the user data is being processed
  }

  // Handle route changes
  const handleRouteChange = (route: string) => {
    setSelectedRoute(route); // Update the selected route
    onRouteChange(route); // Callback to the parent to update the route

    // Handle logout action
    if (route === "Log out") {
      sessionStorage.clear();
      router.push("/login"); // Redirect to login after logout
    }
  };

  return (
    <div className="space-y-1">
      {user?.role === "manager" && (
        <Route
          Icon={FiHome}
          selected={selectedRoute === "Inventory"}
          title="Inventory"
          onClick={() => handleRouteChange("Inventory")}
        />
      )}
      {user?.role === "manager" && (
        <Route
          Icon={FiPieChart}
          selected={selectedRoute === "Analytics"}
          title="Analytics"
          onClick={() => handleRouteChange("Analytics")}
        />
      )}
      {/* All users can access the "All products" page */}
      <Route
        Icon={FiBox}
        selected={selectedRoute === "All products"}
        title="All products"
        onClick={() => handleRouteChange("All products")}
      />
      {/* Show route for customers feedback */}
      <Route
        Icon={FiMessageSquare}
        selected={selectedRoute === "Customers Feedback"}
        title="Customers Feedback"
        onClick={() => handleRouteChange("Customers Feedback")}
      />
      {/* Log out route */}
      <Route
        Icon={FiLogOut}
        selected={selectedRoute === "Log out"}
        title="Log out"
        onClick={() => handleRouteChange("Log out")}
      />
    </div>
  );
};

// Route Component
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
