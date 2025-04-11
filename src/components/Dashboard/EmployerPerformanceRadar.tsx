"use client";

import React from "react";
import { FiEye } from "react-icons/fi";
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

const data = [
  {
    category: "Sales",
    JohnDoe: 145,
    JaneSmith: 130,
    MarkLee: 120,
    SarahWang: 110,
    max: 150,
  },
  {
    category: "Customer Satisfaction",
    JohnDoe: 135,
    JaneSmith: 125,
    MarkLee: 140,
    SarahWang: 130,
    max: 150,
  },
  {
    category: "Delivery",
    JohnDoe: 125,
    JaneSmith: 140,
    MarkLee: 130,
    SarahWang: 145,
    max: 150,
  },
  {
    category: "Returns",
    JohnDoe: 110,
    JaneSmith: 115,
    MarkLee: 100,
    SarahWang: 120,
    max: 150,
  },
  {
    category: "Marketing",
    JohnDoe: 138,
    JaneSmith: 128,
    MarkLee: 135,
    SarahWang: 130,
    max: 150,
  },
];

export const EmployerPerformanceRadar = () => {
  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiEye /> Top Employees Performance
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis className="text-xs font-bold" dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="John Doe"
              dataKey="JohnDoe"
              stroke="#18181b"
              fill="#18181b"
              fillOpacity={0.2}
            />
            <Radar
              name="Jane Smith"
              dataKey="JaneSmith"
              stroke="#5b21b6"
              fill="#5b21b6"
              fillOpacity={0.2}
            />
            <Radar
              name="Mark Lee"
              dataKey="MarkLee"
              stroke="#16a34a"
              fill="#16a34a"
              fillOpacity={0.2}
            />
            <Radar
              name="Sarah Wang"
              dataKey="SarahWang"
              stroke="#d97706"
              fill="#d97706"
              fillOpacity={0.2}
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
