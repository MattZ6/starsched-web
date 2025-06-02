type Options = {
  locale: 'pt'
}

export abstract class PriceUtils {
  private static normalizeLocale(input?: Options): string | undefined {
    if (input?.locale === 'pt') {
      return 'pt-BR'
    }

    return undefined
  }

  static formatPrice(priceInCents: number, options?: Options) {
    const value = Number(priceInCents) / 100

    const locale = this.normalizeLocale(options)

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }
}
