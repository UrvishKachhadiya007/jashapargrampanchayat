import { createContext, useContext, useMemo, useState } from "react";
const LanguageContext = createContext(null);
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(
    () => localStorage.getItem("mvp-language") || "gu",
  );
  const setLanguage = (value) => {
    setLanguageState(value);
    localStorage.setItem("mvp-language", value);
  };
  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => useContext(LanguageContext);
// export const pick = (value, lang) => value?.[lang] ?? value?.en ?? value ?? "";
export function pick(value, lang) {
  if (value === null || value === undefined) return "";

  // જૂનો plain string data હોય તો direct show કરશે
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  // Selected language ન મળે તો fallback language show કરશે
  return value[lang] ?? value.en ?? value.gu ?? value.hi ?? "";
}
