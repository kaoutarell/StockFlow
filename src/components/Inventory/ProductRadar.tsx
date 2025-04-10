"use client";

import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const productData = [
  {
    feature: "Luxe Velvet Sofa",
    online: 250,
    inStore: 180,
    max: 300,
  },
  {
    feature: "Modern Coffee Table",
    online: 180,
    inStore: 220,
    max: 300,
  },
  {
    feature: "Sleek TV Stand",
    online: 300,
    inStore: 150,
    max: 300,
  },
  {
    feature: "Ergo Office Chair",
    online: 200,
    inStore: 250,
    max: 300,
  },
];

export const ProductRadar = () => {
  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiShoppingCart /> Product Sales
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={productData}>
            <PolarGrid />
            <PolarAngleAxis className="text-xs font-bold" dataKey="feature" />
            <PolarRadiusAxis angle={30} domain={[0, 300]} />
            <Radar
              name="Online Sales"
              dataKey="online"
              stroke="#18181b"
              fill="#18181b"
              fillOpacity={0.3}
            />
            <Radar
              name="In-Store Sales"
              dataKey="inStore"
              stroke="#5b21b6"
              fill="#5b21b6"
              fillOpacity={0.3}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
