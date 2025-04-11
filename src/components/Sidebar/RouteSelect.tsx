import React, { useEffect } from "react";
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
  selectedRoute,
  onRouteChange,
}: {
  selectedRoute: string;
  onRouteChange: (route: string) => void;
}) => {
  const router = useRouter();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user") || "{}")
      : null;

  const handleRouteChange = (route: string) => {
    onRouteChange(route);

    if (route === "Log out") {
      sessionStorage.clear();
      router.push("/login");
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
      <Route
        Icon={FiBox}
        selected={selectedRoute === "All products"}
        title="All products"
        onClick={() => handleRouteChange("All products")}
      />
      <Route
        Icon={FiMessageSquare}
        selected={selectedRoute === "Customers Feedback"}
        title="Customers Feedback"
        onClick={() => handleRouteChange("Customers Feedback")}
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
