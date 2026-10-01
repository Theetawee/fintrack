import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme/useTheme";

const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
] as const;

const GAP = 8; // space between trigger and menu
const MARGIN = 8; // minimum space from viewport edges

export function ThemeToggle() {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback(() => {
        const trigger = triggerRef.current;
        const menu = menuRef.current;
        if (!trigger || !menu) return;

        const t = trigger.getBoundingClientRect();
        const { width, height } = menu.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Vertical: prefer below, flip above if it doesn't fit and there's more room up there
        const spaceBelow = vh - t.bottom - GAP - MARGIN;
        const spaceAbove = t.top - GAP - MARGIN;
        const placeAbove = height > spaceBelow && spaceAbove > spaceBelow;
        const top = placeAbove ? t.top - GAP - height : t.bottom + GAP;

        // Horizontal: prefer right edges aligned, fall back to left edges aligned
        let left = t.right - width;
        if (left < MARGIN) left = t.left;
        left = Math.max(MARGIN, Math.min(left, vw - width - MARGIN));

        setPos({ top, left });
    }, []);

    // Measure and position before paint so the menu never flashes in the wrong place
    useLayoutEffect(() => {
        if (!open) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPos(null);
            return;
        }
        updatePosition();
    }, [open, updatePosition]);

    useEffect(() => {
        if (!open) return;

        const onPointerDown = (e: MouseEvent) => {
            const target = e.target as Node;
            if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
                setOpen(false);
            }
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                triggerRef.current?.focus();
            }
        };

        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", updatePosition);
        // capture: true also catches scrolling inside nested scroll containers
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [open, updatePosition]);

    const TriggerIcon = resolvedTheme === "dark" ? Moon : Sun;

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label="Change theme"
                aria-haspopup="menu"
                aria-expanded={open}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100  dark:text-gray-400 dark:hover:bg-gray-800">
                <TriggerIcon className="h-5 w-5" />
            </button>

            {open &&
                createPortal(
                    <div
                        ref={menuRef}
                        role="menu"
                        style={{
                            position: "fixed",
                            top: pos?.top ?? 0,
                            left: pos?.left ?? 0,
                            visibility: pos ? "visible" : "hidden",
                        }}
                        className="z-50 w-36 overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                        {options.map(({ value, label, icon: Icon }) => {
                            const active = theme === value;
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={active}
                                    onClick={() => {
                                        setTheme(value);
                                        setOpen(false);
                                    }}
                                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                                    <Icon className="h-4 w-4" />
                                    <span className="flex-1 text-left">{label}</span>
                                    {active && <Check className="h-4 w-4" />}
                                </button>
                            );
                        })}
                    </div>,
                    document.body,
                )}
        </>
    );
}
