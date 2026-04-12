import { useState } from "react";

import { BUDGET_OPTIONS, DURATION_OPTIONS, EXPERIENCE_OPTIONS } from "../utils/constants";
import type { BudgetTier, ExperienceType, TripDuration, UserPreference } from "../types/recommendation";

export function usePreferenceState() {
  const [preferences, setPreferences] = useState<UserPreference>({
    experience: EXPERIENCE_OPTIONS[0],
    budget: BUDGET_OPTIONS[1],
    duration: DURATION_OPTIONS[1],
  });

  const updatePreference = <K extends keyof UserPreference>(
    key: K,
    value: UserPreference[K],
  ) => {
    setPreferences((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return {
    preferences,
    updatePreference,
  };
}
