"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

export const CreateAisleForm = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/aisles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        alert("Aisle created successfully!");
        setName("");
        onClose();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to create aisle.");
      }
    } catch (err) {
      console.error("Error creating aisle:", err);
      setError("An error occurred while creating the aisle.");
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
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <Dialog.Title className="text-xl font-bold mb-4 text-[#6B21A8]">
            Create New Aisle
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Aisle Name Input */}
            <div className="flex flex-col">
              <label className="font-semibold text-gray-700">Aisle Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border border-[#6B21A8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B21A8]"
                required
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#6B21A8] text-white rounded-lg mt-6 hover:bg-[#9D4EDD] focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Aisle"}
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
