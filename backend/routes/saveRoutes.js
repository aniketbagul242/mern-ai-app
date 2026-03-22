import express from "express";
import { savePrompt } from "../controllers/saveController.js";

const saveRouter = express.Router();

saveRouter.post("/save", savePrompt);

export default saveRouter;