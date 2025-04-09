import React from "react";
import { AccountToggle } from "./AccountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";

export const Sidebar = ({
  onRouteChange,
}: {
  onRouteChange: (route: string) => void;
}) => {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountToggle />
        {/* <Search /> */}
        <RouteSelect onRouteChange={onRouteChange} />
      </div>

      <Plan />
    </div>
  );
};
