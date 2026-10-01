import {  useId, useMemo, useRef, useState } from "react";
import CountryButton from "./CountryButton";
import CountryPickerModal from "./CountryPickerModal";
import StatusIcon from "./StatusIcon";
import ValidationMessage from "./ValidationMessage";
import { COUNTRY_BY_CODE, defaultRenderFlag, groupCountries } from "./countries";
import { cx } from "./utils";
import { usePhoneInput } from "./usePhoneInput";
import { getValidationUi } from "./validation";
import type { PhoneNumberInputProps, PhoneStatus } from "./types";

const PhoneNumberInput = ({
    value,
    defaultValue,
    defaultCountry = "US",
    onChange,
    onBlur,
    countries,
    preferredCountries,
    renderFlag = defaultRenderFlag,
    modalTitle = "Select country",
    searchPlaceholder = "Search country or code",
    showValidation = true,
    showIncompleteWhileTyping = true,
    messages,
    name,
    id,
    placeholder,
    disabled,
    required,
    autoFocus,
    className,
    "aria-label": ariaLabel = "Phone number",
    "aria-invalid": ariaInvalid,
}: PhoneNumberInputProps) => {
    const uid = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const [pickerOpen, setPickerOpen] = useState(false);

    const phone = usePhoneInput({ value, defaultValue, defaultCountry, onChange, onBlur });
    const groups = useMemo(
        () => groupCountries(countries, preferredCountries),
        [countries, preferredCountries],
    );

    const { message, hasError } = getValidationUi({
        status: phone.status,
        touched: phone.touched,
        required,
        showValidation,
        showIncompleteWhileTyping,
        messages,
    });
    const messageId = `${uid}-message`;

    // "empty" when validation is hidden so the border/ring never shows a
    // status you turned off.
    const status: PhoneStatus = showValidation ? phone.status : "empty";

    const borderColor = disabled
        ? "border-gary-200 bg-gary-50 dark:border-gray-800 dark:bg-gray-900"
        : hasError
          ? "border-rose-400 bg-white dark:bg-gray-900"
          : status === "valid"
            ? "border-emerald-400 bg-white dark:bg-gray-900"
            : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900";

    const focusRing = hasError
        ? "focus-within:border-rose-500 focus-within:ring-rose-500"
        : "focus-within:border-primary-500 focus-within:ring-primary-500";

    return (
        <div className={cx("flex flex-col gap-1.5", className)}>
            <div
                className={cx(
                    "flex items-center overflow-hidden rounded-md border  transition-colors",
                    borderColor,
                    !disabled && "focus-within:ring-1",
                    !disabled && focusRing,
                )}>
                <CountryButton
                    country={COUNTRY_BY_CODE.get(phone.country)}
                    onClick={() => setPickerOpen(true)}
                    disabled={disabled}
                />

                <input
                    ref={inputRef}
                    id={id}
                    name={name}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    className="min-w-0 flex-1 appearance-none border-none focus:ring-0 focus:ring-offset-0 focus:outline-0 bg-transparent px-3 py-2 text-sm text-gary-900 outline-none placeholder:text-gary-400 disabled:cursor-not-allowed"
                    value={phone.display}
                    onChange={phone.handleInput}
                    onBlur={phone.handleBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    autoFocus={autoFocus}
                    aria-label={ariaLabel}
                    aria-invalid={ariaInvalid ?? (hasError || undefined)}
                    aria-describedby={message ? messageId : undefined}
                />

                {showValidation && <StatusIcon status={phone.status} />}
            </div>

            {showValidation && (
                <ValidationMessage id={messageId} text={message} hasError={hasError} />
            )}

            <CountryPickerModal
                open={pickerOpen}
                onClose={() => setPickerOpen(false)}
                groups={groups}
                selectedCode={phone.country}
                onSelect={(c) => {
                    phone.selectCountry(c.code);
                    inputRef.current?.focus();
                }}
                renderFlag={renderFlag}
                title={modalTitle}
                searchPlaceholder={searchPlaceholder}
            />
        </div>
    );
};

export default PhoneNumberInput;
