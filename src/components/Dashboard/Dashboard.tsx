import React from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid";

export const Dashboard = ({ selectedRoute }: { selectedRoute: string }) => {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user") || "{}")
      : {};

  const isManager = user?.role === "manager";

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar user={user} /> {/* Pass the user object to TopBar */}
      {selectedRoute === "Analytics" ? (
        <Grid isManager={isManager} /> // Render Grid for Analytics route
      ) : (
        <div>
          {" "}
          {/* You can render other content for different routes if necessary */}{" "}
        </div>
      )}
    </div>
  );
};
