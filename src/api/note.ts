import type {Note} from "@/types";
import {API_BASE_URL} from "@/lib/utils.ts";

const fetchNotesApi = async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/notes`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    const data: { notes: Note[] } = await response.json()

    return data.notes
}

const createNoteApi = async (token: string, title: string) => {
    const response = await fetch(`${API_BASE_URL}/api/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify( { title, content: "" } )
    })

    const data: { note: Note } = await response.json()

    return data.note
}

const fetchNoteApi = async (token: string, id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
        headers: {
            method: "GET",
            Authorization: `Bearer ${token}`
        }
    })

    const data: { note: Note } = await response.json()

    return data.note
}

const saveNoteApi = async (token: string, note: Pick<Note, "id" | "title" | "content"> ) => {
    await fetch(`${API_BASE_URL}/api/notes/${note.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: note.title, content: note.content })
    })
}

const deleteNoteApi = async (token: string, id: string) => {
    await fetch(`${API_BASE_URL}/api/notes/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export {fetchNotesApi, createNoteApi, fetchNoteApi, saveNoteApi, deleteNoteApi}
