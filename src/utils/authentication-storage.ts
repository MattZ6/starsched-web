import { LocalStorageUtils } from './local-storage'

type SaveInput = {
  access_token: string
  refresh_token: string
}

type RetrieveOutput = {
  access_token: string
  refresh_token: string
}

export class AuthenticationStorageUtils {
  private ACCESS_TOKEN_STORAGE_KEY = 't'
  private REFRESH_TOKEN_STORAGE_KEY = 'r'

  private localStorageUtils: LocalStorageUtils

  constructor() {
    this.localStorageUtils = new LocalStorageUtils()
  }

  store(input: SaveInput) {
    this.localStorageUtils.store(this.ACCESS_TOKEN_STORAGE_KEY, input.access_token)
    this.localStorageUtils.store(this.REFRESH_TOKEN_STORAGE_KEY, input.refresh_token)
  }

  retrieve(): RetrieveOutput | null {
    const access_token = this.localStorageUtils.retrieve<string>(
      this.ACCESS_TOKEN_STORAGE_KEY,
    )
    const refresh_token = this.localStorageUtils.retrieve<string>(
      this.REFRESH_TOKEN_STORAGE_KEY,
    )

    if (!access_token || !refresh_token) {
      return null
    }

    return {
      access_token,
      refresh_token,
    }
  }

  remove() {
    this.localStorageUtils.remove(this.ACCESS_TOKEN_STORAGE_KEY)
    this.localStorageUtils.remove(this.REFRESH_TOKEN_STORAGE_KEY)
  }
}
