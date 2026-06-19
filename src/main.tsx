import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import "./index.css"
import App from "@/app/App"

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
    throw new Error("Add your Clerk Publishable key to the .env file")
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
