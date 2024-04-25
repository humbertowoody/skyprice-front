'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import spanish from '@/locales/es.json';

export const I18nContext = createContext({
  translations: {},
  setLang: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  var defLang: string = 'es';
  var defTranslations: any = spanish;
  if (typeof window !== 'undefined') {
    defLang = localStorage.getItem('i18nextLng') || 'es';
    if (defLang !== 'es') {
      import(`@/locales/${defLang}.json`)
        .catch(() => {
          console.error(
            `Archivo de traducciones no encontrado para el idioma ${defLang}`,
          );
        })
        .then((module) => {
          defTranslations = module.default;
          console.info(`Traducciones cargadas para el idioma ${defLang}`);
        });
    }
  }

  const [lang, setLang] = useState(defLang);
  const [translations, setTranslations] = useState({ ...defTranslations });

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
    <I18nContext.Provider value={{ translations, setLang: setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const { translations } = useContext(I18nContext);

  const t: Function = (key: string, replacements: any = {}) => {
    let text =
      key
        .split('.')
        .reduce(
          (obj: any, k) => (obj && obj[k] !== undefined ? obj[k] : null),
          translations,
        ) || key;
    Object.keys(replacements).forEach((placeholder) => {
      text = text.replace(
        new RegExp(`{${placeholder}}`, 'g'),
        replacements[placeholder],
      );
    });
    return text;
  };

  return { t };
}
