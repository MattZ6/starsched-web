import type { ReactNode } from 'react'

export namespace ThemeContextTypes {
  export type Theme = 'light' | 'dark' | 'system'

  export type SelectThemeInput = Theme

  export type Context = {
    options: Theme[]
    theme: Theme
    selectTheme: (input: SelectThemeInput) => void
  }
}

export namespace ThemeProviderTypes {
  export type Props = {
    children: ReactNode
  }
}
