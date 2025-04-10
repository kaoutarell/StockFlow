import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = () => {
  return (
    <>
      <Card title="Number of Bays" value="50" period="Last Updated: 2025" />
      <Card title="Number of Shelves" value="150" period="Last Updated: 2025" />
      <Card
        title="Total Products"
        value="2,350"
        pillText="4.2%"
        trend="up"
        period="Last Updated: 2025"
      />
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
}: {
  title: string;
  value: string;
  pillText?: string;
  trend?: "up" | "down";
  period: string;
}) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        {trend && pillText && (
          <span
            className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
              trend === "up"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
          </span>
        )}
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
