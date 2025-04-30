import sys
import os


# Add the project root (rag_chatbot) to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
# print("Current sys.path:", sys.path)
from app.retrieval.generator import generate_answer



from app.retrieval.generator import generate_answer

query = "What are the item in menu in Saravana Bhavan restraunt at janpath"
response = generate_answer(query)
print(response)
