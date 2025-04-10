import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Extracting params correctly from request URL
    const url = new URL(request.url);
    const pathnameParts = url.pathname.split("/");
    const aisleId = pathnameParts[pathnameParts.length - 3];
    const bayId = pathnameParts[pathnameParts.length - 1];

    if (!ObjectId.isValid(aisleId) || !ObjectId.isValid(bayId)) {
      return new Response(JSON.stringify({ error: "Invalid ID format" }), { status: 400 });
    }

    const result = await db.collection("aisles").updateOne(
      { _id: new ObjectId(aisleId) },
      { $pull: { bays: { _id: new ObjectId(bayId) } } }
    );

    if (result.modifiedCount === 0) {
      return new Response(JSON.stringify({ error: "Bay not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Bay deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting bay:", error);
    return new Response(JSON.stringify({ error: "Failed to delete bay" }), { status: 500 });
  }
}
