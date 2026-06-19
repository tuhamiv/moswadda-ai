import {IntlProvider} from "react-intl";
import {type ReactNode} from "react";
import {defaultLocale, messages} from "@/lang";
import useTranslation from "@/hooks/useTranslation.ts";

function IntlWrapper({children}: {children: ReactNode}) {

    const {locale} = useTranslation()

    return <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages[locale]}>{children}</IntlProvider>

}

export default IntlWrapper