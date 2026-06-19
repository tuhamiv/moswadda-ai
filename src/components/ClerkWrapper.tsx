import type {ReactNode} from "react"
import {ClerkProvider} from "@clerk/react";
import useTranslation from "@/hooks/useTranslation.ts";
import {arSA, enUS} from "@clerk/localizations";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
    throw new Error("Add your Clerk Publishable key to the .env file")
}

function ClerkWrapper({children}: {children: ReactNode}) {

    const {locale} = useTranslation()

    const clerkLocale = locale === "ar" ? arSA : enUS

    return (
        <>
            <ClerkProvider publishableKey={publishableKey} localization={clerkLocale}>
                {children}
            </ClerkProvider>
        </>
    )
}

export default ClerkWrapper
