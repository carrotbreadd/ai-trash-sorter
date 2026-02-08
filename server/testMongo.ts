import { connectDB } from "./services/mongoClient";

async function test() {
  const db = await connectDB();
  console.log("DB ready:", !!db);
  process.exit(0);
}

test();

