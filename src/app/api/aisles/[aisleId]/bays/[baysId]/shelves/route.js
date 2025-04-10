import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function POST(request, { params }) {
  try {
    // Log the params object to verify if bayId and aisleId are correct
    console.log("Received params:", params);

    const client = await clientPromise;
    const db = client.db();
    const { aisleId, baysId } = params; // Change bayId to baysId to match the params

    // Log the aisleId and bayId directly for debugging
    console.log(`Aisle ID: ${aisleId}, Bay ID: ${baysId}`);

    // Convert aisleId and baysId to ObjectId instances
    const aisleObjectId = new ObjectId(aisleId);
    const bayObjectId = new ObjectId(baysId); // Use baysId instead of bayId

    // Log the converted ObjectIds for debugging
    console.log(`Converted Aisle ObjectId: ${aisleObjectId}`);
    console.log(`Converted Bay ObjectId: ${bayObjectId}`);

    // Check if aisle exists
    const aisle = await db.collection("aisles").findOne({ _id: aisleObjectId });
    if (!aisle) {
      console.error(`Aisle not found for ID: ${aisleId}`);
      return new Response(JSON.stringify({ error: "Aisle not found" }), { status: 404 });
    }

    // Log the found aisle for debugging
    console.log("Found Aisle:", aisle);

    // Check if the bay exists within the aisle
    const bay = aisle.bays.find((bay) => bay._id.equals(bayObjectId));
    if (!bay) {
      console.error(`Bay not found for ID: ${baysId} in aisle ${aisleId}`);
      return new Response(JSON.stringify({ error: "Bay not found" }), { status: 404 });
    }

    // Log the found bay for debugging
    console.log("Found Bay:", bay);

    // Create a new shelf with a unique _id and an empty items array
    const newShelf = {
      _id: new ObjectId(), // Automatically generates a unique ObjectId
      items: [] // Empty array of items
    };

    // Log the new shelf for debugging
    console.log("New Shelf to be added:", newShelf);

    // Push the new shelf into the shelves array of the specified bay
    const result = await db.collection("aisles").updateOne(
      { _id: aisleObjectId, "bays._id": bayObjectId },
      { $push: { "bays.$.shelves": newShelf } }
    );

    // Log the result of the update operation
    console.log("Update result:", result);

    if (result.modifiedCount === 0) {
      console.error("Failed to add shelf. Modified count is 0.");
      return new Response(JSON.stringify({ error: "Failed to add shelf" }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: "Shelf added successfully" }), { status: 201 });
  } catch (error) {
    console.error("Error adding shelf:", error);
    return new Response(JSON.stringify({ error: "Failed to add shelf" }), { status: 500 });
  }
}
