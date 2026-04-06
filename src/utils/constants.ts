import { Building2, Mountain, Trees } from "lucide-react";

import type { BudgetTier, ExperienceType, Recommendation, TripDuration } from "../types/recommendation";

export const EXPERIENCE_OPTIONS: ExperienceType[] = ["Nature", "Wildlife", "Culture", "City"];

export const BUDGET_OPTIONS: BudgetTier[] = ["Low", "Medium", "Premium"];

export const DURATION_OPTIONS: TripDuration[] = ["1 day", "3 days", "1 week"];

export const SAMPLE_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "volcanoes-national-park",
    title: "Volcanoes National Park",
    description: "Mist-covered mountains, gorilla trekking energy, and a premium wildlife escape in Rwanda's north.",
    priceRange: "$220 - $480",
    icon: Mountain,
    accent: "linear-gradient(135deg, rgba(54,175,99,0.95), rgba(28,84,49,0.88))",
  },
  {
    id: "lake-kivu",
    title: "Lake Kivu",
    description: "A relaxed lakeside experience with sunset cruises, beach walks, and scenic resort towns.",
    priceRange: "$90 - $240",
    icon: Trees,
    accent: "linear-gradient(135deg, rgba(43,108,176,0.95), rgba(26,54,93,0.88))",
  },
  {
    id: "kigali-city-tour",
    title: "Kigali City Tour",
    description: "Explore Rwanda's capital through markets, art spaces, local cuisine, and modern city highlights.",
    priceRange: "$45 - $140",
    icon: Building2,
    accent: "linear-gradient(135deg, rgba(221,107,32,0.95), rgba(116,66,16,0.88))",
  },
];
