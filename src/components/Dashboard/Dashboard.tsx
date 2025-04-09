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
      <TopBar user={user} />
      {selectedRoute === "Analytics" ? (
        <Grid isManager={isManager} /> //Analytics for manager only
      ) : (
        <div> {/* Features displayed based on the access permission */} </div>
      )}
    </div>
  );
};
