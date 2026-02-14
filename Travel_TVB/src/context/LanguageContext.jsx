// src/context/LanguageContext.js

// Import useEffect
import React, { createContext, useState, useContext, useEffect } from 'react';

const languages = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const getInitialLanguage = () => {
    const savedLanguageCode = sessionStorage.getItem('preferredLanguage');
    if (savedLanguageCode) {
      const savedLanguage = languages.find(lang => lang.code === savedLanguageCode);
      return savedLanguage || languages[0];
    }
    return languages[0];
  };

  const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage);

  // --- ADD THIS USEEFFECT ---
  useEffect(() => {
    // This is the class we will add to the <body> tag
    const chineseFontClass = 'locale-zh';

    if (currentLanguage.code === 'zh') {
      document.body.classList.add(chineseFontClass);
    } else {
      document.body.classList.remove(chineseFontClass);
    }

    // Cleanup function to remove the class if the provider is ever unmounted
    return () => {
      document.body.classList.remove(chineseFontClass);
    };
  }, [currentLanguage]); // This effect runs every time currentLanguage changes
  // --- END OF ADDITION ---

  const handleLanguageSelect = (language) => {
    setCurrentLanguage(language);
    sessionStorage.setItem('preferredLanguage', language.code);
    console.log(`Language changed and saved to session: ${language.code}`);
  };

  const value = {
    languages,
    currentLanguage,
    handleLanguageSelect
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};