import express from "express";
import { connectDB } from "../services/mongoClient";
import { requireAuth } from "../middleware/authMiddleware";
import { classifyItem } from "../services/ruleEngine";
import { aiAssist } from "../services/aiHelper";

const router = express.Router();

/**
 * CLASSIFY TRASH (guest-friendly)
 * Anyone can call this.
 */
router.post("/classify", async (req: any, res) => {
  const { item } = req.body;

  if (!item) {
    return res.status(400).json({ message: "Missing item" });
  }

  // Rule-based classification first
  const ruleResult = classifyItem(item);

  if (ruleResult !== "Unknown") {
    return res.json({
      category: ruleResult,
      source: "rules",
      explanation: `Matched using rule-based classification: "${item}" -> ${ruleResult}`,
    });
  }

  // AI-assisted classification if rules didn't match
  const aiResult = await aiAssist(item);

  res.json({
    category: aiResult,
    source: "ai-assisted",
    explanation: `AI classified "${item}" as ${aiResult}`,
  });
});

/**
 * SAVE TRASH ITEM
 * Auth required
 */
router.post("/", requireAuth, async (req: any, res) => {
  const { item, aiResult, finalResult, source } = req.body;

  if (!item || !aiResult) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const db = await connectDB();
  const trash = db.collection("trash");

  const record = {
    userId: req.user.userId,
    item,
    aiResult,
    finalResult: finalResult || aiResult,
    source,
    createdAt: new Date(),
  };

  await trash.insertOne(record);

  res.json({ message: "Trash saved", record });
});

/**
 * GET USER TRASH HISTORY
 * Auth required
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