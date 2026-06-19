import { useNavigate } from 'react-router-dom'
import useTranslation from "@/hooks/useTranslation.ts";

export function useLocaleNavigate() {
    const navigate = useNavigate()
    const { locale } = useTranslation()

    const localeNavigate = (path: string | number, options?: { replace?: boolean; state?: unknown }) => {
        if (typeof path === 'number') {
            navigate(path)
            return
        }
        const cleanPath = path.startsWith('/') ? path.slice(1) : path
        const localizedPath = `/${locale}/${cleanPath}`.replace(/\/$/, '') || `/${locale}`

        navigate(localizedPath, options)
    }

    const getLocalePath = (path: string) => {
        const cleanPath = path.startsWith('/') ? path.slice(1) : path
        return `/${locale}/${cleanPath}`.replace(/\/$/, '') || `/${locale}`
    }

    return { localeNavigate, getLocalePath, navigate }
}