"use client";

import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { FiPlus, FiX } from "react-icons/fi";

interface Aisle {
  _id: string;
  name: string;
  bays: Bay[];
}

interface Bay {
  _id: string;
  shelves: Shelf[];
}

interface Shelf {
  _id: string;
}

export const AllProductsWithCreateItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#6B21A8] hover:bg-[#9D4EDD] text-white text-lg px-6 py-3 rounded-full shadow-md"
      >
        <FiPlus className="inline-block mr-2" /> Create New Item
      </button>
      {isOpen && <CreateItemForm onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export const CreateItemForm = ({ onClose }: { onClose: () => void }) => {
  const [aisles, setAisles] = useState<Aisle[]>([]);
  const [selectedAisle, setSelectedAisle] = useState<string | null>(null);
  const [selectedBayIndex, setSelectedBayIndex] = useState<number | null>(null);
  const [selectedShelfIndex, setSelectedShelfIndex] = useState<number | null>(
    null
  );
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");
  const [skuError, setSkuError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAisles = async () => {
      try {
        const response = await fetch("/api/aisles");
        const data = await response.json();
        setAisles(data);
      } catch (error) {
        console.error("Error fetching aisles:", error);
      }
    };
    fetchAisles();
  }, []);

  const handleAisleChange = (aisleId: string) => {
    setSelectedAisle(aisleId);
    setSelectedBayIndex(null);
    setSelectedShelfIndex(null);
  };

  const handleBayChange = (bayIndex: number) => {
    setSelectedBayIndex(bayIndex);
    setSelectedShelfIndex(null);
  };

  const checkSkuExists = async (sku: string) => {
    const response = await fetch(`/api/items/search?sku=${sku}`);
    const data = await response.json();
    return data.length > 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSkuError(null);
    const skuExists = await checkSkuExists(sku);
    if (skuExists) {
      setSkuError("SKU already exists.");
      return;
    }

    const newItem = {
      sku,
      name,
      price,
      description,
      aisleName: aisles.find((aisle) => aisle._id === selectedAisle)?.name,
      bayIndex: selectedBayIndex,
      shelfIndex: selectedShelfIndex,
      quantity,
      imageUrl,
    };

    setIsLoading(true);
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        alert("Item created successfully!");
        setSku("");
        setName("");
        setPrice(0);
        setDescription("");
        setQuantity(0);
        setImageUrl("");
        setSelectedAisle(null);
        setSelectedBayIndex(null);
        setSelectedShelfIndex(null);
        onClose();
      } else {
        alert("Failed to create item.");
      }
    } catch (error) {
      console.error("Error creating item:", error);
      alert("An error occurred while creating the item.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center p-6">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl relative">
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-500 hover:text-stone-800"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
          <Dialog.Title className="text-xl font-bold mb-4 text-[#6B21A8]">
            Create New Item
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* SKU */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">SKU</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="p-3 border border-[#6B21A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
                  required
                />
                {skuError && (
                  <p className="text-red-500 text-sm mt-1">{skuError}</p>
                )}
              </div>

              {/* Name */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-3 border border-[#6B21A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
                  required
                />
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="p-3 border border-[#6B21A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
                  required
                />
              </div>

              {/* Quantity */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="p-3 border border-[#6B21A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="p-3 border border-[#6B21A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
                  required
                />
              </div>

              {/* Description */}
              <div className="flex flex-col col-span-2">
                <label className="font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-3 border border-[#6B21A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B21A8] h-24"
                  required
                />
              </div>
            </div>

            {/* Aisle Dropdown */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Aisle</label>
              <select
                value={selectedAisle || ""}
                onChange={(e) => handleAisleChange(e.target.value)}
                className="p-3 border border-[#6B21A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
                required
              >
                <option value="" disabled>
                  Select Aisle
                </option>
                {aisles.map((aisle) => (
                  <option key={aisle._id} value={aisle._id}>
                    {aisle.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Bay Dropdown */}
            {selectedAisle && (
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Bay</label>
                <select
                  value={selectedBayIndex !== null ? selectedBayIndex : ""}
                  onChange={(e) => handleBayChange(Number(e.target.value))}
                  className="p-3 border border-[#6B21A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
                  required
                >
                  <option value="" disabled>
                    Select Bay
                  </option>
                  {aisles
                    .find((aisle) => aisle._id === selectedAisle)
                    ?.bays.map((bay, index) => (
                      <option key={index} value={index}>
                        Bay {index + 1}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Shelf Dropdown */}
            {selectedBayIndex !== null && selectedAisle && (
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">Shelf</label>
                <select
                  value={selectedShelfIndex !== null ? selectedShelfIndex : ""}
                  onChange={(e) =>
                    setSelectedShelfIndex(Number(e.target.value))
                  }
                  className="p-3 border border-[#6B21A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
                  required
                >
                  <option value="" disabled>
                    Select Shelf
                  </option>
                  {aisles
                    .find((aisle) => aisle._id === selectedAisle)
                    ?.bays[selectedBayIndex!]?.shelves.map((shelf, index) => (
                      <option key={index} value={index}>
                        Shelf {index + 1}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#6B21A8] text-white rounded-lg mt-6 hover:bg-[#9D4EDD] focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Item"}
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
