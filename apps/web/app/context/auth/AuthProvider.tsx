import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, IS_AUTHENTICATED_KEY, type AuthContextValue } from "./AuthContext";
import type { UserType } from "./type";
import { useQuery } from "@tanstack/react-query";
import useAccountEndpoints from "../../hooks/endpoints/useAccountEndpoints";
import { useNavigate } from "react-router";
import { getPath } from "../../routing/urls";
import Loader from "../../components/common/Loader";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { getUser } = useAccountEndpoints();
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(
        () => localStorage.getItem(IS_AUTHENTICATED_KEY) === "true",
    );

    const { data, isPending, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        enabled: isAuthenticated,
        retry: false,
    });

    useEffect(() => {
        if (!isError) return;

        localStorage.removeItem(IS_AUTHENTICATED_KEY);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsAuthenticated(false);
        navigate(getPath("Login"), { replace: true });
    }, [isError, navigate]);

    const user: UserType | null = data ?? null;

    const values: AuthContextValue = {
        isAuthenticated,
        user,
        setIsAuthenticated,
    };

    return (
        <AuthContext value={values}>
            <div>
                {isPending && isAuthenticated ? (
                    <div className="py-32">
                        <div className="grid grid-cols-1 gap-2 text-center">
                            <Loader />
                            <p>Please wait...</p>
                        </div>
                    </div>
                ) : (
                    children
                )}
            </div>
        </AuthContext>
    );
};

export default AuthProvider;
