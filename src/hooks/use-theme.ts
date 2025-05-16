import { use } from 'react'

import { ThemeContext } from '@/contexts/theme'

export function useTheme() {
  return use(ThemeContext)
}
