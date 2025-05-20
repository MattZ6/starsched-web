import { atomWithStorage } from "jotai/utils";

import { LocalStorageUtils } from "@/utils/local-storage";

const localStorageUtils = new LocalStorageUtils()

export const selectedCompanySlugAtom = atomWithStorage<string | null>('c', null, {
  getItem: (key, initialValue) => {
    const value = localStorageUtils.retrieve<string>(key)

    return value ?? initialValue;
  },
  removeItem: (key) => localStorageUtils.remove(key),
  setItem: (key, newValue) => localStorageUtils.store(key, newValue)
})
