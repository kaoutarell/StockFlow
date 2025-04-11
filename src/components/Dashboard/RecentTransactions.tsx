"use client";

import React, { useMemo, useState } from "react";
import { FiArrowUpRight, FiDollarSign, FiSearch } from "react-icons/fi";

const productNames = [
  "Luxe Velvet Sofa",
  "Modern Coffee Table",
  "Ergo Office Chair",
  "Industrial Bookshelf",
  "Classic Armchair",
  "Mid-Century Dining Table",
  "Sleek TV Stand",
  "Cozy Lounge Chair",
  "Elegant Nightstand",
  "Stylish Desk Lamp",
  "Vintage Rocking Chair",
  "Minimalist Shelf Unit",
  "Contemporary Bed Frame",
  "Retro Floor Lamp",
  "Designer Bar Stool",
  "Compact Work Desk",
  "Leather Recliner",
  "Open-Concept Dining Chair",
  "Chic Storage Bench",
  "Folding Patio Chair",
  "Sculptural Coffee Table",
  "Adjustable Office Chair",
  "Modular Sofa Set",
  "Wooden Console Table",
  "Industrial Wall Shelf",
  "Storage Ottoman",
];

const generateTransactions = () => {
  const dates = ["Apr 10th", "Apr 9th", "Apr 8th", "Apr 7th", "Apr 6th"];
  const transactions = [];

  for (let i = 1; i <= 40; i++) {
    const name = productNames[Math.floor(Math.random() * productNames.length)];
    const randomDate = dates[Math.floor(Math.random() * dates.length)];
    const randomPrice = (Math.random() * 100 + 5).toFixed(2);
    transactions.push({
      cusId: `#${1000 + i}`,
      sku: name,
      date: randomDate,
      price: `$${randomPrice}`,
    });
  }

  return transactions;
};

export const RecentTransactions = () => {
  const transactions = useMemo(() => generateTransactions(), []);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return transactions.filter(
      (tx) =>
        tx.cusId.toLowerCase().includes(lower) ||
        tx.sku.toLowerCase().includes(lower) ||
        tx.date.toLowerCase().includes(lower)
    );
  }, [search, transactions]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiDollarSign /> Recent Transactions
        </h3>
        <button className="text-sm text-violet-500 hover:underline">
          See all
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative w-full max-w-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search transactions..."
          className="w-full pl-10 pr-4 py-2 rounded border border-stone-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
        />
        <FiSearch className="absolute left-3 top-2.5 text-stone-500" />
      </div>

      {/* Table */}
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {paginated.map((tx, index) => (
            <TableRow
              key={`${tx.cusId}-${index}`}
              cusId={tx.cusId}
              sku={tx.sku}
              date={tx.date}
              price={tx.price}
              order={index}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-stone-200 rounded disabled:bg-stone-300"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
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
        <th className="text-start p-1.5">Customer ID</th>
        <th className="text-start p-1.5">Product Name</th>
        <th className="text-start p-1.5">Date</th>
        <th className="text-start p-1.5">Price</th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  cusId,
  sku,
  date,
  price,
  order,
}: {
  cusId: string;
  sku: string;
  date: string;
  price: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a
          href="#"
          className="text-violet-600 underline flex items-center gap-1"
        >
          {cusId} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{sku}</td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">{price}</td>
    </tr>
  );
};
