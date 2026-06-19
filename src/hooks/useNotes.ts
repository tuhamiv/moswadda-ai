import {useAuth} from "@clerk/react"
import {useEffect, useMemo, useState} from "react"
import {createNoteApi, fetchNotesApi} from "@/api/note.ts";
import type {Note} from "@/types";
import {useIntl} from "react-intl";

const useNotes = () => {

    const { getToken } = useAuth()

    const [query, setQuery] = useState<string>("")

    const [notes, setNotes] = useState<Note[]>([])

    const intl = useIntl()

    const filteredNotes = useMemo(() => {
        if (!query.trim()) return notes
        const searchQuery = query.toLowerCase()
        return notes.filter(note => note.title.toLowerCase().includes(searchQuery))
    }, [query, notes])

    useEffect(() => {
        const fetchNotes = async () => {
            const token = await getToken()
            if (token) {
                const data = await fetchNotesApi(token ?? "")
                setNotes(data)
            }
        }
        void fetchNotes()
    }, [getToken])

    const createNote = async () => {
        const token = await getToken()
        if (token) {
            const note = await createNoteApi(token ?? "", intl.formatMessage({ id: "note.title.default" }))
            setNotes(prev => [...prev, note])
            return note
        }
    }

    return {createNote, query, setQuery, filteredNotes}
}

export default useNotes
