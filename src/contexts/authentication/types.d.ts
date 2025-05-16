import type { ReactNode } from 'react'

export namespace AuthenticationContextTypes {
  export type User = {
    id: string
    role: 'badass' | 'customer'
  }

  export type SignInInput = {
    accessToken: string;
  };

  export type Context = {
    user: User | null
    signIn: (input: SignInInput) => void
    signOut: () => void
  }
}

export namespace AuthenticationProviderTypes {
  export type Props = {
    children: ReactNode
  }
}
