'use client'

import { useTheme } from "next-themes"

export function ThemeSwitcher() {
  const { themes, setTheme } = useTheme()

  return (
    <div>
      {themes.map(theme => (
        <button key={theme} onClick={() => setTheme(theme)} className="text-base-12">
          {theme}
        </button>
      ))}
    </div>
  )
}
