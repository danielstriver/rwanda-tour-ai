# Rwanda Tourist Assistant

Rwanda Tourist Assistant is an AI-powered tourism recommendation platform for Rwanda. It provides a polished landing experience, interactive AI-driven discovery, and curated recommendations.

## Features

- **Multilingual Support:** Full support for English, French, and Kinyarwanda, with a persistent language toggle in the Navbar.
- **AI-Powered Discovery:** An interactive AI assistant that recommends experiences based on user preferences and natural language descriptions.
- **Preference Selection:** Refine your search by experience type, budget, and trip duration.
- **Curated Recommendations:** Polished cards showcasing top Rwandan destinations like Volcanoes National Park, Lake Kivu, and Kigali City.
- **Modern UI/UX:** Built with React 19, Chakra UI, and Framer Motion for smooth animations and a premium feel.
- **Dark Mode Support:** Seamless switching between light and dark themes.

## Tech Stack

- **Framework:** React 19 (TypeScript)
- **Styling:** Chakra UI
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Internationalization:** Custom Context-based i18n system
- **Deployment:** Vercel

## Project Structure

```text
src/
  components/         # Reusable UI components
  features/
    ai/               # AI Chat interface
    preferences/      # Preference selection logic
    recommendations/  # Recommendation cards and details
  hooks/              # Custom hooks (Language, Preferences, etc.)
  pages/              # Page layouts
  types/              # TypeScript definitions
  utils/              # Constants and sample data
```

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Recent Updates

- ✅ Added a Beta banner to the landing page.
- ✅ Ensured consistent Footer visibility across the entire application.
- ✅ Updated site branding to "Rwanda Tourist Assistant".
- ✅ Implemented functional "How It Works" guide with problem/solution visualization.
- ✅ Redesigned landing page and AI chat to match immersive "Evimi Bul" inspiration.
- ✅ Implemented functional "Plan This Experience" integration with the AI assistant.
- ✅ Enhanced light mode with adaptive color schemes for all components.
- ✅ Added mocked voice interface with listening animations.
- ✅ Improved chat history functionality with clickable recent searches.
- ✅ Optimized typography and alignment for better readability.
- ✅ Added AI Chat Assistant for personalized recommendations.
- ✅ Implemented functional multilingual support (English, French, Kinyarwanda).
- ✅ Integrated AI avatar and interactive chat flow.
- ✅ Updated "Start Exploring" to lead directly to the AI experience.
- ✅ Localized all major UI sections.

## Future Roadmap

- Real-time AI integration using Vercel AI SDK.
- Voice assistant interactions.
- Integration with live travel APIs for real-time booking and pricing.
- User accounts and saved itineraries.
