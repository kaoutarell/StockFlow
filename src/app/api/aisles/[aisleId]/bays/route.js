import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function POST(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { aisleId } = params;
    
    const { index } = await request.json(); // Extract the index or any other data you're passing

    // Create a new bay with a unique _id and empty shelves array
    const newBay = {
      _id: new ObjectId(), // Automatically generate a unique ObjectId for the bay
      shelves: [], // Initialize with an empty shelves array
      index, // If you want to use the index provided in the request
    };

    // Update the aisle with the new bay
    const result = await db.collection("aisles").updateOne(
      { _id: new ObjectId(aisleId) },
      { $push: { bays: newBay } } // Push the new bay into the bays array
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: "Failed to add bay" }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: "Bay added successfully" }), { status: 201 });
  } catch (error) {
    console.error("Error adding bay:", error);
    return new Response(JSON.stringify({ error: "Failed to add bay" }), { status: 500 });
  }
}
