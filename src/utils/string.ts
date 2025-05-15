export class StringUtils {
  extractInitials(value: string) {
    const words = String(value ?? '')
      .trim()
      .split(' ')
      .filter((word) => !!word.trim())

    if (!words.length) {
      return ''
    }

    const [firstWord] = words

    const wordsToInitials = [firstWord]

    if (words.length > 1) {
      const lastWord = words[words.length - 1]

      wordsToInitials.push(lastWord)
    }

    const initials = wordsToInitials
      .map((word) => word.substring(0, 1))
      .join('')

    return initials
  }

  contractName(name: string) {
    const parsedName = String(name ?? '').trim()

    const words = parsedName.split(' ').filter((word) => !!word.trim())

    if (!words.length) {
      return ''
    }

    const [firstName] = words

    const names = [firstName]

    if (words.length > 1) {
      const lastName = words[words.length - 1]
      const onlyFirstLetter = this.extractInitials(lastName).toUpperCase()

      names.push(`${onlyFirstLetter}.`)
    }

    return names.join(' ')
  }
}
