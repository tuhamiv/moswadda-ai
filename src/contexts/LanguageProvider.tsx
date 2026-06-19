import {defaultLocale, type Locale, supportedLocales} from "@/lang"
import {type ReactNode, useEffect} from "react"
import { LanguageContext } from "./LanguageContext"
import {useLocation, useNavigate} from "react-router-dom"

function LanguageProvider({ children }: { children: ReactNode }) {

    const location = useLocation()

    const navigate = useNavigate()

    const getLocaleFromPath = () => {
        const pathParts = location.pathname.split("/").filter(Boolean)
        const firstPart = pathParts[0]
        if (firstPart && supportedLocales.includes(firstPart as Locale)) {
            return firstPart as Locale
        }
        return defaultLocale
    }

    const locale = getLocaleFromPath()

    const isRtl = locale === "ar";

    const changeLocale = (newLocale: Locale) => {
        const currentPath = location.pathname
        const pathParts = currentPath.split('/').filter(Boolean)
        if (pathParts[0] && supportedLocales.includes(pathParts[0] as Locale)) {
            pathParts[0] = newLocale
        } else {
            pathParts.unshift(newLocale)
        }
        const newPath = '/' + pathParts.join('/')
        navigate(newPath, { replace: true })
    }

    const toggleLanguage = () => {
        const newLocale = locale === "ar" ? "en" : "ar"
        changeLocale(newLocale)
    }

    useEffect(() => {
        document.documentElement.dir = isRtl ? "rtl" : "ltr";
        document.documentElement.lang = locale

        localStorage.setItem("locale", locale)
    }, [locale, isRtl])

    return (
        <LanguageContext.Provider value={{ locale, changeLocale, toggleLanguage, isRtl }}>
            {children}
        </LanguageContext.Provider>
    )

}

export default LanguageProvider