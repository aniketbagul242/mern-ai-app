import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import aiRouter from "./routes/aiRoutes.js";
import saveRouter from "./routes/saveRoutes.js";
import { getAIResponse } from "./services/openrouterService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api",aiRouter );
app.use("/api", saveRouter);

app.get("/", (req, res)=>{
  res.json("working")
})

app.get("/test-ai", async (req, res) => {
  try {
    const result = await getAIResponse("Hello world");
    res.json({ result });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});