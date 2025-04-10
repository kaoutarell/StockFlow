import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const data = await request.json();

    const { sku, name, price, description, aisleName, bayIndex, shelfIndex, quantity, imageUrl } = data;

    // Check if SKU already exists in the items collection
    const existingItem = await db.collection("items").findOne({ sku });
    if (existingItem) {
      return new Response(JSON.stringify({ error: "SKU already exists." }), { status: 400 });
    }

    // Insert the item into the "items" collection
    const newItem = {
      sku,
      name,
      price,
      description,
      quantity,
      imageUrl,
      aisleName,
      bayIndex,
      shelfIndex,
    };

    const itemResult = await db.collection("items").insertOne(newItem);
    const newItemId = itemResult.insertedId;

    // Find the aisle by aisleName
    const aisle = await db.collection("aisles").findOne({ name: aisleName });
    if (!aisle) {
      return new Response(JSON.stringify({ error: "Aisle not found" }), { status: 404 });
    }

    // Check if the bay exists at the specified bayIndex
    const bay = aisle.bays[bayIndex];
    if (!bay) {
      return new Response(JSON.stringify({ error: "Bay not found" }), { status: 404 });
    }

    // Check if shelf exists at the specified shelfIndex
    const shelf = bay.shelves[shelfIndex];
    if (!shelf) {
      return new Response(JSON.stringify({ error: "Shelf not found" }), { status: 404 });
    }

    // Update the aisle by pushing the SKU to the items array in the appropriate shelf
    const result = await db.collection("aisles").updateOne(
      { _id: new ObjectId(aisle._id), "bays._id": bay._id },
      {
        $push: {
          "bays.$.shelves.$[shelf].items": sku
        }
      },
      {
        arrayFilters: [
          { "shelf._id": shelf._id }
        ]
      }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: "Failed to update shelf with new item SKU." }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: "Item created successfully and SKU added to shelf." }), { status: 201 });
  } catch (error) {
    console.error("Error creating item:", error);
    return new Response(JSON.stringify({ error: "Failed to create item" }), { status: 500 });
  }
}
