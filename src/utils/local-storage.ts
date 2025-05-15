
export class LocalStorageUtils {
  private APP_STORAGE_KEY_PREFIX = 's'

  mountStorageKey(key: string) {
    const mode = import.meta.env.MODE

    return `${this.APP_STORAGE_KEY_PREFIX}:${mode}:${key}`
  }

  store<T = unknown>(key: string, value: T) {
    let data = value

    if (typeof value === 'object') {
      data = JSON.stringify(value) as T
    }

    localStorage.setItem(this.mountStorageKey(key), data as string)
  }

  retrieve<T = unknown>(key: string) {
    const item = localStorage.getItem(this.mountStorageKey(key))

    if (!item) {
      return undefined
    }

    try {
      const payload = JSON.parse(item)

      return payload as T
    } catch {
      return item as T
    }
  }

  remove(key: string) {
    localStorage.removeItem(this.mountStorageKey(key))
  }
}
