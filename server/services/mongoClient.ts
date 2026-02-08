import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

const client = new MongoClient(uri);

let db: any;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NAME);
  }
  return db;
}