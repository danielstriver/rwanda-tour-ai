import { Building2, Mountain, Trees } from "lucide-react";

import type { BudgetTier, ExperienceType, Recommendation, TripDuration } from "../types/recommendation";

export const EXPERIENCE_OPTIONS: ExperienceType[] = ["Nature", "Wildlife", "Culture", "City"];

export const BUDGET_OPTIONS: BudgetTier[] = ["Low", "Medium", "Premium"];

export const DURATION_OPTIONS: TripDuration[] = ["1 day", "3 days", "1 week"];

export const SAMPLE_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "volcanoes-national-park",
    title: "Volcanoes National Park",
    shortLocation: "Northern Province",
    description: "Mist-covered mountains, gorilla trekking energy, and a premium wildlife escape in Rwanda's north.",
    longDescription:
      "Volcanoes National Park pairs dense rainforest landscapes with one of Rwanda's most iconic experiences: mountain gorilla trekking. This experience is designed for travelers who want a dramatic, high-value wildlife journey with luxury lodge potential and unforgettable mountain scenery.",
    priceRange: "$220 - $480",
    duration: "1 to 3 days",
    bestFor: "Wildlife seekers and premium adventure travelers",
    highlights: [
      "Guided gorilla trekking routes",
      "Scenic volcanic mountain views",
      "High-end lodge and guided tour options",
    ],
    imagePaths: [
      "/images/virunga-park-image1.jpeg",
      "/images/virunga-park-image2.jpeg",
      "/images/virunga-park-image3.jpeg",
    ],
    icon: Mountain,
    accent: "linear-gradient(135deg, rgba(54,175,99,0.95), rgba(28,84,49,0.88))",
  },
  {
    id: "lake-kivu",
    title: "Lake Kivu",
    shortLocation: "Western Province",
    description: "A relaxed lakeside experience with sunset cruises, beach walks, and scenic resort towns.",
    longDescription:
      "Lake Kivu delivers a calmer pace with waterfront stays, panoramic boat rides, and a strong leisure-travel atmosphere. It works well for couples, small groups, and travelers looking for a restorative break that still feels distinctly Rwandan.",
    priceRange: "$90 - $240",
    duration: "3 days to 1 week",
    bestFor: "Nature lovers, couples, and relaxed itineraries",
    highlights: [
      "Boat tours and sunset lake views",
      "Resort towns with relaxing beach access",
      "Flexible budgets from casual to premium stays",
    ],
    imagePaths: [
      "/images/lake-kivu-image1.jpeg",
      "/images/lake-kivu-image2.jpeg",
      "/images/lake-kivu-image3.jpeg",
    ],
    icon: Trees,
    accent: "linear-gradient(135deg, rgba(43,108,176,0.95), rgba(26,54,93,0.88))",
  },
  {
    id: "kigali-city-tour",
    title: "Kigali City Tour",
    shortLocation: "Kigali",
    description: "Explore Rwanda's capital through markets, art spaces, local cuisine, and modern city highlights.",
    longDescription:
      "Kigali City Tour is the most accessible option for visitors who want culture, food, design, and urban discovery in one itinerary. It balances local flavor with a polished city experience, making it a strong fit for shorter stays and first-time visits.",
    priceRange: "$45 - $140",
    duration: "1 day to 3 days",
    bestFor: "Culture-focused travelers and first-time visitors",
    highlights: [
      "Curated stops for food, art, and local markets",
      "Fast-paced day itineraries with flexible pacing",
      "Ideal starting point for short Rwanda trips",
    ],
    imagePaths: [
      "/images/kigali-city-image1.jpeg",
      "/images/kigali-city-image2.jpeg",
      "/images/kigali-city-image3.jpeg",
    ],
    icon: Building2,
    accent: "linear-gradient(135deg, rgba(221,107,32,0.95), rgba(116,66,16,0.88))",
  },
];
