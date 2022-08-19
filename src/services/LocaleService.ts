import {I18n} from "i18n";

export class LocaleService
{
    private i18nProvider: I18n;

    /**
     *
     * @param opts
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(opts) {
        this.i18nProvider = opts.i18nProvider;
    }

    /**
     *
     * @returns {string} The current locale code
     */
    getCurrentLocale(): string
    {
        return this.i18nProvider.getLocale();
    }

    /**
     *
     * @returns string[] The list of available locale codes
     */
    getLocales(): string[]
    {
        return this.i18nProvider.getLocales();
    }

    /**
     *
     * @param locale The locale to set. Must be from the list of available locales.
     */
    setLocale(locale: string): void
    {
        if (this.getLocales().indexOf(locale) !== -1) {
            this.i18nProvider.setLocale(locale)
        }
    }

    /**
     *
     * @param string String to translate
     * @param args Extra parameters
     * @returns {string} Translated string
     */
    translate(string: string, args = undefined): string
    {
        return this.i18nProvider.__(string, args)
    }

    /**
     *
     * @param phrase Object to translate
     * @param count The plural number
     * @returns {string} Translated string
     */
    translatePlurals(phrase: string, count: number) : string
    {
        return this.i18nProvider.__n(phrase, count)
    }
}