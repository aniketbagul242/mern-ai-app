
import axios from "axios";

export const getAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-3-4b-it:free",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, 
          "Content-Type": "application/json"
        }
      }
    );

    console.log("OpenRouter response:", response.data);
    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("OpenRouter API error:", error.response?.data || error.message);
    throw new Error("Failed to get AI response");
  }
};