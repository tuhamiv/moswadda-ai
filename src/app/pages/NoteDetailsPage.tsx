import {GlassCard} from "@/components/common/GlassCard.tsx"
import {Button} from "@/components/ui/button.tsx"
import {ArrowLeft, ChevronDown, Languages, RefreshCw, Sparkles, Trash2} from "lucide-react"
import {Separator} from "@/components/ui/separator.tsx"
import {Textarea} from "@/components/ui/textarea.tsx"
import {Link, useParams} from "react-router-dom"
import {Input} from "@/components/ui/input.tsx"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx"
import useNote from "@/hooks/useNote.ts"
import AutoSaveIndicator from "@/components/AutoSaveIndicator.tsx"
import {detectTextDirection} from "@/lib/utils.ts"
import {useMemo} from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx"
import {FormattedMessage, useIntl} from "react-intl"
import useTranslation from "@/hooks/useTranslation.ts"
import {useLocaleNavigate} from "@/hooks/useLocaleNavigation.ts";

function NoteDetailsPage() {

    const { id } = useParams()

    const { localeNavigate } = useLocaleNavigate()

    const {isRtl} = useTranslation()

    const intl = useIntl()

    const {note, handleTitleChange, handleContentChange, autoSaveStatus, deleteNote, summarizeNote, rewriteNote, translateNote} = useNote(id)

    const handleDeleteNoteConfirm = async () => {
        const success = await deleteNote()
        if (success) localeNavigate("/")
    }

    const textDirection = useMemo(() => {
        if (!note?.content) return isRtl ? "rtl" : "ltr"
        return detectTextDirection(note?.content ?? "")
    }, [note?.content, isRtl])

    return (
        <GlassCard className="flex flex-col p-6 gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                        <Link to="/">
                            <ArrowLeft className={isRtl ? "rotate-180" : ""} />
                            <FormattedMessage id="note.back" defaultMessage="الرجوع إلي الملاحظات" />
                        </Link>
                    </Button>
                    <AutoSaveIndicator autoSaveStatus={autoSaveStatus} />
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <Trash2 />
                            <FormattedMessage id="note.delete" defaultMessage="حذف الملاحظة" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm">
                        <AlertDialogHeader>
                            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"><Trash2 /></AlertDialogMedia>
                            <AlertDialogTitle>
                                <FormattedMessage id="note.delete.confirm.title" defaultMessage="حذف الملاحظة؟" />
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <FormattedMessage id="note.delete.confirm.description" defaultMessage="لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف ملاحظتك نهائياً." />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel variant="outline">
                                <FormattedMessage id="note.delete.cancel" defaultMessage="إلغاء" />
                            </AlertDialogCancel>
                            <AlertDialogAction variant="destructive" onClick={handleDeleteNoteConfirm}>
                                <FormattedMessage id="note.delete.confirm" defaultMessage="تأكيد" />
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={summarizeNote}>
                    <Sparkles />
                    <FormattedMessage id="note.summary" defaultMessage="تلخيص" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <RefreshCw />
                            <FormattedMessage id="note.rewrite" defaultMessage="حدد وضع إعادة الكتابة" />
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => rewriteNote("comedy")}>
                                <FormattedMessage id="note.rewrite.mode.comedy" defaultMessage="كوميدي" />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => rewriteNote("formal")}>
                                <FormattedMessage id="note.rewrite.mode.formal" defaultMessage="رسمي" />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => rewriteNote("casual")}>
                                <FormattedMessage id="note.rewrite.mode.casual" defaultMessage="عفوي" />
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" onClick={translateNote}>
                    <Languages />
                    <FormattedMessage id="note.translate" defaultMessage="الترجمة" />
                </Button>
            </div>
            <Separator />
            <Input className="border-none focus-visible:ring-0 text-2xl! font-medium bg-transparent" value={note?.title ?? ""} onChange={handleTitleChange} />
            <Separator />
            <Textarea
                dir={textDirection}
                rows={20}
                className="min-h-64 border-none focus-visible:ring-0 bg-transparent"
                placeholder={intl.formatMessage({id: "note.content.description"})}
                value={note?.content ?? ""}
                onChange={handleContentChange}
            />
        </GlassCard>
    )
}

export default NoteDetailsPage
