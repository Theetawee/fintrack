import type { Dispatch, SetStateAction } from "react";
import TextInput from "./TextInput";
import { PhoneNumberInput } from "../phone-input";

interface Props {
    method: "email" | "phone";
    setMethod: Dispatch<SetStateAction<"email" | "phone">>;
    identifier: string;
    setIdentifier: Dispatch<SetStateAction<string>>;
    setIsPhoneValid: Dispatch<SetStateAction<boolean>>;
}

const IdentifierInput = ({
    method,
    identifier,
    setIdentifier,
    setIsPhoneValid,
    setMethod,
}: Props) => {
    return (
        <div>
            <div>
                {method === "email" && (
                    <div className="mb-4">
                        <TextInput
                            type="email"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            label="Email"
                            name="identifier"
                            autoComplete="username"
                            placeholder="you@example.com"
                        />
                    </div>
                )}
                {method === "phone" && (
                    <div className="grid grid-cols-1 gap-1">
                        <label className="form-input-label" htmlFor="phone_number">
                            Phone number
                        </label>
                        <PhoneNumberInput
                            id="phone_number"
                            value={identifier}
                            onChange={(value) => {
                                setIdentifier(value.number);
                                setIsPhoneValid(value.isValid);
                            }}
                            preferredCountries={["UG", "US"]}
                            name="identifier"
                            placeholder="+1 234 567 8901"
                        />
                    </div>
                )}
                <div className="text-right text-xs">
                    <button
                        type="button"
                        className="text-primary-500 hover:underline"
                        onClick={() => {
                            setMethod(method === "email" ? "phone" : "email");
                            setIdentifier("");
                        }}>
                        Continue with {method === "email" ? "Phone number" : "email address"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IdentifierInput;
