import {FormattedMessage, useIntl} from "react-intl"

export function Footer() {

    const intl = useIntl()

    return (
        <footer className="mt-8 border-t border-black/5">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-xs text-zinc-500 sm:px-6 lg:px-8">
                <span className="hidden sm:inline">
                    {intl.formatMessage({ id: "footer.copyright", defaultMessage: "مسودتي الذكية {year} ©" }, {year: new Date().getFullYear() })}
                </span>
                <span>
                    <FormattedMessage id="footer.rights" defaultMessage="جميع الحقوق محفوظة" />
                </span>
            </div>
        </footer>
    )
}
