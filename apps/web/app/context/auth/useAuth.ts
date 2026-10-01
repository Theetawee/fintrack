import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const useAuth = () => {
    const cx = useContext(AuthContext);

    if (!cx) throw new Error("useAuth must be used inside <AuthProvider>");

    return cx;
};

export default useAuth;
