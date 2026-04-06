import type { LucideIcon } from "lucide-react";

export type ExperienceType = "Nature" | "Wildlife" | "Culture" | "City";
export type BudgetTier = "Low" | "Medium" | "Premium";
export type TripDuration = "1 day" | "3 days" | "1 week";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  icon: LucideIcon;
  accent: string;
}
