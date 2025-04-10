import React, { useEffect, useState } from "react";

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

export const CreateItemForm = () => {
  const [aisles, setAisles] = useState<Aisle[]>([]);
  const [selectedAisle, setSelectedAisle] = useState<string | null>(null);
  const [selectedBayIndex, setSelectedBayIndex] = useState<number | null>(null);
  const [selectedShelfIndex, setSelectedShelfIndex] = useState<number | null>(null);
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");
  const [skuError, setSkuError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch aisle data from the database
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
    setSelectedBayIndex(null); // Reset bay and shelf when aisle changes
    setSelectedShelfIndex(null);
  };

  const handleBayChange = (bayIndex: number) => {
    setSelectedBayIndex(bayIndex);
    setSelectedShelfIndex(null); // Reset shelf when bay changes
  };

  const checkSkuExists = async (sku: string) => {
    const response = await fetch(`/api/items/search?sku=${sku}`);
    const data = await response.json();
    return data.length > 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSkuError(null); // Reset SKU error message

    // Check if SKU is already taken
    const skuExists = await checkSkuExists(sku);
    if (skuExists) {
      setSkuError("SKU already exists.");
      return;
    }

    // Prepare item data for submission
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        alert("Item created successfully!");
        // Reset form after successful submission
        setSku("");
        setName("");
        setPrice(0);
        setDescription("");
        setQuantity(0);
        setImageUrl("");
        setSelectedAisle(null);
        setSelectedBayIndex(null);
        setSelectedShelfIndex(null);
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
    <div className="form-container">
      <h2>Create New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>SKU</label>
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
          {skuError && <p className="error-text">{skuError}</p>}
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Aisle</label>
          <select
            value={selectedAisle || ""}
            onChange={(e) => handleAisleChange(e.target.value)}
            required
          >
            <option value="" disabled>Select Aisle</option>
            {aisles.map((aisle) => (
              <option key={aisle._id} value={aisle._id}>
                {aisle.name}
              </option>
            ))}
          </select>
        </div>

        {selectedAisle && (
          <div className="form-group">
            <label>Bay</label>
            <select
              value={selectedBayIndex !== null ? selectedBayIndex : ""}
              onChange={(e) => handleBayChange(Number(e.target.value))}
              required
            >
              <option value="" disabled>Select Bay</option>
              {aisles
                .find((aisle) => aisle._id === selectedAisle)
                ?.bays.map((bay, index) => (
                  <option key={bay._id} value={index}>
                    Bay {index + 1}
                  </option>
                ))}
            </select>
          </div>
        )}

        {selectedBayIndex !== null && (
          <div className="form-group">
            <label>Shelf</label>
            <select
              value={selectedShelfIndex !== null ? selectedShelfIndex : ""}
              onChange={(e) => setSelectedShelfIndex(Number(e.target.value))}
              required
            >
              <option value="" disabled>Select Shelf</option>
              {aisles
                .find((aisle) => aisle._id === selectedAisle)
                ?.bays[selectedBayIndex]
                ?.shelves.map((shelf, index) => (
                  <option key={shelf._id} value={index}>
                    Shelf {index + 1}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Create Item"}
          </button>
        </div>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          font-weight: bold;
        }
        input,
        select,
        textarea {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        textarea {
          height: 100px;
        }
        .error-text {
          color: red;
          font-size: 12px;
        }
        button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};
