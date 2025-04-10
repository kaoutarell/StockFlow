"use client";

import React, { useState } from "react";
import { CreateItemForm } from "../forms/CreateItemForm";
import { CreateAisleForm } from "../forms/CreateAisleForm";
import { ProductsTable } from "./ProductsTable";

const AllProductsPage = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAisleModalOpen, setIsAisleModalOpen] = useState(false);
  const [isShelfModalOpen, setIsShelfModalOpen] = useState(false);
  const [isBayModalOpen, setIsBayModalOpen] = useState(false);

  // Open and close handlers for each modal
  const openProductModal = () => setIsProductModalOpen(true);
  const closeProductModal = () => setIsProductModalOpen(false);

  const openAisleModal = () => setIsAisleModalOpen(true);
  const closeAisleModal = () => setIsAisleModalOpen(false);

  const openShelfModal = () => setIsShelfModalOpen(true);
  const closeShelfModal = () => setIsShelfModalOpen(false);

  const openBayModal = () => setIsBayModalOpen(true);
  const closeBayModal = () => setIsBayModalOpen(false);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={openProductModal}
          className="px-10 py-5 text-2xl bg-[#6B21A8] text-white rounded-full hover:bg-[#9D4EDD] transition-all duration-200 shadow-md"
        >
          + Create New Product
        </button>
        <button
          onClick={openAisleModal}
          className="px-10 py-5 text-2xl bg-[#6B21A8] text-white rounded-full hover:bg-[#9D4EDD] transition-all duration-200 shadow-md"
        >
          + Create New Aisle
        </button>
        <button
          onClick={openShelfModal}
          className="px-10 py-5 text-2xl bg-[#6B21A8] text-white rounded-full hover:bg-[#9D4EDD] transition-all duration-200 shadow-md"
        >
          + Create New Shelf
        </button>
        <button
          onClick={openBayModal}
          className="px-10 py-5 text-2xl bg-[#6B21A8] text-white rounded-full hover:bg-[#9D4EDD] transition-all duration-200 shadow-md"
        >
          + Create New Bay
        </button>
      </div>

      {/* Modals */}
      {isProductModalOpen && <CreateItemForm onClose={closeProductModal} />}
      {/* Add your aisle, shelf, and bay forms here when ready */}
      {isAisleModalOpen && <CreateAisleForm onClose={closeAisleModal} />}
      {isShelfModalOpen && <div>Your Shelf Form Here</div>}
      {isBayModalOpen && <div>Your Bay Form Here</div>}

      {/* Furniture Products Table */}
      <ProductsTable />
    </div>
  );
};

export default AllProductsPage;
