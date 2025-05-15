import type { ReactNode } from 'react'

export namespace LanguageContextTypes {
  export type Language = 'en' | 'es' | 'pt-BR'

  export type Context = {
    language: Language
    languages: Language[]
    changeLanguage: (language: Language) => void
  }
}

export namespace LanguageProviderTypes {
  export type Props = {
    children: ReactNode
  }
}
