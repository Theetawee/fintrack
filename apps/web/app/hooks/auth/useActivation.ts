import { useState } from "react";
import { IDENTIFIER_KEY, METHOD_USED_KEY } from "./useSignup";
import axios, { AxiosError } from "axios";
import { api_url } from "../../constants";

export const DELIVERY_KEY = "_ry";

const useActivation = () => {
    const method = sessionStorage.getItem(METHOD_USED_KEY) as "email" | "phone" | null;
    const identifier = sessionStorage.getItem(IDENTIFIER_KEY) as string | null;
    const isAllowed = method && identifier;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const handleActivation = async (delivery: "link" | "code") => {
        setError("");
        if (!identifier) {
            setError("Something went wrong. Please try again.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${api_url}/auth/verify/request/`, {
                identifier,
                delivery,
            });
            console.log(response.data);
            if (response.status === 200) {
                sessionStorage.setItem(DELIVERY_KEY, delivery);
                setSent(true);
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
        isAllowed,
        method,
        identifier,
        handleActivation,
        isLoading,
        error,
        sent,
    };
};

export default useActivation;
