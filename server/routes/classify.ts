import express from "express";
import { classifyItem } from "../services/ruleEngine";
import { aiAssist } from "../services/aiHelper";

const router = express.Router();

router.post("/", async (req, res) => {
  const { item } = req.body;

  if (!item) return res.status(400).json({ error: "Item is required" });

  const ruleResult = classifyItem(item);

  if (ruleResult !== "Unknown") {
    return res.json({ result: ruleResult, source: "rules" });
  }

  // Use AI fallback
  try {
    const aiResult = await aiAssist(item);
    return res.json({
      result: aiResult.category,
      explanation: aiResult.explanation,
      source: "ai-assisted",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "AI fallback failed" });
  }
});

export default router;
