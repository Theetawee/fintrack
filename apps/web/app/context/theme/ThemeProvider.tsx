import { useEffect, useState, type ReactNode } from "react";
import {
    getStoredTheme,
    getSystemTheme,
    STORAGE_KEY,
    ThemeContext,
    type ResolvedTheme,
    type Theme,
} from "./ThemeContext";

function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(getStoredTheme);
    const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

    // Follow OS changes while in "system" mode
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = () => setSystemTheme(mq.matches ? "dark" : "light");
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const resolvedTheme = theme === "system" ? systemTheme : theme;

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", resolvedTheme === "dark");
        root.style.colorScheme = resolvedTheme; // native scrollbars, form controls
    }, [resolvedTheme]);

    const setTheme = (next: Theme) => {
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // ignore
        }
        setThemeState(next);
    };

    return <ThemeContext value={{ theme, resolvedTheme, setTheme }}>{children}</ThemeContext>;
}

export default ThemeProvider;
