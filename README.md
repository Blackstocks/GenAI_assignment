# 🍽️ Zomato GenAI Assistant

A full-stack AI-powered chatbot that answers questions about restaurants using retrieval-augmented generation (RAG). If the information is missing, it intelligently collects restaurant details from the user and saves them for later processing.

---

## 🚀 Features

- 🤖 Intelligent chatbot that handles restaurant-related queries  
- 🔍 Retrieval-Augmented Generation for precise answers  
- ❓ Handles unknown queries and collects missing data  
- 📥 Persists data for ingestion (scraper + processor pipeline)  
- 💬 Modern, floating chat UI built with React  
- ⚡ FastAPI backend for chat processing and ingestion triggers  

---

## 📂 Project Structure

```
GenAI_assignment/
│
├── app/
│   ├── ingestion/
│   │   ├── main.py        # Runs scraper and processor
│   │   ├── scraper.py     # Scrapes data (custom logic)
│   │   └── processor.py   # Processes and saves data
│   └── retrieval/
│       └── generator.py   # Generates answers from indexed data
│
├── frontend/              # React-based frontend UI
├── main.py                # FastAPI app entry point
├── requirements.txt       # Python dependencies
└── .env.example           # Sample environment config
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Blackstocks/GenAI_assignment.git
cd GenAI_assignment
```

---

### 2. Backend Setup (FastAPI + Python)

#### 🔹 Activate Virtual Environment

- **Windows:**
  ```bash
  venv\Scripts\activate
  ```

- **macOS/Linux:**
  ```bash
  source venv/bin/activate
  ```

#### 🔹 Install Dependencies

```bash
pip install -r requirements.txt
```

#### 🔹 Start the Backend Server

```bash
uvicorn main:app --reload
```

You should see:

```
Uvicorn running on http://127.0.0.1:8000
```

---

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Your chatbot UI should now be running on:

```
http://localhost:3000
```

---

## 🧪 Environment Variables

There is a `.env.example` file in the project. Create a `.env` file in the same location and provide the required API keys or environment values as needed.

---

## 💡 How It Works

1. User sends a query via the chatbot UI.
2. The backend uses a retrieval system to answer from indexed restaurant data.
3. If the answer is missing or unclear, the bot collects restaurant name and location.
4. Collected data is saved to a file and triggers ingestion scripts:
   - `scraper.py`: Fetches updated data based on user input.
   - `processor.py`: Indexes the scraped data for future queries.

---

## 📌 Tech Stack

- **Frontend:** React, Tailwind CSS, Typewriter effect  
- **Backend:** FastAPI, Python  
- **Scripts:** `subprocess`-based pipeline runner  
- **Other:** CORS, Pydantic, Uvicorn  

---

## 🧑‍💻 Author

Made with ❤️ by [Ankit Kumar Soni (Blackstocks)](https://github.com/Blackstocks)
