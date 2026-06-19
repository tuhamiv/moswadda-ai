import { Link } from "react-router-dom"
import {Button} from "@/components/ui/button.tsx";
import {FormattedMessage} from "react-intl";
import useTranslation from "@/hooks/useTranslation.ts";
import {UserButton} from "@clerk/react";
import {useLocaleNavigate} from "@/hooks/useLocaleNavigation.ts";

export function Header() {

  const { isRtl, toggleLanguage } = useTranslation()

  const { getLocalePath } = useLocaleNavigate()

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="glass-card flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to={getLocalePath("/")}
              className="text-sm font-semibold tracking-wide"
            >
              <FormattedMessage id="header.title" defaultMessage="مسودة" />
            </Link>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              <FormattedMessage id="header.subTitle" defaultMessage="ملاحظات ذكية عبر الذكاء الاصطناعي" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={toggleLanguage}>{isRtl ? "English" : "العربية"}</Button>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  )
}
