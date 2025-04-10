import React from "react";

export const RecentInventoryActivity = () => {
  return (
    <div className="col-span-12 rounded border border-stone-300">
      <div className="p-4">
        <h3 className="font-medium">Recent Inventory Activity</h3>
      </div>
      <div className="px-4 py-2">
        <ul>
          <li>Product "Item A" added to inventory</li>
          <li>Product "Item B" removed from inventory</li>
          <li>Product "Item C" restocked</li>
        </ul>
      </div>
    </div>
  );
};
