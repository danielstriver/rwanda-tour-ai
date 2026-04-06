import { useState } from "react";

import { BUDGET_OPTIONS, DURATION_OPTIONS, EXPERIENCE_OPTIONS } from "../utils/constants";
import type { BudgetTier, ExperienceType, TripDuration } from "../types/recommendation";

interface PreferenceState {
  experience: ExperienceType;
  budget: BudgetTier;
  duration: TripDuration;
}

export function usePreferenceState() {
  const [preferences, setPreferences] = useState<PreferenceState>({
    experience: EXPERIENCE_OPTIONS[0],
    budget: BUDGET_OPTIONS[1],
    duration: DURATION_OPTIONS[1],
  });

  const updatePreference = <K extends keyof PreferenceState>(
    key: K,
    value: PreferenceState[K],
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
