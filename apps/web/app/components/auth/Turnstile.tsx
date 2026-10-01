import { useEffect, useRef } from "react";

declare global {
    interface Window {
        turnstile?: {
            render: (container: HTMLElement, options: Record<string, unknown>) => string;
            reset: (widgetId?: string) => void;
            remove: (widgetId?: string) => void;
        };
    }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// Load Cloudflare's script once, no matter how many widgets are mounted
let scriptPromise: Promise<void> | null = null;

const loadTurnstile = (): Promise<void> => {
    if (window.turnstile) return Promise.resolve();
    if (!scriptPromise) {
        scriptPromise = new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = SCRIPT_SRC;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = () => {
                scriptPromise = null; // allow a retry on the next mount
                reject(new Error("Could not load Turnstile"));
            };
            document.head.appendChild(script);
        });
    }
    return scriptPromise;
};

interface TurnstileProps {
    siteKey: string;
    /** Receives the token when the check passes, and "" when it expires or fails */
    onToken: (token: string) => void;
    /** Change this number to reset the widget. Tokens can only be used once. */
    resetKey?: number;
    theme?: "auto" | "light" | "dark";
}

const Turnstile = ({ siteKey, onToken, resetKey = 0, theme = "auto" }: TurnstileProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    // Always call the latest onToken without re-rendering the widget
    const onTokenRef = useRef(onToken);
    useEffect(() => {
        onTokenRef.current = onToken;
    });

    useEffect(() => {
        let cancelled = false;

        loadTurnstile()
            .then(() => {
                if (cancelled || !containerRef.current || !window.turnstile) return;
                widgetIdRef.current = window.turnstile.render(containerRef.current, {
                    sitekey: siteKey,
                    theme,
                    size: "flexible",
                    callback: (token: string) => onTokenRef.current(token),
                    "expired-callback": () => onTokenRef.current(""),
                    "error-callback": () => onTokenRef.current(""),
                });
            })
            .catch(() => onTokenRef.current(""));

        return () => {
            cancelled = true;
            if (widgetIdRef.current && window.turnstile) {
                window.turnstile.remove(widgetIdRef.current);
            }
            widgetIdRef.current = null;
        };
    }, [siteKey, theme]);

    useEffect(() => {
        if (resetKey === 0) return; // nothing to reset on first render
        if (widgetIdRef.current && window.turnstile) {
            window.turnstile.reset(widgetIdRef.current);
        }
        onTokenRef.current("");
    }, [resetKey]);

    return <div ref={containerRef} />;
};

export default Turnstile;
