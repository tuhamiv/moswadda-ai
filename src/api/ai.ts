import {API_BASE_URL} from "@/lib/utils.ts";
import type {RewrittenMode} from "@/types";

const summarizeNoteApi = async (token: string, id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/ai/summarize`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({noteId: id})
    })

    const data: { result: string } = await response.json()

    return data.result
}

const rewriteNoteApi = async (token: string, id: string, mode: RewrittenMode) => {
    const response = await fetch(`${API_BASE_URL}/api/ai/rewrite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({noteId: id, mode: mode})
    })

    const data: { result: string } = await response.json()

    return data.result
}

const translateNoteApi = async (token: string, id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/ai/translate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({noteId: id})
    })

    const data: { result: string } = await response.json();

    return data.result
}

export {summarizeNoteApi, rewriteNoteApi, translateNoteApi}