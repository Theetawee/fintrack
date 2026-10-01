import { useNavigate } from "react-router";
import { IS_AUTHENTICATED_KEY } from "../../context/auth/AuthContext";
import useAuth from "../../context/auth/useAuth";
import { getPath } from "../../routing/urls";
import useAxios from "../useAxios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";

const useLogout = () => {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const api = useAxios();

    const clearLocalAuth = () => {
        localStorage.removeItem(IS_AUTHENTICATED_KEY);
        setIsAuthenticated(false);
        navigate(getPath("Login"));
    };

    const handleServerLogout = async () => {
        setIsLoading(true);
        try {
            const resp = await api.post(`/auth/logout/`, null, { withCredentials: true });
            console.log(resp);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response);
            }
            console.error("Error logging out:", error);
        } finally {
            setIsLoading(false);
            clearLocalAuth();
            toast.success("Logged out successfully.");
        }
    };

    return { clearLocalAuth, handleServerLogout, isLoading };
};

export default useLogout;
