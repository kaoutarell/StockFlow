import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const items = await db.collection("aisles").find({}).toArray();

    return Response.json(items, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("test"); // Specify your database name

    const { name } = await request.json(); // Assuming you're sending the name in the request body
    
    const result = await db.collection("aisles").insertOne({ name, bays: [] });

    // If successful, return the inserted document with the insertedId
    const insertedAisle = { _id: result.insertedId, name, bays: [] };
    
    return new Response(
      JSON.stringify(insertedAisle), 
      { 
        status: 201, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to create aisle" }), 
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}