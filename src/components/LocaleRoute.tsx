import {defaultLocale, type Locale, supportedLocales} from "@/lang"
import {Navigate} from "react-router-dom"

function LocaleRoute() {

    const savedLocale = localStorage.getItem("locale") || defaultLocale

    const locale = supportedLocales.includes(savedLocale as Locale) ? savedLocale : defaultLocale

    return (
        <>
            <Navigate to={`/${locale}`} replace />
        </>
    )
}

export default LocaleRoute