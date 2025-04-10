import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "");

let clientPromise;

// In production, it's best to not use `global` for caching
if (process.env.NODE_ENV === "development") {
  // During development, use a global variable so the MongoClient is not constantly created during hot reloading
  if (globalThis._mongoClientPromise) {
    clientPromise = globalThis._mongoClientPromise;
  } else {
    globalThis._mongoClientPromise = client.connect();
    clientPromise = globalThis._mongoClientPromise;
  }
} else {
  // In production, it's safe to directly use `client.connect()` without global caching
  clientPromise = client.connect();
}

export default clientPromise;


