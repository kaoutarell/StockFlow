import React from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid";
import AllProductsPage from "../AllProducts/page";
import InventoryPage from "../Inventory/page";
import { CustomersFeedback } from "../CustomersFeedback/page";

export const Dashboard = ({ selectedRoute }: { selectedRoute: string }) => {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user") || "{}")
      : {};

  const isManager = user?.role === "manager";

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar user={user} />
      {/* Ensure that selectedRoute matches one of the expected routes */}
      {selectedRoute === "Analytics" && <Grid isManager={isManager} />}
      {selectedRoute === "Inventory" && <InventoryPage isManager={isManager} />}
      {selectedRoute === "All products" && <AllProductsPage />}
      {selectedRoute === "Customers Feedback" && <CustomersFeedback />}
    </div>
  );
};
