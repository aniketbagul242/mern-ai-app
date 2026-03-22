import { getAIResponse } from "../services/openrouterService.js";

export const askAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await getAIResponse(prompt);

    res.status(200).json({ result });

  } catch (error) {
    res.status(500).json({ error: "Failed to get AI response" });
  }
};