// src/components/Inventory/InventoryPage.tsx

import React from "react";
import { StatCards } from "./StatCards";
import { ActivityGraph } from "./ActivityGraph";
import { StockAlerts } from "./StockAlerts";
import { RecentInventoryActivity } from "./RecentInventoryActivity";
import { ProductRadar } from "./ProductRadar";
import { UsageRadar } from "../Dashboard/UsageRadar";

interface InventoryPageProps {
  isManager: boolean;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ isManager }) => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      {isManager && <StatCards />}
      {isManager && <ActivityGraph />}
      {isManager && <ProductRadar />}
      {isManager && <StockAlerts />}
      {isManager && <UsageRadar />}
      <RecentInventoryActivity />
    </div>
  );
};

export default InventoryPage;
