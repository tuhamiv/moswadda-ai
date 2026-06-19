import {createContext} from "react";
import type {Locale} from "@/lang";

export type LanguageContextType = {
    locale: Locale
    changeLocale: (locale: Locale) => void
    isRtl: boolean
    toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)
