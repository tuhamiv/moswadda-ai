import ar from "./ar.json"
import en from "./en.json"

export const messages = {ar, en}

export const defaultLocale = "ar"

export const supportedLocales = ["ar", "en"] as const

export type Locale = typeof supportedLocales[number]
