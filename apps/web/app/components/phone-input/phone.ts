/**
 * Everything that touches libphonenumber lives here. To swap the library
 * (e.g. back to google-libphonenumber) this is the only file that has to change.
 */
import {
    AsYouType,
    parsePhoneNumberFromString,
    validatePhoneNumberLength,
} from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";
import { COUNTRY_BY_CODE } from "./countries";
import type { PhoneStatus, PhoneValue } from "./types";

export interface ParsedInput {
    value: PhoneValue;
    /** Formatted national number to show in the input */
    display: string;
}

/** Formats digits the way Google's dialer does while typing. */
export function formatAsYouType(country: string, digits: string): string {
    return new AsYouType(country as CountryCode).input(digits);
}

/**
 * Live validation. "incomplete" means the user could still be typing;
 * "invalid" means no further digits can rescue the number.
 */
function getStatus(digits: string, country: CountryCode): PhoneStatus {
    const lengthResult = validatePhoneNumberLength(digits, country);
    if (lengthResult === "TOO_SHORT") return "incomplete";
    if (
        lengthResult === "TOO_LONG" ||
        lengthResult === "INVALID_COUNTRY" ||
        lengthResult === "NOT_A_NUMBER"
    ) {
        return "invalid";
    }

    const phoneNumber = parsePhoneNumberFromString(digits, country);
    if (phoneNumber?.isValid()) return "valid";

    // Length is plausible but the number isn't valid. If one more digit would
    // already be too long, the user has typed as much as this country allows.
    const longer = validatePhoneNumberLength(digits + "0", country);
    return longer === "TOO_LONG" ? "invalid" : "incomplete";
}

/** Turns whatever the user typed for a country into the value we hand to onChange. */
export function buildValue(country: string, rawInput: string): ParsedInput {
    const dialCode = COUNTRY_BY_CODE.get(country)?.dialCode ?? "";
    const digits = rawInput.replace(/\D/g, "");
    const cc = country as CountryCode;

    if (!digits) {
        return {
            display: "",
            value: {
                country,
                dialCode,
                number: "",
                nationalNumber: "",
                isValid: false,
                status: "empty",
            },
        };
    }

    const phoneNumber = parsePhoneNumberFromString(digits, cc);

    if (!phoneNumber) {
        // Too few digits to parse yet — this is just "still typing"
        return {
            display: formatAsYouType(country, digits),
            value: {
                country,
                dialCode,
                number: `+${dialCode}${digits}`,
                nationalNumber: digits,
                isValid: false,
                status: "incomplete",
            },
        };
    }

    const e164 = phoneNumber.format("E.164");
    // Derive from E.164 so leading zeros (e.g. Italy) are kept correctly
    const national = e164.slice(1 + dialCode.length);
    const status = getStatus(digits, cc);

    return {
        display: formatAsYouType(country, digits),
        value: {
            country,
            dialCode,
            number: e164,
            nationalNumber: national,
            isValid: status === "valid",
            status,
        },
    };
}

/** Parse an E.164 string into { country, national digits }. */
export function parseE164(e164: string): { country: string; national: string } | null {
    const phoneNumber = parsePhoneNumberFromString(e164);
    if (!phoneNumber?.country || !COUNTRY_BY_CODE.has(phoneNumber.country)) return null;

    const national = phoneNumber
        .format("E.164")
        .slice(1 + String(phoneNumber.countryCallingCode).length);

    return { country: phoneNumber.country, national };
}
