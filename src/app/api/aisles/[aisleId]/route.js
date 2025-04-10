import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function DELETE(request, { params }) {
  try {
    const { aisleId } = params; // Extract aisleId from route
    if (!aisleId) {
      return new Response(JSON.stringify({ error: "Aisle ID is required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("aisles").deleteOne({ _id: new ObjectId(aisleId) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Aisle not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Aisle deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Delete Error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete aisle" }), { status: 500 });
  }
}
