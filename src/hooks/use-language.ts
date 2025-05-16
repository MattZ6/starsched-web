import { use } from 'react'

import { LanguageContext } from '@/contexts/language'

export function useLanguage() {
  return use(LanguageContext)
}
