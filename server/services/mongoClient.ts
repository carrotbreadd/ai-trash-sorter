import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load .env variables immediately
dotenv.config();

const uri = process.env.DATABASE_URL as string;

if (!uri) {
  throw new Error("Missing DATABASE_URL in .env");
}

let client: MongoClient;

export async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("MongoDB connected");
  }
  return client.db("trash-sorter"); // your DB name
}

