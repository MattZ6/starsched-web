type Options = {
  locale: 'pt'
}

export class DateUtils {
  private normalizeLocale(input?: Options): string | undefined {
    if (input?.locale === 'pt') {
      return 'pt-BR'
    }

    return undefined
  }

  formatDate(value: string | Date, options?: Options) {
    const dateValue = new Date(value)

    const locale = this.normalizeLocale(options)

    return new Intl.DateTimeFormat(locale, { dateStyle: 'short' })
      .format(dateValue)
  }

  formatDateTime(value: string | Date, options?: Options) {
    const dateValue = new Date(value)

    const locale = this.normalizeLocale(options)

    return new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeStyle: 'short' })
      .format(dateValue)
  }
}
