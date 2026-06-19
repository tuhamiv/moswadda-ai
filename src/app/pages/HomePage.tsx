import { GlassCard } from "@/components/common/GlassCard"
import {Button} from "@/components/ui/button.tsx"
import {Plus, Search} from "lucide-react"
import {Input} from "@/components/ui/input.tsx"
import useNotes from "@/hooks/useNotes.ts"
import {FormattedMessage, useIntl} from "react-intl"
import {type ChangeEvent} from "react"
import {useLocaleNavigate} from "@/hooks/useLocaleNavigation.ts";

export function HomePage() {

    const {createNote, query, setQuery, filteredNotes} = useNotes()

    const { localeNavigate } = useLocaleNavigate()

    const intl = useIntl()

    const handleCreateNoteClick = async () => {
        const note = await createNote()
        if (note) localeNavigate(`/notes/${note.id}`)
    }

    return (
        <div className="space-y-12">
            <GlassCard className="flex flex-col px-4 py-6 gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-xl font-medium">
                        <FormattedMessage id="card.title" defaultMessage="الملاحظات" />
                    </span>
                    <Button onClick={handleCreateNoteClick}>
                        <Plus />
                        <span className="text-base font-normal">
                            <FormattedMessage id="card.create" defaultMessage="إضافة ملاحظة" />
                        </span>
                    </Button>
                </div>
                <div className="flex items-center relative gap-2">
                    <Search className="absolute size-4 start-3 text-gray-500" />
                    <Input className="bg-gray-100/50 ps-9" value={query} onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} placeholder={intl.formatMessage({id: "home.search.placeholder", defaultMessage: "البحث..."})} />
                </div>
                <div className="flex flex-col gap-3">{filteredNotes.length > 0 ? (filteredNotes.map((note) => (
                        <GlassCard onClick={() => localeNavigate(`/notes/${note.id}`)} className="border-2 p-4 cursor-pointer" key={note.id}>{note.title}</GlassCard>
                    ))
                ) : (
                    <div className="flex items-center justify-center m-8 text-muted-foreground">
                        {query ? <FormattedMessage id="home.search.noResult" defaultMessage="لا توجد ملاحظات مطابقة لبحثك"/> : <FormattedMessage id="home.notes.empty" defaultMessage="لا توجد ملاحظات" /> }
                    </div>
                )}</div>
            </GlassCard>
        </div>
    )
}
