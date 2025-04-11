"use client";

import React from "react";
import { FiEye } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";

const stockData = [
  {
    status: "In Stock",
    count: 132,
  },
  {
    status: "Out of Stock",
    count: 18,
  },
];

export const StockHistogram = () => {
  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiEye />
          Stock Overview
        </h3>
      </div>

      <div className="h-64 px-4 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stockData} barCategoryGap={50}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Products">
              {stockData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.status === "In Stock" ? "#16a34a" : "#f97316"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
