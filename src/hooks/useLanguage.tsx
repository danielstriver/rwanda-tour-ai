import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'rw';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // Navbar
  'nav.title': { en: 'Rwanda Tour AI', fr: 'Rwanda Tour AI', rw: 'Rwanda Tour AI' },
  'nav.subtitle': { en: 'Smart tourism discovery', fr: 'Découverte touristique intelligente', rw: 'Uvumbuzi bw’ubukerarugendo bwubatswe kuri AI' },
  'nav.lang.en': { en: 'English', fr: 'Anglais', rw: 'Icyongereza' },
  'nav.lang.fr': { en: 'French', fr: 'Français', rw: 'Igifaransa' },
  'nav.lang.rw': { en: 'Kinyarwanda', fr: 'Kinyarwanda', rw: 'Ikinyarwanda' },
  'nav.theme.dark': { en: 'Dark', fr: 'Sombre', rw: 'Mwijima' },
  'nav.theme.light': { en: 'Light', fr: 'Clair', rw: 'Umucyo' },

  // Hero
  'hero.eyebrow': { en: 'We rethought travel search', fr: 'Nous avons repensé la recherche de voyage', rw: 'Twashatse uburyo bushya bwo gushaka ingendo' },
  'hero.title.part1': { en: 'Just tell us, ', fr: 'Dites-nous simplement, ', rw: 'Tubwire gusa, ' },
  'hero.title.part2': { en: "we'll find it.", fr: 'nous le trouverons.', rw: 'tuzabishaka.' },
  'hero.subtitle': { en: 'Skip the filters. Say what you need, type or talk. We\'ll search thousands of experiences across Rwanda for you.', fr: 'Oubliez les filtres. Dites ce dont vous avez besoin, tapez ou parlez. Nous chercherons des milliers d\'expériences à travers le Rwanda pour vous.', rw: 'Reka gukoresha akayunguruzo. Vuga icyo ukeneye, andika cyangwa uvuge. Tuzagushakira amagana y\'uburambe mu Rwanda.' },
  'hero.body': { en: 'Start with your travel style, budget, and duration to preview curated experiences across Rwanda.', fr: 'Commencez par votre style de voyage, votre budget et votre durée pour prévisualiser des expériences organisées à travers le Rwanda.', rw: 'Tangira n\'uburyo ukunda gukora ingendo, ingengo y\'imari, n\'igihe uzamara kugira ngo urebe uburyo bwateguwe bwo gusura u Rwanda.' },
  'hero.cta': { en: 'Start Searching', fr: 'Commencer la recherche', rw: 'Tangira Gushaka' },
  'hero.secondary_cta': { en: 'How It Works?', fr: 'Comment ça marche ?', rw: 'Bikora bite?' },

  // AI Section
  'ai.title': { en: 'How can I help you today?', fr: 'Comment puis-je vous aider aujourd\'hui ?', rw: 'Nshobora kugufasha nte uyu munsi?' },
  'ai.placeholder': { en: 'Describe your dream trip to Rwanda...', fr: 'Décrivez votre voyage de rêve au Rwanda...', rw: 'Sobanura urugendo rwawe ruroshye mu Rwanda...' },
  'ai.send': { en: 'Send', fr: 'Envoyer', rw: 'Ohereza' },
  'ai.thinking': { en: 'Thinking...', fr: 'Réflexion...', rw: 'Ntekereza...' },
  'ai.response.default': { 
    en: 'Based on your preferences, I recommend exploring these curated experiences. Rwanda offers breathtaking landscapes and unique wildlife encounters!',
    fr: 'Sur la base de vos préférences, je vous recommande d\'explorer ces expériences organisées. Le Rwanda offre des paysages à couper le souffle et des rencontres uniques avec la faune !',
    rw: 'Ukurikije ibyo ukunda, ndagusaba gusura ibi bice. U Rwanda rufite amahuriro meza cyane n\'inyamaswa zidasanzwe!'
  },

  // Preferences
  'pref.title': { en: 'Your Travel Preferences', fr: 'Vos préférences de voyage', rw: 'Ibyo Ukunda mu Rugendo' },
  'pref.style': { en: 'Travel Style', fr: 'Style de voyage', rw: 'Uburyo bw\'Urugendo' },
  'pref.budget': { en: 'Budget Range', fr: 'Tranche de budget', rw: 'Ingengo y\'imari' },
  'pref.duration': { en: 'Duration', fr: 'Durée', rw: 'Igihe' },

  // Recommendations
  'rec.title': { en: 'Curated Recommendations', fr: 'Recommandations organisées', rw: 'Ibyo Twaguhitiyemo' },
  'rec.view_details': { en: 'View Details', fr: 'Voir les détails', rw: 'Reba amakuru arambuye' },
  
  // Footer
  'footer.copyright': { en: '© 2024 Rwanda Tour AI. All rights reserved.', fr: '© 2024 Rwanda Tour AI. Tous droits réservés.', rw: '© 2024 Rwanda Tour AI. Uburenganzira bwose burasubitswe.' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
