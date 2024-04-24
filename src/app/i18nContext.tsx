'use client';
import { createContext, useContext, useState, useEffect } from 'react';

export const I18nContext = createContext({
  translations: {},
  setLang: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState(localStorage.getItem('i18nextLng') || 'es');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    import(`@/locales/${lang}.json`)
      .then((module) => {
        setTranslations(module.default);
        localStorage.setItem('i18nextLng', lang);
        console.info(`Traducciones cargadas para el idioma ${lang}`);
      })
      .catch(() => {
        console.error(
          `Archivo de traducciones no encontrado para el idioma ${lang}`,
        );
      });
  }, [lang]);

  return (
    <I18nContext.Provider value={{ translations, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const { translations } = useContext(I18nContext);

  const t = (key) => {
    return (
      key
        .split('.')
        .reduce(
          (obj, k) => (obj && obj[k] !== undefined ? obj[k] : null),
          translations,
        ) || key
    );
  };

  return { t };
}
