import React from "react";
import { AccountToggle } from "./AccountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";

export const Sidebar = ({
  onRouteChange,
  selectedRoute,
}: {
  onRouteChange: (route: string) => void;
  selectedRoute: string;
}) => {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountToggle />
        {/* <Search /> -- not really needed, but will be kept until deployment just in case  */}
        <RouteSelect
          selectedRoute={selectedRoute}
          onRouteChange={onRouteChange}
        />
      </div>

      <Plan />
    </div>
  );
};
