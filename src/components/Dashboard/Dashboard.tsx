import React from "react";
import { TopBar } from "./TopBar";
import { Grid } from "./Grid";
//import { AisleManagement } from "../StoreLayout/AisleManagement";
import AllProductsPage from "../AllProducts/page";
import InventoryPage from "../Inventory/page";

export const Dashboard = ({ selectedRoute }: { selectedRoute: string }) => {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("user") || "{}")
      : {};

  const isManager = user?.role === "manager";

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar user={user} />
      {selectedRoute === "Analytics" && <Grid isManager={isManager} />}
      {/* {selectedRoute === "Store Layout" && <AisleManagement />} */}
      {selectedRoute === "Inventory" && <InventoryPage isManager={isManager} />}
      {selectedRoute === "All products" && <AllProductsPage />}
      {selectedRoute === "Finance" && <div>Finance Page</div>}
    </div>
  );
};
