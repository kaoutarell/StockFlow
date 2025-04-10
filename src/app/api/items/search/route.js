import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  const { sku } = new URL(request.url).searchParams;

  if (!sku) {
    return new Response(JSON.stringify({ error: "Please provide a SKU" }), { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Find items by SKU using regex for partial matches
    const items = await db.collection("items").find({
      sku: { $regex: sku, $options: "i" }, // Case-insensitive search
    }).toArray();

    if (items.length === 0) {
      return new Response(JSON.stringify({ error: "No items found" }), { status: 404 });
    }

    return new Response(JSON.stringify(items));
  } catch (error) {
    console.error("Error searching items:", error);
    return new Response(JSON.stringify({ error: "Failed to search items" }), { status: 500 });
  }
}
