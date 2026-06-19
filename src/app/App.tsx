import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

import { AppLayout } from "@/app/layout/AppLayout"
import { HomePage } from "@/app/pages/HomePage"
import { NotFoundPage } from "@/app/pages/NotFoundPage"
import SignUpPage from "@/app/pages/SignUpPage.tsx";
import SignInPage from "@/app/pages/SignInPage.tsx";
import NoteDetailsPage from "@/app/pages/NoteDetailsPage.tsx";
import ProtectedApp from "@/components/ProtectedApp.tsx";
import LocaleRoute from "@/components/LocaleRoute.tsx";
import {defaultLocale} from "@/lang";
import IntlWrapper from "@/components/IntlWrapper.tsx";
import LanguageProvider from "@/contexts/LanguageProvider.tsx";
import ClerkWrapper from "@/components/ClerkWrapper.tsx";

export default function App() {
    return (
        <BrowserRouter basename="/moswadda-ai">
            <LanguageProvider>
                <IntlWrapper>
                    <ClerkWrapper>
                        <Routes>
                            <Route path="/" element={<LocaleRoute />} />

                            <Route path="/:locale">

                                <Route path="register" element={<SignUpPage />} />
                                <Route path="login" element={<SignInPage />} />

                                <Route element={
                                    <ProtectedApp>
                                        <AppLayout />
                                    </ProtectedApp>
                                }>
                                    <Route index element={<HomePage />} />
                                    <Route path="notes/:id" element={<NoteDetailsPage />} />
                                    <Route path="*" element={<NotFoundPage />} />
                                </Route>

                            </Route>

                            <Route path="*" element={<Navigate to={`/${defaultLocale}`} replace />} />
                        </Routes>
                    </ClerkWrapper>
                </IntlWrapper>
            </LanguageProvider>
        </BrowserRouter>
    )
}
