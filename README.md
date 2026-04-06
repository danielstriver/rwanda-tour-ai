# Rwanda Tour AI

Rwanda Tour AI is the first MVP prototype of an AI-powered tourism recommendation platform focused on Rwanda. This version is intentionally UI-first: it delivers a polished landing experience, preference selection flow, and static recommendation cards that future AI features can build on safely.

## Features

- Responsive landing page with hero, navigation, preferences, recommendations, and footer
- Preference selectors for experience type, budget, and trip duration
- Static recommendation cards for Volcanoes National Park, Lake Kivu, and Kigali City Tour
- Chakra UI-based design system with dark mode support
- Framer Motion section and card animations
- Lucide React icons throughout the interface

## Tech Stack

- React 19
- TypeScript
- Vite
- Chakra UI
- Framer Motion
- Lucide React
- Vercel (deployment target)

## Project Structure

```text
src/
  components/
  features/
    preferences/
    recommendations/
  hooks/
  pages/
  types/
  utils/
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

## Future Roadmap

- AI-generated destination recommendations
- Voice assistant interactions
- Multilingual support
- Vercel Functions for server-side AI orchestration
- Neon, Upstash, Stripe, and Resend integrations

