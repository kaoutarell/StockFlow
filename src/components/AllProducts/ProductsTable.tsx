import React, { useState } from "react";
import { FiSearch, FiMoreHorizontal } from "react-icons/fi";

// Sample data for 100 furniture products with realistic names
const generateFurnitureData = () => {
  const data = [];
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

  for (let i = 1; i <= 100; i++) {
    const randomIndex = Math.floor(Math.random() * productNames.length);
    data.push({
      sku: `SKU00${i}`,
      name: productNames[randomIndex],
      color: i % 2 === 0 ? "Deep Blue" : "Oak Wood",
      quantity: `${Math.floor(Math.random() * 100) + 10}`,
      aisle: `Aisle ${Math.floor(Math.random() * 10) + 1}`,
      bay: `Bay ${Math.floor(Math.random() * 10) + 1}`,
      shelf: `Shelf ${Math.floor(Math.random() * 10) + 1}`,
    });
  }
  return data;
};

export const ProductsTable = () => {
  const allProducts = generateFurnitureData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  // Filter products based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <div className="relative flex items-center gap-3 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search Products"
            className="p-2 px-4 pl-10 rounded-lg bg-stone-50 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full"
          />
          <FiSearch className="absolute left-3 text-stone-500 text-lg" />
        </div>
      </div>

      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {currentProducts.map((product, index) => (
            <TableRow
              key={product.sku}
              sku={product.sku}
              name={product.name}
              color={product.color}
              quantity={product.quantity}
              aisle={product.aisle}
              bay={product.bay}
              shelf={product.shelf}
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
        <th className="text-start p-1.5">Name</th>
        <th className="text-start p-1.5">Color</th>
        <th className="text-start p-1.5">Quantity</th>
        <th className="text-start p-1.5">Aisle</th>
        <th className="text-start p-1.5">Bay</th>
        <th className="text-start p-1.5">Shelf</th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  sku,
  name,
  color,
  quantity,
  aisle,
  bay,
  shelf,
  order,
}: {
  sku: string;
  name: string;
  color: string;
  quantity: string;
  aisle: string;
  bay: string;
  shelf: string;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">{sku}</td>
      <td className="p-1.5">{name}</td>
      <td className="p-1.5">{color}</td>
      <td className="p-1.5">{quantity}</td>
      <td className="p-1.5">{aisle}</td>
      <td className="p-1.5">{bay}</td>
      <td className="p-1.5">{shelf}</td>
    </tr>
  );
};
