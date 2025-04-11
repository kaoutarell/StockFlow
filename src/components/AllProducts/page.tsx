"use client";

import React, { useState, useEffect } from "react";
import { CreateItemForm } from "../forms/CreateItemForm";
import { CreateAisleForm } from "../forms/CreateAisleForm";
import { CreateShelfForm } from "../forms/CreateShelfForm";
import { CreateBayForm } from "../forms/CreateBayForm";
import { ProductsTable } from "./ProductsTable";
import { FiPlus } from "react-icons/fi";

const AllProductsPage = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAisleModalOpen, setIsAisleModalOpen] = useState(false);
  const [isShelfModalOpen, setIsShelfModalOpen] = useState(false);
  const [isBayModalOpen, setIsBayModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Retrieve user role on component mount
  useEffect(() => {
    const user =
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("user") || "{}")
        : null;
    if (user) {
      setUserRole(user.role); // Set user role (manager or employee)
    }
  }, []);

  const openProductModal = () => setIsProductModalOpen(true);
  const closeProductModal = () => setIsProductModalOpen(false);

  const openAisleModal = () => setIsAisleModalOpen(true);
  const closeAisleModal = () => setIsAisleModalOpen(false);

  const openShelfModal = () => setIsShelfModalOpen(true);
  const closeShelfModal = () => setIsShelfModalOpen(false);

  const openBayModal = () => setIsBayModalOpen(true);
  const closeBayModal = () => setIsBayModalOpen(false);

  return (
    <div className="p-6 bg-white rounded-lg min-h-screen">
      {/* Only show the flex container if the user is a manager */}
      {userRole === "manager" && (
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { label: "Create New Product", onClick: openProductModal },
            { label: "Create New Aisle", onClick: openAisleModal },
            { label: "Create New Shelf", onClick: openShelfModal },
            { label: "Create New Bay", onClick: openBayModal },
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className="w-full sm:w-[45%] py-6 px-6 text-xl text-[#333] rounded-xl 
                bg-[#f3f2fb]
                shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff]
                hover:shadow-[4px_4px_8px_#bebebe,_-4px_-4px_8px_#ffffff]
                active:shadow-inner
                transition-all duration-200 ease-in-out
                flex items-center justify-center gap-3"
            >
              <FiPlus className="text-[#6B21A8]" size={26} />
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* Display modals */}
      {isProductModalOpen && <CreateItemForm onClose={closeProductModal} />}
      {isAisleModalOpen && <CreateAisleForm onClose={closeAisleModal} />}
      {isShelfModalOpen && <CreateShelfForm onClose={closeShelfModal} />}
      {isBayModalOpen && <CreateBayForm onClose={closeBayModal} />}

      {/* Always show the ProductsTable */}
      <div className={userRole === "employee" ? "mt-0" : "mt-10"}>
        <ProductsTable />
      </div>
    </div>
  );
};

export default AllProductsPage;
