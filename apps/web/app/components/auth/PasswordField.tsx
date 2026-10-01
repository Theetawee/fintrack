import { Eye, EyeOff } from "lucide-react";
import { useId, useState, type InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    className?: string;
}

export function PasswordField({ label,className, ...props }: FieldProps) {
    const id = useId();
    const [visible, setVisible] = useState(false);

    return (
        <div className="grid grid-cols-1 gap-1">
            <label htmlFor={id} className="form-input-label">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={visible ? "text" : "password"}
                    className={`form-input ${className} pr-10`}
                    {...props}
                />
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    aria-label={visible ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-zinc-400 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200">
                    {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
        </div>
    );
}
