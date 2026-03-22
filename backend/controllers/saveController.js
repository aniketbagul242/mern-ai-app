import Prompt from "../models/Prompt.js";

export const savePrompt = async (req, res) => {
  try {
    const { prompt, response } = req.body;

    const newData = new Prompt({
      prompt,
      response
    });

    await newData.save();

    res.status(201).json({
      message: "Saved successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: "Failed to save data"
    });
  }
};