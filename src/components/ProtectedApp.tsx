import type {ReactNode} from "react";
import {useAuth} from "@clerk/react";
import {Loader} from "lucide-react";
import {Navigate} from "react-router-dom";

function ProtectedApp({children}: {children: ReactNode}) {

    const {isSignedIn, isLoaded} = useAuth()

    if (!isLoaded) return (
        <div className="flex items-center justify-center h-screen">
            <Loader />
        </div>
    )

    if (!isSignedIn) return (
        <Navigate to="/login" replace />
    )

    return (
        <>
            {children}
        </>
    )

}

export default ProtectedApp