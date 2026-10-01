import type { FocusEventHandler, ReactNode } from "react";

export interface Country {
    /** ISO 3166-1 alpha-2 code, e.g. "UG" */
    code: string;
    name: string;
    /** Dial code without the plus, e.g. "256" */
    dialCode: string;
}

export type PhoneStatus =
    /** Nothing typed */
    | "empty"
    /** Still plausible: more digits could make it valid */
    | "incomplete"
    /** Valid for the selected country */
    | "valid"
    /** Can't become valid: wrong length or a prefix the country doesn't use */
    | "invalid";

export interface PhoneValue {
    /** ISO country code, e.g. "UG" */
    country: string;
    /** Dial code without the plus, e.g. "256" */
    dialCode: string;
    /** Full number with country code in E.164, e.g. "+256712345678". Empty string if nothing typed. */
    number: string;
    /** Number without the country code, e.g. "712345678". Empty string if nothing typed. */
    nationalNumber: string;
    /** True only if the number is valid for the selected country */
    isValid: boolean;
    /** Live validation state, updated on every keystroke */
    status: PhoneStatus;
}

export interface ValidationMessages {
    invalid?: string;
    incomplete?: string;
    required?: string;
    valid?: string;
}

export interface PhoneNumberInputProps {
    /** Controlled value as an E.164 string, e.g. "+256712345678" */
    value?: string;
    /** Uncontrolled initial value as an E.164 string */
    defaultValue?: string;
    /** Country selected when there is no value. Default "US" */
    defaultCountry?: string;
    /** Called on every change (typing, pasting, or switching country) */
    onChange?: (value: PhoneValue) => void;
    onBlur?: FocusEventHandler<HTMLInputElement>;

    /** Restrict the list to these ISO codes */
    countries?: string[];
    /** Pin these ISO codes to the top of the list */
    preferredCountries?: string[];
    /** Replace the emoji flag, e.g. with an <img> or an SVG flag component */
    renderFlag?: (countryCode: string) => ReactNode;
    /** Modal heading and search placeholder */
    modalTitle?: string;
    searchPlaceholder?: string;

    /** Show the live valid/invalid indicator and message. Default true */
    showValidation?: boolean;
    /**
     * Show the "incomplete" hint while the user is still typing (neutral colour),
     * not only after they leave the field. Default true
     */
    showIncompleteWhileTyping?: boolean;
    /** Override the validation messages. `valid` is empty by default */
    messages?: ValidationMessages;

    name?: string;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;

    /** Extra classes for the outermost element */
    className?: string;
    "aria-label"?: string;
    "aria-invalid"?: boolean;
}
