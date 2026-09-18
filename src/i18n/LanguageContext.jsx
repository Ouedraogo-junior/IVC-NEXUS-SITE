import { createContext, useContext, useState, useMemo } from 'react'
import fr from './fr.json'
import en from './en.json'

const dictionaries = { fr, en }

const LanguageContext = createContext(null)

/**
 * Fournit la langue courante (fr | en) et son dictionnaire de traduction
 * à toute l'application. Pour ajouter une langue : créer un fichier JSON
 * du même format et l'ajouter à `dictionaries` ci-dessus.
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr')

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang],
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/** Hook d'accès : const { t, lang, setLang } = useLanguage() */
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage doit être utilisé à l\'intérieur de <LanguageProvider>')
  return ctx
}
