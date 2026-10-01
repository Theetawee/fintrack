import { LogOut } from "lucide-react";
import useLogout from "../../hooks/auth/useLogout";
import Loader from "../common/Loader";

const LogoutButton = () => {
    const { handleServerLogout, isLoading } = useLogout();
    return (
        <div>
            <button
                disabled={isLoading}
                onClick={handleServerLogout}
                className="flex items-center gap-x-4 py-2.5 hover:bg-rose-100 dark:hover:bg-rose-800/50 transition-colors duration-300 px-4 rounded-md">
                {isLoading ? (
                    <span className="flex items-center gap-x-4">
                        <Loader className="size-4" />
                        <span className="ml-2">Logging out...</span>
                    </span>
                ) : (
                    <span className="flex items-center gap-x-4">
                        <LogOut className="size-4" />
                        Logout
                    </span>
                )}
            </button>
        </div>
    );
};

export default LogoutButton;
