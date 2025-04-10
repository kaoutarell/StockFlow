import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const items = await db.collection("items").find({}).toArray();

    return Response.json(items, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}