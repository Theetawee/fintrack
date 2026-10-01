import { AlertTriangle, RotateCcw } from "lucide-react";
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { Outlet } from "react-router";
import Button from "./Button";

const AppErrorBoundary = () => {
    return (
        <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
                <div
                    role="alert"
                    className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
                    <div className="w-full max-w-md rounded-md border border-gray-800 bg-gray-800 p-8 text-center backdrop-blur-md">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                            <AlertTriangle className="h-6 w-6 text-rose-500" strokeWidth={1.75} />
                        </div>

                        <p className="mt-5 text-xs font-medium uppercase tracking-wider text-indigo-600">
                            Error
                        </p>
                        <h1 className="mt-1 text-xl font-semibold text-gray-200">
                            Something went wrong
                        </h1>
                        <p className="mt-2 text-sm text-gray-400">
                            An unexpected error occurred. You can try again, or reload the page if
                            it keeps happening.
                        </p>

                        <pre className="mt-5 max-h-32 overflow-auto rounded border-gray-200 bg-gray-700 p-3 text-left text-xs text-gray-200">
                            {getErrorMessage(error)}
                        </pre>

                        <Button type="button" onClick={resetErrorBoundary} className="max-w-fit mt-6">
                            <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
                            Try again
                        </Button>
                    </div>
                </div>
            )}>
            <Outlet />
        </ErrorBoundary>
    );
};

export default AppErrorBoundary;
