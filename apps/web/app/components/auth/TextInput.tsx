import { useId, type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    className?: string;
}

const TextInput = ({ label, className, ...props }: Props) => {
    const id = useId();
    return (
        <div>
            <div className="grid grid-cols-1 gap-1">
                <label htmlFor={id} className="form-input-label">
                    {label}
                </label>
                <input id={id} className={`form-input ${className}`} {...props} />
            </div>
        </div>
    );
};

export default TextInput;
