import { createContext, useCallback, useEffect, useMemo, useRef } from 'react'
import { initReactI18next, useTranslation } from 'react-i18next'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

import { LocalStorageUtils } from '@/utils/local-storage'

import type { LanguageContextTypes, LanguageProviderTypes } from './types'

const localStorageUtils = new LocalStorageUtils()

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    debug: import.meta.env.DEV,
    supportedLngs: ['pt'],
    fallbackLng: 'pt',
    defaultNS: 'base-layout',
    ns: ['common', 'base-layout'],
    detection: {
      lookupLocalStorage: localStorageUtils.mountStorageKey('language'),
      lookupQuerystring: 'lang',
    },
  })

const LanguageContext = createContext({} as LanguageContextTypes.Context)

const LANGUAGE_OPTIONS: LanguageContextTypes.Language[] = i18next.languages as LanguageContextTypes.Language[]

const channel = new BroadcastChannel('app-language')

function LanguageProvider(props: LanguageProviderTypes.Props) {
  const html = useRef(document.documentElement)
  const { i18n } = useTranslation(undefined, { i18n: i18next })

  const { language } = i18n

  html.current.lang = language

  const changeLanguage = useCallback((language: LanguageContextTypes.Language) => {
    i18next.changeLanguage(language)
    channel.postMessage(language)
  }, [])

  const contextValues = useMemo<LanguageContextTypes.Context>(
    () => ({
      changeLanguage,
      languages: LANGUAGE_OPTIONS,
      language: language as LanguageContextTypes.Language,
    }),
    [changeLanguage, language],
  )

  useEffect(() => {
    channel.addEventListener('message', ({ data }) => {
      i18next.changeLanguage(data)
    })

    return () => {
      channel.removeEventListener('message', ({ data }) =>
        i18next.changeLanguage(data),
      )
    }
  }, [changeLanguage])

  return <LanguageContext.Provider {...props} value={contextValues} />
}

export { LanguageContext, LanguageProvider }
