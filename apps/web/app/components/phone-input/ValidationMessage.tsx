interface Props {
    id: string;
    text: string;
    /** Colours the message rose instead of the neutral zinc hint colour */
    hasError?: boolean;
}

/** Always rendered so the layout doesn't jump; announced politely to screen readers. */
const ValidationMessage = ({ id, text, hasError }: Props) => {
    if (!text) return null;
    return (
        <p id={id} aria-live="polite" className={hasError ? "text-xs text-rose-600" : "text-xs text-zinc-500"}>
            {text}
        </p>
    );
};

export default ValidationMessage;
