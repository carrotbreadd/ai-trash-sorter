


import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "../services/mongoClient";

const router = express.Router();

/**
 * SIGN UP
 */
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const db = await connectDB();
  const users = db.collection("users");

  const existing = await users.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  await users.insertOne({ email, password: hashed, createdAt: new Date() });

  res.json({ message: "User created" });
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const db = await connectDB();
  const users = db.collection("users");

  const user = await users.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id, email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

export default router;

