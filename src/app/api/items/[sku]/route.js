import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
    const { sku } = params;
  
    try {
      const client = await clientPromise;
      const db = client.db();
  
      // Find the item by SKU
      const item = await db.collection("items").findOne({ sku });
  
      if (!item) {
        console.error(`Item not found for SKU: ${sku}`);
        return new Response(JSON.stringify({ error: "Item not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify(item));
    } catch (error) {
      console.error("Error fetching item:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch item" }), { status: 500 });
    }
  }

  export async function PUT(request, { params }) {
    const { sku } = params;
    const body = await request.json();
  
    const { name, price, description, aisleName, bayNumber, shelfNumber, quantity, imageUrl } = body;
  
    try {
      const client = await clientPromise;
      const db = client.db();
  
      // Update the item in the collection
      const updatedItem = await db.collection("items").findOneAndUpdate(
        { sku },
        { $set: { name, price, description, aisleName, bayNumber, shelfNumber, quantity, imageUrl } },
        { returnDocument: "after" } // Returns the updated document
      );
  
      if (!updatedItem.value) {
        return new Response(JSON.stringify({ error: "Item not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify(updatedItem.value));
    } catch (error) {
      console.error("Error updating item:", error);
      return new Response(JSON.stringify({ error: "Failed to update item" }), { status: 500 });
    }
  }

  export async function DELETE(request, { params }) {
    const { sku } = params;
  
    try {
      const client = await clientPromise;
      const db = client.db();
  
      // Delete the item from the collection
      const result = await db.collection("items").deleteOne({ sku });
  
      if (result.deletedCount === 0) {
        return new Response(JSON.stringify({ error: "Item not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify({ message: "Item deleted successfully" }));
    } catch (error) {
      console.error("Error deleting item:", error);
      return new Response(JSON.stringify({ error: "Failed to delete item" }), { status: 500 });
    }
  }