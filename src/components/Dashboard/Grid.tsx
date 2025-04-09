import React from "react";
import { StatCards } from "./StatCards";
import { ActivityGraph } from "./ActivityGraph";
import { UsageRadar } from "./UsageRadar";
import { RecentTransactions } from "./RecentTransactions";

interface GridProps {
  isManager: boolean;
}

export const Grid: React.FC<GridProps> = ({ isManager }) => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      {isManager && <StatCards />}
      {isManager && <ActivityGraph />}
      {isManager && <UsageRadar />}
      <RecentTransactions />
    </div>
  );
};
