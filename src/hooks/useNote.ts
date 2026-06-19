import {type ChangeEvent, useCallback, useEffect, useState} from "react";
import {useAuth} from "@clerk/react";
import {fetchNoteApi, saveNoteApi, deleteNoteApi} from "@/api/note.ts";
import type {AutoSaveStatus, Note, RewrittenMode} from "@/types";
import {toast} from "sonner";
import {rewriteNoteApi, summarizeNoteApi, translateNoteApi} from "@/api/ai.ts";
import {useIntl} from "react-intl";

const useNote = (id: string | undefined) => {

    const { getToken } = useAuth()

    const [note, setNote] = useState<Note | null>(null)

    const [noteEdited, setNoteEdited] = useState<boolean>(false)

    const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>("initial")

    const intl = useIntl()

    useEffect(() => {
        if (!id) return
        const fetchNote = async () => {
            const token = await getToken()
            setNote(await fetchNoteApi(token ?? "", id))
        }
        void fetchNote()
    }, [getToken, id])

    const saveNote = useCallback(async () => {
        if (!id || !note) return
        const token = await getToken()
        if (token) {
            const payload = { id: note.id, title: note.title, content: note.content }
            setAutoSaveStatus("saving")
            await saveNoteApi(token, payload)
            setNoteEdited(false)
            setAutoSaveStatus("saved")
        }
    }, [getToken, id, note])

    useEffect(() => {
        if (!note || !noteEdited) return
        const timeout = setTimeout(() => {void saveNote()}, 2000)
        return () => clearTimeout(timeout)
    }, [note?.title, note?.content, noteEdited, saveNote]);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setNote(prev => prev ? ({ ...prev, title: e.target.value }) : null)
        setNoteEdited(true)
        setAutoSaveStatus("unsaved")
    }

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNote(prev => prev ? ({ ...prev, content: e.target.value }) : null)
        setNoteEdited(true)
        setAutoSaveStatus("unsaved")
    }

    const deleteNote = async () => {
        if (!id) return false
        const token = await getToken()
        if (token) {
            await deleteNoteApi(token, id)
            toast.success(intl.formatMessage({id: "note.delete.success", defaultMessage: "تم حذف الملاحظة بنجاح"}))
            return true
        }
        toast.error(intl.formatMessage({id: "note.delete.fail", defaultMessage: "فشل حذف الملاحظة"}))
        return false
    }

    const summarizeNote = async () => {
        if (!id) return
        const token = await getToken()
        if (token) {
            const summarization = await summarizeNoteApi(token, id)
            setNoteEdited(true)
            setNote(prev => prev ? ({ ...prev, content: summarization }) : null)
            toast.success(intl.formatMessage({id: "note.summary.success", defaultMessage: "تم تلخيص الملاحظة بنجاح"}))
            return
        }
        toast.error(intl.formatMessage({id: "note.summary.fail", defaultMessage: "فشل تلخيص الملاحظة"}))
    }

    const rewriteNote = async (mode: RewrittenMode) => {
        if (!id) return
        const token = await getToken()
        if (token) {
            const rewritten = await rewriteNoteApi(token, id, mode)
            setNoteEdited(true)
            setNote(prev => prev ? ({ ...prev, content: rewritten }) : null)
            toast.success(intl.formatMessage({id: "note.rewrite.success", defaultMessage: "تم إعادة كتابة الملاحظة بنجاح"}))
            return
        }
        toast.error(intl.formatMessage({id: "note.rewrite.fail", defaultMessage: "فشل إعادة الكتابة الملاحظة"}))
    }

    const translateNote = async () => {
        if (!id) return
        const token = await getToken()
        if (token) {
            const translation = await translateNoteApi(token, id)
            setNoteEdited(true)
            setNote(prev => prev ? ({ ...prev, content: translation }) : null)
            toast.success(intl.formatMessage({id: "note.translate.success", defaultMessage: "تم ترجمة الملاحظة بنجاح"}))
            return
        }
        toast.error(intl.formatMessage({id: "note.translate.fail", defaultMessage: "فشل ترجمة الملاحظة"}))
    }

    return {note, handleTitleChange, handleContentChange, autoSaveStatus, deleteNote, summarizeNote, rewriteNote, translateNote}
}

export default useNote