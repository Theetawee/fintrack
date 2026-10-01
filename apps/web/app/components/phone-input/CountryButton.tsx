import { ChevronDown } from "lucide-react";
import type { Country } from "./types";

interface Props {
    country?: Country;
    onClick: () => void;
    disabled?: boolean;
}

/** The flag + dial code button that opens the country picker. */
const CountryButton = ({ country, onClick, disabled }: Props) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-haspopup="dialog"
            aria-label={`Country: ${country?.name}, +${country?.dialCode}. Change country`}
            className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 dark:border-gray-700 px-3 py-2 text-sm dark:text-gray-300 text-gray-700 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
            <span className="  text-lg leading-none" aria-hidden="true">
                {country && <span className={`fi fi-${country.code.toLowerCase()} rounded`}></span>}
            </span>
            <span aria-hidden="true">+{country?.dialCode}</span>
            <ChevronDown className="h-4 w-4 text-gray-400" strokeWidth={1.75} />
        </button>
    );
};

export default CountryButton;
