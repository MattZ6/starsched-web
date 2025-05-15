import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

import { decodeJwt } from 'jose'

// import { StarSchedConstants } from '@/services/StarSchedAPI/constants'

import { AuthenticationStorageUtils } from '@/utils/authentication-storage'
// import { EventUtils } from '@/utils/event'

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
// const eventUtils = new EventUtils()

const channel = new BroadcastChannel('app-authentication')

const AuthenticationContext = createContext({} as AuthenticationContextTypes.Context)

function AuthenticationProvider(props: AuthenticationProviderTypes.Props) {
  const [user, setUser] = useState<AuthenticationContextTypes.User | null>(() => {
    const auth = authenticationStorageUtils.retrieve()

    if (!auth) {
      return null
    }

    return extractClaims(auth.access_token)
  })

  function saveAuthentication(input: AuthenticationContextTypes.SignInInput) {
    authenticationStorageUtils.store(input)

    const user = extractClaims(input.access_token)

    setUser(user)
  }

  function clearAuthentication() {
    authenticationStorageUtils.remove()

    setUser(null)
  }

  const signIn = useCallback((input: AuthenticationContextTypes.SignInInput) => {
    saveAuthentication(input)

    channel.postMessage(input)
  }, [])

  const signOut = useCallback(() => {
    clearAuthentication()

    channel.postMessage(null)
  }, [])

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
  }, [])

  // useEffect(() => {
  //   eventUtils.subscribe(
  //     StarSchedConstants.events.SESSION_EXPIRED,
  //     clearAuthentication,
  //   )

  //   return () =>
  //     eventUtils.unsubscribe(
  //       StarSchedConstants.events.SESSION_EXPIRED,
  //       clearAuthentication,
  //     )
  // }, [])

  return <AuthenticationContext.Provider value={contextValue} {...props} />
}

export { AuthenticationContext, AuthenticationProvider }
