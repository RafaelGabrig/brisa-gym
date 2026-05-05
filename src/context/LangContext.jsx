import { createContext, useContext, useState } from 'react'
import t from '../i18n'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es')
  const toggle = () => setLang(l => l === 'es' ? 'en' : 'es')
  return (
    <LangContext.Provider value={{ lang, toggle, t: t[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
