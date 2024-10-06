# AI-Powered Business Decision Support System

This project is an AI-powered Business Decision Support System that leverages Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) to provide real-time, context-aware insights for business decision-makers.

## Features

- Dynamic Insights Generation
- Interactive Q&A Interface
- Data Retrieval Mechanism using FAISS
- Decision Tree Visualization
- User-Friendly Dashboard

## Setup

### Frontend

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS and Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Set your OpenAI API key in `backend/main.py`

6. Run the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

## Usage

Open your browser and navigate to `http://localhost:5173` to use the application. The backend API will be available at `http://localhost:8000`.

## Note

This is a prototype and should be further developed and secured before use in a production environment.