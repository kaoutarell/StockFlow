import React, { useState } from "react";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";

// Sample data for inventory activities with realistic names
const generateInventoryData = () => {
  const data = [];
  for (let i = 1; i <= 50; i++) {
    data.push({
      sku: `SKU00${i}`,
      quantitySold: Math.floor(Math.random() * 200) + 1,
      quantityReturned: Math.floor(Math.random() * 50),
      clientSatisfaction: Math.floor(Math.random() * 100) + "%",
      stockAvailability: ["High", "Medium", "Low"][
        Math.floor(Math.random() * 3)
      ],
    });
  }
  return data;
};

export const RecentInventoryActivity = () => {
  const allActivities = generateInventoryData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredActivities, setFilteredActivities] = useState(allActivities);
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 10;

  // Filter activities based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = allActivities.filter((activity) =>
      activity.sku.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredActivities(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage);
  const currentActivities = filteredActivities.slice(
    (currentPage - 1) * activitiesPerPage,
    currentPage * activitiesPerPage
  );

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <div className="relative flex items-center gap-3 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by SKU"
            className="p-2 px-4 pl-10 rounded-lg bg-stone-50 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
          />
          <FiSearch className="absolute left-3 text-stone-500 text-lg" />
        </div>
      </div>

      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {currentActivities.map((activity, index) => (
            <TableRow
              key={activity.sku}
              sku={activity.sku}
              quantitySold={activity.quantitySold}
              quantityReturned={activity.quantityReturned}
              clientSatisfaction={activity.clientSatisfaction}
              stockAvailability={activity.stockAvailability}
              order={index + 1}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-stone-200 rounded disabled:bg-stone-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-stone-200 rounded disabled:bg-stone-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">SKU</th>
        <th className="text-start p-1.5">Quantity Sold</th>
        <th className="text-start p-1.5">Quantity Returned</th>
        <th className="text-start p-1.5">Client Satisfaction</th>
        <th className="text-start p-1.5">Stock Availability</th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  sku,
  quantitySold,
  quantityReturned,
  clientSatisfaction,
  stockAvailability,
  order,
}: {
  sku: string;
  quantitySold: number;
  quantityReturned: number;
  clientSatisfaction: string;
  stockAvailability: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">{sku}</td>
      <td className="p-1.5">{quantitySold}</td>
      <td className="p-1.5">{quantityReturned}</td>
      <td className="p-1.5">{clientSatisfaction}</td>
      <td className="p-1.5">
        <span
          className={`inline-block px-3 py-1 rounded-full text-white text-xs ${
            stockAvailability === "High"
              ? "bg-green-500"
              : stockAvailability === "Medium"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {stockAvailability}
        </span>
      </td>
    </tr>
  );
};
