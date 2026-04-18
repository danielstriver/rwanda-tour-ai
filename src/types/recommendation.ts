import type { LucideIcon } from "lucide-react";

export type ExperienceType = "Nature" | "Wildlife" | "Culture" | "City";
export type BudgetTier = "Low" | "Medium" | "Premium";
export type TripDuration = "1 day" | "3 days" | "1 week";

export interface UserPreference {
  experience: ExperienceType;
  budget: BudgetTier;
  duration: TripDuration;
}

export interface Recommendation {
  id: string;
  title: string;
  shortLocation: string;
  description: string;
  longDescription: string;
  priceRange: string;
  duration: string;
  bestFor: string;
  highlights: string[];
  imagePaths: string[];
  icon: LucideIcon;
  accent: string;
  experienceTypes: ExperienceType[];
  budgetTiers: BudgetTier[];
  durations: TripDuration[];
}
