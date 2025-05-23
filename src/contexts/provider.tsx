import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AlertModalProvider } from '@/providers/alert-modal'
import { ConfirmationModalProvider } from '@/providers/confirmation-modal'

import { Toaster } from '@/components/ui/sonner'

import { AuthenticationProvider } from './authentication'
import { LanguageProvider } from './language'
import { ThemeProvider } from './theme'

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

export function Provider(props: Props) {
  return (
    <ThemeProvider>
      <>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <AuthenticationProvider>
              <BrowserRouter {...props} />
            </AuthenticationProvider>
          </QueryClientProvider>
        </LanguageProvider>

        <AlertModalProvider />
        <ConfirmationModalProvider />
        <Toaster />
      </>
    </ThemeProvider>
  )
}
