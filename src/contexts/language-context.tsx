'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { ro } from '@/locales/ro';
import { en } from '@/locales/en';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type Language = 'ro' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

const translations = { ro, en };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('ro');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && (storedLanguage === 'ro' || storedLanguage === 'en')) {
      setLanguageState(storedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = useCallback((key: string, options?: { [key: string]: string | number }) => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            // Fallback to English if key not found in current language
            value = en;
            for (const k_en of keys) {
                if (value && typeof value === 'object' && k_en in value) {
                    value = value[k_en];
                } else {
                    return key; // Return the key if not found in English either
                }
            }
            break;
        }
    }
    
    if (typeof value === 'string' && options) {
      return Object.entries(options).reduce((acc, [optKey, optValue]) => {
        return acc.replace(`{{${optKey}}}`, String(optValue));
      }, value);
    }
    
    return value || key;
  }, [language]);


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

export const LanguageSelector = () => {
    const { language, setLanguage } = useLanguage();
  
    return (
      <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ro">Română</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    );
  };
