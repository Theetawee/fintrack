import { useState } from "react";
import axios, { AxiosError } from "axios";
import { api_url } from "../../constants";
import { useNavigate } from "react-router";
import { getPath } from "../../routing/urls";

export const IDENTIFIER_KEY = "_ath";
export const METHOD_USED_KEY = "mtd";

const useSignup = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [password2, setPassword2] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [method, setMethod] = useState<"email" | "phone">("email");

    const navigate = useNavigate();

    const validate = () => {
        setError("");
        if (password !== password2) {
            setError("Passwords do not match");
            return false;
        }
        if (method === "phone" && !isPhoneValid) {
            setError("Phone number is not valid");
            return false;
        }
        if (!identifier || !password || !name || !password2 || !turnstileToken) {
            setError("Please fill in all fields");
            return false;
        }

        return true;
    };

    const handleSignup = async () => {
        if (!validate()) return;
        setIsLoading(true);
        try {
            const response = await axios.post(`${api_url}/auth/signup/`, {
                identifier,
                password,
                password2,
                name,
                turnstile_token: turnstileToken,
            });
            console.log(response.data);
            const data = response.data;

            if (response.status === 201 && method === data.registration_type) {
                sessionStorage.setItem(IDENTIFIER_KEY, identifier);
                sessionStorage.setItem(METHOD_USED_KEY, method);
                navigate(getPath("AccountActivation"));
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const msg = error.response?.data?.msg || "Something went wrong. Please try again.";
                setError(msg);
                console.log(error.response);
            }
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        identifier,
        setIdentifier,
        password,
        setPassword,
        name,
        setName,
        password2,
        setPassword2,
        isPhoneValid,
        setIsPhoneValid,
        turnstileToken,
        setTurnstileToken,
        handleSignup,
        isLoading,
        error,
        method,
        setMethod,
    };
};

export default useSignup;
