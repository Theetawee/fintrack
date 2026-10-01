import { forwardRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

interface Props {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
    /** id of the listbox this input controls */
    listId: string;
    /** id of the highlighted option, for screen readers */
    activeId?: string;
}

const CountrySearch = forwardRef<HTMLInputElement, Props>(
    ({ value, onChange, onKeyDown, placeholder, listId, activeId }, ref) => {
        return (
            <input
                ref={ref}
                type="search"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={activeId}
                aria-label={placeholder}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                autoComplete="off"
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-200 outline-none placeholder:text-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
        );
    },
);
CountrySearch.displayName = "CountrySearch";

export default CountrySearch;
