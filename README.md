# MERN AI App

## Overview
This is a simple MERN application that demonstrates connecting multiple technologies:

- **MongoDB**: Stores prompts and AI responses.
- **Express.js & Node.js**: Backend API server.
- **React**: Frontend UI.
- **React Flow**: Visualizes nodes (Input → Result) connected by edges.
- **OpenRouter API**: Generates AI responses for user prompts.

The app allows users to type a message in the input node, click **Run Flow**, view the AI response, and save it to the database.

---

## Features
- **Text Input Node**: Enter your prompt.
- **Result Node**: Displays AI response.
- **Run Flow Button**: Sends the prompt to the backend and displays AI result.
- **Save Button**: Saves the prompt and response to MongoDB.
- **React Flow Visualization**: Input and result nodes are connected by an animated line.

---

## Tech Stack
- Frontend: React.js, React Flow
- Backend: Node.js, Express.js
- Database: MongoDB (Atlas or local)
- AI: OpenRouter API (Free model)

---

## Installation

### 1. Clone the repository
```bash
git clone <your-github-repo-link>
cd <repo-folder>

2. Backend Setup
cd backend
npm install

Create a .env file in backend:

PORT=3000
MONGO_URI=<your-mongodb-connection-string>
OPENROUTER_API_KEY=<your-openrouter-api-key>

Start the backend server:

npm start

The backend will run on http://localhost:3000.

3. Frontend Setup
cd frontend
npm install
npm start

The frontend will run on http://localhost:3000.