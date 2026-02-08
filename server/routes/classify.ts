import express from "express";
import { classifyItem } from "../services/ruleEngine";

const router = express.Router();
router.post("/", (req, res) => {
    const {item} = req.body;
    const result = classifyItem(item);

    res.json({
        result,
        source: "rules"
    });
});

export default router;