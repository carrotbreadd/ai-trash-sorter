import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import classifyRoutes from "./routes/classify";
import authRoutes from "./routes/auth";
import trashRoutes from "./routes/trash";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/trash", trashRoutes);
app.use("/api/classify", classifyRoutes);

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
