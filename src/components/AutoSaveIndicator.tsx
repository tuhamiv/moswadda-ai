import type {AutoSaveStatus} from "@/types";
import {CircleAlert, CircleCheck, LoaderCircle} from "lucide-react";
import {FormattedMessage} from "react-intl";

function AutoSaveIndicator({autoSaveStatus}: { autoSaveStatus: AutoSaveStatus }) {
    switch (autoSaveStatus) {
        case "unsaved": return (
            <div className="flex items-center gap-2 text-sm text-orange-500">
                <CircleAlert className="size-4" />
                <span>
                    <FormattedMessage id="note.save.unsaved" defaultMessage="التغييرات غير محفوظة" />
                </span>
            </div>
        )
        case "saving": return (
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <LoaderCircle />
                <span>
                    <FormattedMessage id="note.save.saving" defaultMessage="جاري الحفظ" />
                </span>
            </div>
        )
        case "saved": return (
            <div className="flex items-center gap-2 text-sm text-green-500">
                <CircleCheck className="size-4"/>
                <span>
                    <FormattedMessage id="note.save.saved" defaultMessage="تم الحفظ" />
                </span>
            </div>
        )
        case "initial":
        default:
            return null;
    }
}

export default AutoSaveIndicator
