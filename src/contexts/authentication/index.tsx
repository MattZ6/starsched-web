import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { decodeJwt } from 'jose'

import { starschedEnv } from '@/constants/starsched'
import { AuthenticationStorageUtils } from '@/utils/authentication-storage'
import { EventUtils } from '@/utils/event'

import type {
  AuthenticationContextTypes,
  AuthenticationProviderTypes,
} from './types'

function extractClaims(accessToken: string) {
  const claims = decodeJwt(accessToken)

  return {
    id: String(claims.sub ?? ''),
    role: claims.role as AuthenticationContextTypes.User['role'],
  }
}

const authenticationStorageUtils = new AuthenticationStorageUtils()
const eventUtils = new EventUtils()

const channel = new BroadcastChannel('app-authentication')

const AuthenticationContext = createContext({} as AuthenticationContextTypes.Context)

function AuthenticationProvider(props: AuthenticationProviderTypes.Props) {
  const queryClient = useQueryClient()
  const [user, setUser] = useState<AuthenticationContextTypes.User | null>(() => {
    const accessToken = authenticationStorageUtils.retrieveAccessToken()

    if (!accessToken) {
      return null
    }

    return extractClaims(accessToken)
  })

  function saveAuthentication({ accessToken }: AuthenticationContextTypes.SignInInput) {
    const user = extractClaims(accessToken)

    setUser(user)
  }

  const clearAuthentication = useCallback(() => {
    queryClient.clear()

    authenticationStorageUtils.remove()

    setUser(null)
  }, [queryClient])

  const signIn = useCallback((input: AuthenticationContextTypes.SignInInput) => {
    saveAuthentication(input)

    channel.postMessage(input)
  }, [])

  const signOut = useCallback(() => {
    clearAuthentication()

    channel.postMessage(null)
  }, [clearAuthentication])

  const contextValue = useMemo<AuthenticationContextTypes.Context>(
    () => ({ user, signIn, signOut }),
    [user, signIn, signOut],
  )

  useEffect(() => {
    function handleAuthenticaionChanged({
      data,
    }: MessageEvent<AuthenticationContextTypes.SignInInput | undefined>) {
      if (data) {
        saveAuthentication(data)
      } else {
        clearAuthentication()
      }
    }

    channel.addEventListener('message', handleAuthenticaionChanged)

    return () => {
      channel.removeEventListener('message', handleAuthenticaionChanged)
    }
  }, [clearAuthentication])

  useEffect(() => {
    eventUtils.subscribe(
      starschedEnv.sessionExpiredEventName,
      clearAuthentication,
    )

    return () =>
      eventUtils.unsubscribe(
        starschedEnv.sessionExpiredEventName,
        clearAuthentication,
      )
  }, [clearAuthentication])

  return <AuthenticationContext.Provider value={contextValue} {...props} />
}

export { AuthenticationContext, AuthenticationProvider }
