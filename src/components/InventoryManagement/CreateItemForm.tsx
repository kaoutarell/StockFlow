import React, { useState } from "react";

interface CreateItemFormProps {
  onClose: () => void;
}

export const CreateItemForm: React.FC<CreateItemFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    price: "",
    stock: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Submitted", formData);
    onClose(); // Close the modal after submitting the form
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose(); // Trigger the parent onClose function
  };

  if (!isModalOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white w-[600px] h-auto rounded-lg shadow-2xl p-8 relative animate-fade-in flex flex-col">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#6B21A8]">
          Create Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Inputs in two columns */}
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#6B21A8] focus:border-[#6B21A8] sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="productDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Product Description
              </label>
              <input
                type="text"
                id="productDescription"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#6B21A8] focus:border-[#6B21A8] sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#6B21A8] focus:border-[#6B21A8] sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#6B21A8] focus:border-[#6B21A8] sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all duration-200 shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-4 px-6 py-3 bg-[#6B21A8] text-white rounded-full hover:bg-[#9D4EDD] transition-all duration-200 shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
