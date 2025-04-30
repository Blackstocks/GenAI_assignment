# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.retrieval.generator import generate_answer  # Use your existing function

app = FastAPI()

# Allow frontend (local or deployed) to access this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request schema
class Query(BaseModel):
    question: str

# Define endpoint
@app.post("/chat")
async def chat(query: Query):
    response = generate_answer(query.question)
    return {"answer": response}
