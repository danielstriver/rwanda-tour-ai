# Rwanda Tourist Assistant

Rwanda Tourist Assistant is a RAG-powered (Retrieval-Augmented Generation) AI assistant designed to provide personalized, grounded tourism recommendations for Rwanda. It combines a high-performance React frontend with a serverless backend and a vector database for intelligent discovery.

---

## 🚀 Key Features

- **AI-Powered Discovery:** Interactive AI assistant using **Hugging Face (Qwen2.5-72B)** to recommend experiences based on natural language and user preferences.
- **Grounded Recommendations (RAG):** AI responses are grounded in a curated knowledge base of over 100+ Rwandan destinations and experiences.
- **Advanced Preference Engine:** Filter searches by experience type (Nature, Culture, Adventure), budget (Economy to Luxury), and duration.
- **Multilingual Support:** Fully localized in **English, French, and Kinyarwanda**.
- **Dark Mode Support:** Modern, immersive UI with seamless theme switching.
- **Voice Interface:** Mocked voice assistant with advanced animations and feedback.
- **Chat Persistence:** Saved local chat sessions with intelligent title generation.
- **API Rate Limiting:** Integrated Upstash Redis to prevent LLM API abuse.

---

## 🛠 Tech Stack

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Chakra UI](https://v2.chakra-ui.com/), [Framer Motion](https://www.framer.com/motion/).
- **AI/Backend:** [Vercel Serverless Functions](https://vercel.com/docs/functions), [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index).
- **Database (Vector Search):** [Supabase Vector](https://supabase.com/docs/guides/ai) (PostgreSQL + pgvector).
- **Rate Limiting:** [Upstash Redis](https://upstash.com/).
- **Deployment:** [Vercel](https://vercel.com/).

---

## 📋 Prerequisites

To develop on this project, you need the following tools installed:

1.  **Node.js & npm:** (v18+ recommended)
2.  **Git:** For version control.
3.  **Vercel CLI:** For local serverless function development.
    ```bash
    npm install -g vercel
    ```
4.  **Supabase CLI:** (Optional, but recommended for database migrations)
    ```bash
    npm install -g supabase
    ```
5.  **GitHub CLI:** For managing PRs and repos from the terminal.

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/danielstriver/rwanda-tour-ai.git
cd rwanda-tour-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your credentials. Use the template below:

```env
# Hugging Face Inference API
HUGGINGFACE_API_KEY=your_hf_token_here

# Supabase Vector Database
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Upstash Redis (for Rate Limiting)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

### 4. Vector Database Setup
If you are setting up a new Supabase project:
1.  Enable the **Vector** extension in your Supabase dashboard.
2.  Run the migration located in `supabase/migrations/20260413120000_setup_vector_db.sql` in the Supabase SQL Editor.
3.  Sync the knowledge base to the vector store:
    ```bash
    npm run sync-supabase
    ```

---

## 🏗 Development

### Full RAG Experience (Frontend + Backend)
To test the AI assistant and serverless functions locally, use Vercel Dev:
```bash
npx vercel dev
```
This will start the server on **http://localhost:3000**.

### Frontend Only
For UI-only development (no AI functionality):
```bash
npm run dev
```

---

## 📁 Project Architecture

- **`api/`**: Vercel Serverless Functions (Backend logic for AI chat and title generation).
- **`src/features/ai/`**: UI components and logic for the RAG-powered AI chat experience.
- **`src/features/preferences/`**: Multi-step preference selection system.
- **`src/features/recommendations/`**: Destination cards and detailed experience views.
- **`src/data/`**: Core knowledge base (`rwanda_knowledge.json`) and pre-computed embeddings.
- **`scripts/`**: Utility scripts for data processing and database syncing.
- **`supabase/`**: Database migrations and configuration.

---

## 📜 Maintenance Scripts

| Command | Description |
| :--- | :--- |
| `npm run sync-supabase` | Syncs local JSON knowledge base to Supabase Vector DB. |
| `npx tsx scripts/generateEmbeddings.ts` | Re-generates embeddings locally for the knowledge base. |
| `npx tsx scripts/testChat.ts` | CLI tool to test RAG retrieval and LLM response logic. |

---

## 🤝 Contributing

1.  Create a feature branch: `git checkout -b feat/your-feature`
2.  Commit your changes: `git commit -m "feat: your feature description"`
3.  Push to the branch: `git push origin feat/your-feature`
4.  Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
