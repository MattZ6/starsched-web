import { StarSchedAPI } from '@starsched/sdk'

import { starschedEnv } from '@/constants/starsched'

import { AuthenticationStorageUtils } from '@/utils/authentication-storage'
import { EventUtils } from '@/utils/event'

const authenticationStoreutils = new AuthenticationStorageUtils()
const eventUtils = new EventUtils()

export const starschedAPI = new StarSchedAPI({
  baseURL: starschedEnv.baseUrl,
  onLogout: () => eventUtils.emit<void>(starschedEnv.sessionExpiredEventName),
  authenticationStore: {
    get: async () => authenticationStoreutils.retrieve(),
    remove: async () => authenticationStoreutils.remove(),
    store: async (input) => authenticationStoreutils.store(input)
  }
})
