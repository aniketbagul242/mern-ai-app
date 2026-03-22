import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-app-backend-9rq8.onrender.com/api",
});

export const askAI = async (prompt) => {
  const res = await API.post("/ask-ai", { prompt });
  return res.data.result;
};

export const saveData = async (prompt, response) => {
  return API.post("/save", { prompt, response });
};
