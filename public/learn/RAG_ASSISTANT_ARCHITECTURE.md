# How the Rwanda Tourist Assistant AI Works

This document explains the transition from a mocked, hardcoded travel assistant to a functional, data-driven AI agent using Retrieval-Augmented Generation (RAG).

## 1. The Architecture: RAG (Retrieval-Augmented Generation)

Instead of relying solely on the general knowledge of a Large Language Model (LLM), we use **RAG** to feed the AI specific, up-to-date information about Rwanda. This ensures the recommendations are accurate and grounded in real-world data.

### The Pipeline:
1. **Knowledge Extraction:** We pull data from OpenStreetMap (Overpass API) and curated local datasets.
2. **Embedding Generation:** We convert descriptions into mathematical vectors (embeddings) using the `sentence-transformers/all-MiniLM-L6-v2` model.
3. **Vector Search:** When a user asks a question, we compute the vector for their query and find the most similar destinations in our knowledge base using **Cosine Similarity**.
4. **Contextual LLM Generation:** We provide the "Top 3" relevant destinations as context to an LLM (**Qwen/Qwen2.5-72B-Instruct**), which then generates a natural, helpful response.

## 2. Technical Stack (100% Free & Open-Source)

- **LLM & Embeddings:** Hugging Face Inference API (Free Tier).
- **Data Source:** OpenStreetMap (Overpass API).
- **Backend:** Vercel Serverless Functions (Node.js/TypeScript).
- **Orchestration:** Manual RAG implementation (no heavy dependencies like LangChain required for this scale).
- **Vector Storage:** In-memory search (JSON-based) for maximum speed and zero infrastructure cost.

## 3. How to Update the Knowledge Base

If you want the AI to learn about new places, hotels, or restaurants:

1. Add the data to `src/data/rwanda_knowledge.json`.
2. Re-run the embedding generation script:
   ```bash
   npx tsx scripts/generateEmbeddings.ts
   ```
3. Commit and push the updated `rwanda_embeddings.json`.

## 4. Local Development

To test the frontend and the AI backend together:
```bash
npx vercel dev
```
*(Requires a `.env` file with your `HUGGINGFACE_API_KEY`).*

---
*Built for the Rwanda Tourist Assistant MVP Upgrade.*
