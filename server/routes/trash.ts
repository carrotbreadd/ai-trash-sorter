import express from "express";
import { connectDB } from "../services/mongoClient";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * SAVE A TRASH ITEM
 */
router.post("/", requireAuth, async (req: any, res) => {
  const { item, aiResult, source } = req.body;

  if (!item || !aiResult) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const db = await connectDB();
  const trash = db.collection("trash");

  const record = {
    userId: req.user.userId,
    item,
    aiResult,
    finalResult: aiResult,
    source,
    createdAt: new Date(),
  };

  await trash.insertOne(record);
  res.json({ message: "Trash saved", record });
});

/**
 * GET USER TRASH HISTORY
 */
router.get("/", requireAuth, async (req: any, res) => {
  const db = await connectDB();
  const trash = db.collection("trash");

  const items = await trash
    .find({ userId: req.user.userId })
    .sort({ createdAt: -1 })
    .toArray();

  res.json(items);
});

export default router;

