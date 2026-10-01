import { Check, X } from "lucide-react";
import type { PhoneStatus } from "./types";

/** Check when valid, cross when invalid, nothing otherwise. */
const StatusIcon = ({ status }: { status: PhoneStatus }) => {
    if (status === "valid") {
        return <Check className="mr-3 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />;
    }
    if (status === "invalid") {
        return <X className="mr-3 h-4 w-4 shrink-0 text-rose-500" strokeWidth={2} />;
    }
    return null;
};

export default StatusIcon;
