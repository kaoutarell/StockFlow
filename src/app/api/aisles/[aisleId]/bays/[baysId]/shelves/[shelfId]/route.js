import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Extracting aisleId, bayId, and shelfId from the request URL
    const url = new URL(request.url);
    const pathnameParts = url.pathname.split("/");
    const aisleId = pathnameParts[pathnameParts.length - 5];
    const bayId = pathnameParts[pathnameParts.length - 3];
    const shelfId = pathnameParts[pathnameParts.length - 1];

    if (!ObjectId.isValid(aisleId) || !ObjectId.isValid(bayId) || !ObjectId.isValid(shelfId)) {
      return new Response(JSON.stringify({ error: "Invalid ID format" }), { status: 400 });
    }

    const result = await db.collection("aisles").updateOne(
      { _id: new ObjectId(aisleId), "bays._id": new ObjectId(bayId) },
      { $pull: { "bays.$.shelves": { _id: new ObjectId(shelfId) } } }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: "Shelf not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Shelf deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting shelf:", error);
    return new Response(JSON.stringify({ error: "Failed to delete shelf" }), { status: 500 });
  }
}
