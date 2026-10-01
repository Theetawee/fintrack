import { Fragment, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cx } from "./utils";
import type { Country } from "./types";

interface Props {
    id: string;
    /** Prefix for option ids: `${idPrefix}-${countryCode}` */
    idPrefix: string;
    items: Country[];
    activeIndex: number;
    selectedCode: string;
    /** Show "Popular" / "All countries" headings (only when not searching) */
    showGroups: boolean;
    /** How many pinned countries come first in `items` */
    popularCount: number;
    renderFlag: (code: string) => ReactNode;
    onSelect: (country: Country) => void;
    onHover: (index: number) => void;
}

const CountryList = ({
    id,
    idPrefix,
    items,
    activeIndex,
    selectedCode,
    showGroups,
    popularCount,
    onSelect,
    onHover,
}: Props) => {
    const listRef = useRef<HTMLUListElement>(null);

    // Keep the highlighted row visible while arrowing through the list
    useEffect(() => {
        listRef.current?.querySelector("[data-active]")?.scrollIntoView({ block: "nearest" });
    }, [activeIndex, items]);

    return (
        <ul
            id={id}
            ref={listRef}
            role="listbox"
            aria-label="Countries"
            className="max-h-80 overflow-y-auto overscroll-contain py-1">
            {items.length === 0 && (
                <li role="presentation" className="px-3 py-6 text-center text-sm text-gray-400">
                    No countries found
                </li>
            )}

            {items.map((c, i) => {
                const active = i === activeIndex;
                const selected = c.code === selectedCode;
                return (
                    <Fragment key={c.code}>
                        {showGroups && i === 0 && (
                            <li className="px-3 pb-1 pt-2 text-xs font-medium text-gray-400">
                                Popular
                            </li>
                        )}
                        {showGroups && i === popularCount && (
                            <li className="px-3 pb-1 pt-3 text-xs font-medium text-gray-400">
                                All countries
                            </li>
                        )}
                        <li
                            id={`${idPrefix}-${c.code}`}
                            role="option"
                            aria-selected={selected}
                            data-active={active || undefined}
                            data-selected={selected || undefined}
                            onClick={() => onSelect(c)}
                            onMouseMove={() => !active && onHover(i)}
                            className={cx(
                                "flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                                active ? "bg-primary-50 dark:bg-primary-900/50" : "hover:bg-gray-50 dark:hover:bg-gray-900",
                            )}>
                            <span
                                className="  w-6 shrink-0 text-center text-lg leading-none"
                                aria-hidden="true">
                                <span
                                    className={`fi fi-${c.code.toLowerCase()} rounded`}></span>{" "}
                            </span>
                            <span
                                className={cx(
                                    "min-w-0 flex-1 truncate",
                                    selected ? "font-medium text-gray-900 dark:text-gray-200" : "text-gray-700 dark:text-gray-400",
                                )}>
                                {c.name}
                            </span>
                            <span className="text-xs text-gray-400">+{c.dialCode}</span>
                            {selected && (
                                <Check
                                    className="h-4 w-4 shrink-0 text-primary-600"
                                    strokeWidth={2}
                                />
                            )}
                        </li>
                    </Fragment>
                );
            })}
        </ul>
    );
};

export default CountryList;
