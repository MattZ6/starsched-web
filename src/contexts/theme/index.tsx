import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { LocalStorageUtils } from '@/utils/local-storage'

import type { ThemeContextTypes, ThemeProviderTypes } from './types'

const KEY = 'color-mode'
const localStorageUtils = new LocalStorageUtils()

function getColorModeFromLocalStorage() {
  return localStorageUtils.retrieve<ThemeContextTypes.Theme>(KEY)
}

function getColorModeFromDevice() {
  const mediaQueryList = matchMedia('(prefers-color-scheme: dark)')

  const hasMediaQueryPreference = typeof mediaQueryList.matches === 'boolean'

  if (!hasMediaQueryPreference) {
    return null
  }

  return mediaQueryList.matches ? 'dark' : 'light'
}

const ThemeContext = createContext({} as ThemeContextTypes.Context)

const THEMES_CLASSES = {
  light: 'light',
  dark: 'dark',
}

const channel = new BroadcastChannel('app-theme')

function ThemeProvider({ children }: ThemeProviderTypes.Props) {
  const html = useRef(document.documentElement)
  const [theme, setTheme] = useState<ThemeContextTypes.Theme>(() => {
    const colorModeFromLocalStorage = getColorModeFromLocalStorage()

    if (colorModeFromLocalStorage) {
      return colorModeFromLocalStorage
    }

    return 'light'
  })

  const selectTheme = useCallback((input: ThemeContextTypes.Theme) => {
    channel.postMessage(input)
    setTheme(input)
  }, [])

  const options = useMemo<ThemeContextTypes.Theme[]>(
    () => ['light', 'dark', 'system'],
    [],
  )

  function applyColorMode(colorMode: 'light' | 'dark') {
    const classToRemove =
      colorMode === 'dark' ? THEMES_CLASSES.light : THEMES_CLASSES.dark

    html.current.classList.add(THEMES_CLASSES[colorMode])
    html.current.classList.remove(classToRemove)

    html.current.style.colorScheme = colorMode
  }

  useEffect(() => localStorageUtils.store(KEY, theme), [theme])

  useEffect(() => {
    if (theme !== 'system') {
      return
    }

    const darkModeMediaQueryList = window.matchMedia(
      '(prefers-color-scheme: dark)',
    )
    const lightModeMediaQueryList = window.matchMedia(
      '(prefers-color-scheme: light)',
    )

    const colorMode = getColorModeFromDevice() ?? 'light'

    applyColorMode(colorMode)

    darkModeMediaQueryList.addEventListener('change', (e) => {
      applyColorMode(e.matches ? 'dark' : 'light')
    })

    lightModeMediaQueryList.addEventListener('change', (e) => {
      applyColorMode(e.matches ? 'light' : 'dark')
    })

    return () => {
      darkModeMediaQueryList.removeEventListener('change', (e) => {
        applyColorMode(e.matches ? 'dark' : 'light')
      })
      lightModeMediaQueryList.removeEventListener('change', (e) => {
        applyColorMode(e.matches ? 'light' : 'dark')
      })
    }
  }, [theme])

  useEffect(() => {
    if (theme === 'system') {
      return
    }

    applyColorMode(theme)
  }, [theme])

  useEffect(() => {
    channel.addEventListener('message', ({ data }) => setTheme(data))

    return () => {
      channel.removeEventListener('message', ({ data }) => setTheme(data))
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, selectTheme, options }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
