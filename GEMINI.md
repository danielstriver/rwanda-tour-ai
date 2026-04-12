# Rwanda Tourist Assistant - Project Context

Rwanda Tourist Assistant is a RAG-powered AI assistant prototype designed to provide personalized tourism recommendations for Rwanda. It combines a polished UI with a Retrieval-Augmented Generation (RAG) backend to deliver grounded, data-driven travel advice.

## Project Overview

- **Purpose:** Provide personalized, accurate travel recommendations for Rwanda based on user preferences and grounded local knowledge.
- **Status:** RAG-powered AI Assistant (AI-integrated prototype).
- **Tech Stack:**
  - **Frontend:** React 19 (TypeScript), Chakra UI, Framer Motion, Lucide React.
  - **AI/RAG Backend:** Vercel Serverless Functions (Node.js/TypeScript).
  - **LLM & Embeddings:** Hugging Face Inference API (Qwen2.5-72B for chat, sentence-transformers for embeddings).
  - **Data Source:** Curated local datasets and OpenStreetMap (Overpass API).
  - **Storage:** In-memory vector search (JSON-based) for speed and simplicity.

## Architecture

The project follows a feature-based structure with an integrated AI backend:

- `api/`: Vercel Serverless Functions (Backend logic for AI chat and title generation).
- `src/features/ai/`: UI components and logic for the RAG-powered AI chat experience.
- `src/features/preferences/`: UI for selecting experience types, budget, and duration.
- `src/features/recommendations/`: UI for displaying static and AI-generated destination recommendations.
- `src/data/`: Core knowledge base (`rwanda_knowledge.json`) and pre-computed embeddings (`rwanda_embeddings.json`).
- `scripts/`: Utility scripts for building the knowledge base and generating embeddings using `tsx`.
- `src/hooks/`: Custom React hooks (e.g., `usePreferenceState`, `useLanguage`).
- `public/learn/`: Documentation for the RAG architecture and system design.

## Development Workflow

### Key Commands

- `npm install`: Install project dependencies.
- `npm run dev`: Start the Vite development server (Frontend only).
- `npx vercel dev`: Start the local development environment with serverless functions (Requires `.env` with `HUGGINGFACE_API_KEY`).
- `npx tsx scripts/generateEmbeddings.ts`: Re-generate embeddings after updating the knowledge base.

### Coding Conventions

- **Component Style:** Functional components using TypeScript and Chakra UI.
- **Styling:** Prefer Chakra UI's style props and `semanticTokens` for consistent theme and dark mode support.
- **RAG Pattern:** Maintain a clear separation between the knowledge base (JSON) and the inference logic.
- **State Management:** Use custom hooks to encapsulate feature-specific state and AI interaction logic.
- **Localization:** Use the `useLanguage` hook for multi-language support (English/French/Kinyarwanda).

## Key Files for Context

- `api/chat.ts`: Main entry point for the RAG-based AI recommendation engine.
- `src/data/rwanda_knowledge.json`: The source of truth for all tourist destinations and experiences.
- `src/features/ai/AIChatSection.tsx`: The primary UI for user interaction with the assistant.
- `public/learn/RAG_ASSISTANT_ARCHITECTURE.md`: Detailed explanation of the RAG pipeline.
- `src/pages/RwandaTourPage.tsx`: Main layout orchestrating all sections.

## Future Roadmap

- **Dynamic Data:** Integration with live external APIs for real-time availability and pricing.
- **Voice Assistant:** Enhanced interactive elements with voice-to-text and text-to-speech.
- **Expanded Localization:** Full translation of the knowledge base into Kinyarwanda and French.
- **User Accounts:** Personalized travel itineraries and saved recommendations.
