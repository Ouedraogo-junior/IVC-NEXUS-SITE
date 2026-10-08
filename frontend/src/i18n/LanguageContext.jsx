import { createContext, useContext, useState, useMemo } from 'react'
import fr from './fr.json'
import en from './en.json'
import clientFrBase from './client.fr.json'
import clientEnBase from './client.en.json'
import { buildDictionaries, deepMerge } from './buildDictionaries'

const pricingFrModules = import.meta.glob('./pricing.fr.json', { eager: true, import: 'default' })
const pricingEnModules = import.meta.glob('./pricing.en.json', { eager: true, import: 'default' })
const pricingFr = Object.values(pricingFrModules)[0] ?? {}
const pricingEn = Object.values(pricingEnModules)[0] ?? {}

const clientFr = deepMerge(clientFrBase, pricingFr)
const clientEn = deepMerge(clientEnBase, pricingEn)

const dictionaries = buildDictionaries({ fr, en, clientFr, clientEn })

const LanguageContext = createContext(null)

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

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage doit être utilisé à l'intérieur de <LanguageProvider>")
  return ctx
}