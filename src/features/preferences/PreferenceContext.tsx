import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BUDGET_OPTIONS, DURATION_OPTIONS, EXPERIENCE_OPTIONS } from '../../utils/constants';
import type { BudgetTier, ExperienceType, TripDuration, UserPreference } from '../../types/recommendation';

interface PreferenceContextType {
  preferences: UserPreference;
  updatePreference: <K extends keyof UserPreference>(key: K, value: UserPreference[K]) => void;
}

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

export const PreferenceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreference>({
    experience: EXPERIENCE_OPTIONS[0],
    budget: BUDGET_OPTIONS[1],
    duration: DURATION_OPTIONS[1],
  });

  const updatePreference = <K extends keyof UserPreference>(key: K, value: UserPreference[K]) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  };

  return (
    <PreferenceContext.Provider value={{ preferences, updatePreference }}>
      {children}
    </PreferenceContext.Provider>
  );
};

export const usePreferences = (): PreferenceContextType => {
  const context = useContext(PreferenceContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferenceProvider');
  }
  return context;
};
