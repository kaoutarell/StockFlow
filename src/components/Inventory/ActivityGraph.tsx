"use client";

import React from "react";
import { FiBox } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";

const data = [
  { name: "Jan", New: 100, Returned: 20 },
  { name: "Feb", New: 200, Returned: 30 },
  { name: "Mar", New: 150, Returned: 40 },
  { name: "Apr", New: 180, Returned: 35 },
  { name: "May", New: 220, Returned: 25 },
];

export const ActivityGraph = () => {
  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiBox /> Product Activity
        </h3>
      </div>
      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="New" stroke="#4CAF50" />
            <Line type="monotone" dataKey="Returned" stroke="#FF5722" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
