import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'rw';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // Banners
  'banner.beta': { en: 'Rwanda Tourist Assistant is currently under development (Beta).', fr: 'Rwanda Tourist Assistant est actuellement en cours de développement (Bêta).', rw: 'Rwanda Tourist Assistant iracyubakwa (Beta).' },

  // Navbar
  'nav.title': { en: 'Rwanda Tourist Assistant', fr: 'Rwanda Tourist Assistant', rw: 'Rwanda Tourist Assistant' },
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
  'ai.response.kigali': {
    en: 'Kigali is a vibrant city with amazing art and food! I recommend visiting the local markets and the Kigali Genocide Memorial to understand our history.',
    fr: 'Kigali est une ville dynamique avec des arts et une cuisine incroyables ! Je recommande de visiter les marchés locaux et le Mémorial du génocide de Kigali pour comprendre notre histoire.',
    rw: 'Kigali ni umujyi ushyushye ufite ubugeni n\'ibiryo byiza! Ndagusaba gusura amasoko yaho ndetse n\'Urwibutso rwa Jenoside rwa Kigali kugira ngo usobanukirwe amateka yacu.'
  },
  'ai.response.volcanoes': {
    en: 'Volcanoes National Park is the best for gorilla trekking. It\'s a life-changing experience in the mist-covered mountains!',
    fr: 'Le parc national des Volcans est le meilleur pour le trekking des gorilles. C\'est une expérience qui change la vie dans les montagnes couvertes de brume !',
    rw: 'Pariki y\'Igihugu y\'Ibirunga ni yo nziza cyane mu gusura ingagi. Ni uburambe buhindura ubuzima mu misozi ikunze kuba irimo igihu!'
  },
  'ai.response.kivu': {
    en: 'Lake Kivu is perfect for relaxation. You can enjoy boat rides, sunset views, and the beautiful beaches in Rubavu or Karongi.',
    fr: 'Le lac Kivu est parfait pour la détente. Vous pourrez profiter de promenades en bateau, de vues sur le coucher du soleil et des magnifiques plages de Rubavu ou Karongi.',
    rw: 'Ikiyaga cya Kivu ni cyiza cyane mu kuruhuka. Ushobora kwishimira gutembera mu bwato, kureba izuba rirenga, n\'inkombe nziza i Rubavu cyangwa i Karongi.'
  },
  'ai.response.nature': {
    en: 'Rwanda is known as the "Land of a Thousand Hills". Our nature is lush and green, perfect for hiking and photography!',
    fr: 'Le Rwanda est connu sous le nom de "Pays des mille collines". Notre nature est luxuriante et verdoyante, parfaite pour la randonnée et la photographie !',
    rw: 'U Rwanda ruzwi nk\'igihugu cy\'imisozi igihumbi. Imiterere yacu ni nziza kandi iteye amashyushyu, ibereye gutembera no gufata amafoto!'
  },
  'ai.response.wildlife': {
    en: 'For wildlife, Akagera National Park is a must-see for the Big Five, while Nyungwe offers amazing chimpanzee trekking and a canopy walk.',
    fr: 'Pour la faune, le parc national de l\'Akagera est un incontournable pour les "Big Five", tandis que Nyungwe propose d\'incroyables trekkings de chimpanzés et une passerelle suspendue.',
    rw: 'Ku bijyanye n\'inyamaswa, Pariki y\'Akagera ni ingenzi mu kureba inyamaswa eshanu nini (Big Five), naho Nyungwe itanga amahirwe yo gusura inkima n\'ikiraro cyo mu kirere (canopy walk).'
  },
  'ai.response.culture': {
    en: 'To experience Rwandan culture, I recommend visiting the King\'s Palace in Nyanza or taking a community-based tour to learn about traditional weaving and dancing.',
    fr: 'Pour découvrir la culture rwandaise, je recommande de visiter le Palais du Roi à Nyanza ou de faire un tour communautaire pour en savoir plus sur le tissage et la danse traditionnels.',
    rw: 'Kugira ngo umenye umuco w\'u Rwanda, ndagusaba gusura mu Rugwiro (Ingoro y\'Umwami) i Nyanza cyangwa gusura imiryango y\'abaturage ukiga kuboha no kubyina kinyarwanda.'
  },
  'ai.response.plan': {
    en: 'Here is an overview for your experience: **Estimated Budget:** $200 - $500. **Don\'t miss:** The local community interactions and the unique landscape photography spots!',
    fr: 'Voici un aperçu de votre expérience : **Budget estimé :** 200 $ - 500 $. **À ne pas manquer :** Les interactions avec la communauté locale et les spots de photographie de paysage uniques !',
    rw: 'Dore incamake y\'urugendo rwawe: **Ingengo y\'imari:** $200 - $500. **Ntuzicikwe na:** Gusabana n\'abaturage ndetse n\'amafoto meza y\'imisozi y\'u Rwanda!'
  },
  'ai.mic.listening': {
    en: 'Listening...',
    fr: 'Écoute...',
    rw: 'Ndumva...'
  },
  'ai.mic.mock': {
    en: 'I want to visit Volcanoes National Park',
    fr: 'Je veux visiter le parc national des Volcans',
    rw: 'Nshaka gusura pariki y\'ibirunga'
  },

  // Preferences
  'pref.title': { en: 'Your Travel Preferences', fr: 'Vos préférences de voyage', rw: 'Ibyo Ukunda mu Rugendo' },
  'pref.style': { en: 'Travel Style', fr: 'Style de voyage', rw: 'Uburyo bw\'Urugendo' },
  'pref.budget': { en: 'Budget Range', fr: 'Tranche de budget', rw: 'Ingengo y\'imari' },
  'pref.duration': { en: 'Duration', fr: 'Durée', rw: 'Igihe' },

  // Recommendations
  'rec.title': { en: 'Curated Recommendations', fr: 'Recommandations organisées', rw: 'Ibyo Twaguhitiyemo' },
  'rec.view_details': { en: 'View Details', fr: 'Voir les détails', rw: 'Reba amakuru arambuye' },
  
  // How It Works
  'how.pain1.title': { en: 'Research Fatigue', fr: 'Fatigue de recherche', rw: 'Umunaniro wo gushakashaka' },
  'how.pain1.desc': { en: 'Hours spent jumping between blogs, travel sites, and reviews. Your eyes hurt, still no plan.', fr: 'Des heures passées à sauter entre les blogs, les sites de voyage et les avis. Vos yeux font mal, toujours pas de plan.', rw: 'Amasaha menshi yakoreshejwe mu gusoma amablogu, imbuga z’ubukerarugendo, n’ibitekerezo by’abandi. Amaso akurya, ariko nta gahunda ufite.' },
  'how.pain2.title': { en: 'Lost Hours', fr: 'Heures perdues', rw: 'Amasaha atakaye' },
  'how.pain2.desc': { en: 'Planning should be part of the fun, but it often feels like a second job.', fr: 'La planification devrait faire partie du plaisir, mais elle ressemble souvent à un deuxième travail.', rw: 'Gupanga urugendo byagombye kuba bishimishije, ariko akenshi birushya nk’akazi.' },
  'how.pain3.title': { en: "Nobody's listening", fr: 'Personne n\'écoute', rw: 'Nta muntu utega amatwi' },
  'how.pain3.desc': { en: "Standard filters don't understand that 'the kids need to be near a playground' or 'I need a quiet spot for morning yoga'.", fr: 'Les filtres standard ne comprennent pas que "les enfants ont besoin d\'être près d\'un terrain de jeux" ou "j\'ai besoin d\'un endroit calme pour le yoga du matin".', rw: 'Uburyo busanzwe bwo gushaka ntibwumva ko "abana bakeneye kuba hafi y’aho bakinira" cyangwa ko "nkeneye ahantu hatuje ho gukorera yoga mu gitondo".' },
  'how.intro.title': { en: "Travel planning shouldn't be exhausting.", fr: 'La planification de voyage ne devrait pas être épuisante.', rw: 'Gupanga urugendo ntibyagombye kukuvuna.' },
  'how.intro.subtitle': { en: 'But it is. We all know it.', fr: 'Mais ça l\'est. Nous le savons tous.', rw: 'Ariko riravuna. Twese turabizi.' },
  'how.solution.title.part1': { en: 'What if you could plan a trip ', fr: 'Et si vous pouviez planifier un voyage ', rw: 'Bimeze bite uramutse upanze urugendo ' },
  'how.solution.title.part2': { en: 'like talking to a friend?', fr: 'comme si vous parliez à un ami ?', rw: 'nk’aho uvugana n’inshuti?' },
  'how.solution.subtitle': { en: "That's exactly what Rwanda Tourist Assistant does. Tell us what you need. Type it, say it, however you like.", fr: 'C\'est exactement ce que fait Rwanda Tourist Assistant. Dites-nous ce dont vous avez besoin. Tapez-le, dites-le, comme vous le souhaitez.', rw: 'Icyo ni cyo Rwanda Tourist Assistant ikora. Tubwire icyo ukeneye. Andika, vuga, mu buryo bwose ukunda.' },
  'how.step1.title': { en: 'Tell us', fr: 'Dites-nous', rw: 'Tubwire' },
  'how.step1.desc': { en: '"3 days in Akagera, budget-friendly, focused on photography." That\'s it. We\'ll take it from here.', fr: '"3 jours à l\'Akagera, économique, axé sur la photographie." C\'est tout. Nous prenons le relais.', rw: '"Iminsi 3 muri Akagera, ihendutse, nshaka gufata amafoto." Ngicyo. Twe turakomeza.' },
  'how.step2.title': { en: 'We search', fr: 'Nous cherchons', rw: 'Turashaka' },
  'how.step2.desc': { en: 'We scan thousands of curated experiences and local insights across Rwanda for you.', fr: 'Nous parcourons des milliers d\'expériences organisées et d\'aperçus locaux à travers le Rwanda pour vous.', rw: 'Tureba mu bihumbi by’uburambe bwateguwe n’amakuru y’imbere mu Rwanda ku bwawe.' },
  'how.step3.title': { en: 'Refine together', fr: 'Affiner ensemble', rw: 'Kunononsora hamwe' },
  'how.step3.desc': { en: '"Anything more adventurous?" "With better views?" The more you talk, the sharper the results.', fr: '"Quelque chose de plus aventureux ?" "Avec de meilleures vues ?" Plus vous parlez, plus les résultats sont précis.', rw: '"Haba hari ibirimo akaga kurushaho?" "Haba hari ahantu habona neza kurushaho?" Uko uvuga cyane, ni ko tubona ibyo ushaka neza.' },
  'how.cta.title': { en: 'Your journey is out there, waiting.', fr: 'Votre voyage est là-bas, il vous attend.', rw: 'Urugendo rwawe rurategereje.' },
  'how.cta.subtitle': { en: "Let's find it together. Free, fast, human.", fr: 'Trouvons-le ensemble. Gratuit, rapide, humain.', rw: 'Tubishakire ham more. Ni ubuntu, birihuta, ni nk’umuntu.' },
  'how.cta.button': { en: "Let's Go", fr: 'C\'est parti', rw: 'Twagiye' },

  // Footer
  'footer.copyright': { en: '© 2026 Rwanda Tourist Assistant. All rights reserved.', fr: '© 2026 Rwanda Tourist Assistant. Tous droits réservés.', rw: '© 2026 Rwanda Tourist Assistant. Uburenganzira bwose burasubitswe.' },
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
