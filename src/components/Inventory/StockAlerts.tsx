import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiEye } from "react-icons/fi";

interface Product {
  id: string;
  name: string;
  quantity: number;
}

export const StockAlerts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch low stock alerts
  useEffect(() => {
    const fetchStockAlerts = async () => {
      const data = [
        { id: "1", name: "Luxe Velvet Sofa", quantity: 3 },
        { id: "2", name: "Sleek TV Stand", quantity: 0 },
        { id: "3", name: "Industrial Bookshelf", quantity: 0 },
      ];
      setProducts(data);
    };

    fetchStockAlerts();
  }, []);

  // Divide products into low stock and out-of-stock categories
  const lowStockProducts = products.filter(
    (p) => p.quantity < 4 && p.quantity > 0
  );
  const outOfStockProducts = products.filter((p) => p.quantity === 0);

  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300 relative">
      <div className="p-4">
        <h3 className="font-medium">Stock Alerts</h3>
      </div>

      <div className="px-4 py-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Low Stock Card (Yellow) */}
        {lowStockProducts.length > 0 && (
          <div className="p-4 bg-yellow-100 rounded border border-yellow-300">
            <h4 className="font-medium text-yellow-600">Low Stock</h4>
            <ul>
              {lowStockProducts.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center py-2"
                >
                  <span>{product.name}</span>
                  <span className="text-yellow-800">
                    Stock: {product.quantity}
                  </span>
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded">
                    Reorder
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Out of Stock Card 1 (Red) */}
        {outOfStockProducts.length > 0 && outOfStockProducts.length >= 1 && (
          <div className="p-4 bg-red-100 rounded border border-red-300">
            <h4 className="font-medium text-red-600">Out of Stock</h4>
            <ul>
              {outOfStockProducts.slice(0, 1).map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center py-2"
                >
                  <span>{product.name}</span>
                  <span className="text-red-800">Out of Stock</span>
                  <button className="bg-red-600 text-white px-4 py-2 rounded">
                    Reorder
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Out of Stock Card 2 (Red) */}
        {outOfStockProducts.length > 1 && (
          <div className="p-4 bg-red-100 rounded border border-red-300">
            <h4 className="font-medium text-red-600">Out of Stock</h4>
            <ul>
              {outOfStockProducts.slice(1, 2).map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center py-2"
                >
                  <span>{product.name}</span>
                  <span className="text-red-800">Out of Stock</span>
                  <button className="bg-red-600 text-white px-4 py-2 rounded">
                    Reorder
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* View More Link */}
      <div className="absolute bottom-4 right-4 p-1">
        <a
          href="#"
          className="flex justify-start items-center text-dark-800 hover:text-dark-900"
        >
          <FiEye className="mr-2 text-lg" />
          View More
        </a>
      </div>
    </div>
  );
};
