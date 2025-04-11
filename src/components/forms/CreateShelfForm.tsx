"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FiX } from "react-icons/fi";

export const CreateShelfForm = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predefinedShelves = [
    "Shelf 1",
    "Shelf 2",
    "Shelf 3",
    "Shelf 4",
    "Shelf 5",
    "Shelf 6",
    "Shelf 7",
    "Shelf 8",
    "Shelf 9",
    "Shelf 10",
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Check if shelf already exists in predefined list
    if (predefinedShelves.includes(name)) {
      setError("Shelf name already exists.");
      setIsLoading(false);
      return;
    }

    // Simulate successful shelf creation
    setTimeout(() => {
      alert("Shelf created successfully!");
      setName(""); // Reset shelf name input
      onClose(); // Close the form dialog
      setIsLoading(false);
    }, 1000); // Simulate loading time
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
            Create New Shelf
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Shelf Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Shelf 9"
                className="p-3 border border-[#6B21A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#6B21A8] text-white rounded-lg mt-6 hover:bg-[#9D4EDD] focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Shelf"}
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
