// src/components/Inventory/page.tsx

import React from "react";
import InventoryPage from "./InventoryPage";

export const InventoryPageWrapper = ({ isManager }: { isManager: boolean }) => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <InventoryPage isManager={isManager} />
    </div>
  );
};

export default InventoryPageWrapper;
