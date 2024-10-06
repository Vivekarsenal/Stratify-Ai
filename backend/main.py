from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import faiss
import numpy as np
from typing import List

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
openai.api_key = "your-openai-api-key"  # Replace with your actual API key

# Initialize FAISS index
dimension = 1536  # OpenAI's text-embedding-ada-002 dimension
index = faiss.IndexFlatL2(dimension)

# Sample business documents (in a real scenario, these would be loaded from a database)
documents = [
    "Our company's revenue increased by 15% in Q4 2023.",
    "Customer satisfaction scores improved from 7.5 to 8.2 in the last quarter.",
    "New product launch in the Asian market led to a 20% increase in regional sales.",
]

# Embed documents and add to FAISS index
for doc in documents:
    embedding = openai.Embedding.create(input=doc, model="text-embedding-ada-002")["data"][0]["embedding"]
    index.add(np.array([embedding]))

class Query(BaseModel):
    query: str

@app.post("/generate_insight")
async def generate_insight(query: Query):
    prompt = f"Based on the latest business performance data and the following query: '{query.query}', generate a strategic insight for improving operations."
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a business strategy AI assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return {"insight": response.choices[0].message.content}

@app.post("/ask_question")
async def ask_question(query: Query):
    # Embed the question
    question_embedding = openai.Embedding.create(input=query.query, model="text-embedding-ada-002")["data"][0]["embedding"]
    
    # Search for relevant documents
    D, I = index.search(np.array([question_embedding]), k=2)
    relevant_docs = [documents[i] for i in I[0]]
    
    # Construct prompt with relevant context
    context = "\n".join(relevant_docs)
    prompt = f"Context:\n{context}\n\nQuestion: {query.query}\nAnswer:"
    
    # Generate answer using GPT
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a business strategy AI assistant. Use the provided context to answer the question."},
            {"role": "user", "content": prompt}
        ]
    )
    return {"answer": response.choices[0].message.content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)