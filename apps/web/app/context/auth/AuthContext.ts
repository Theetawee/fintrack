import { createContext } from "react";
import type { UserType } from "./type";

export const IS_AUTHENTICATED_KEY = "_auh";

export interface AuthContextValue {
    user: UserType | null;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});
