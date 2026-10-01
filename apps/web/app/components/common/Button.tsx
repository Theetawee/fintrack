import React, { type ButtonHTMLAttributes } from "react";
import Loader from "./Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isLoading?: boolean;
    variant?: "default" | "alternative" | "dark" | "light" | "outline" | "ghost" | "danger";
}

const Button: React.FC<ButtonProps> = ({
    children,
    isLoading = false,
    variant = "default",
    className = "",
    disabled,
    ...props
}) => {
    const variantStyles = {
        default:
            "bg-primary-600 dark:bg-primary-500 text-white hover:bg-primary-700 disabled:hover:bg-primary-600 dark:disabled:hover:bg-primary-500 dark:hover:bg-primary-600/80 focus:ring-primary-300",
        alternative:
            "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-gray-200",
        dark: "bg-gray-800 text-white hover:bg-gray-800/90 focus:ring-gray-300",
        light: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
        outline:
            "border border-primary-600 text-primary-600 dark:hover:text-white hover:bg-primary-50 dark:hover:bg-primary-700 focus:ring-primary-200 dark:focus:ring-primary-600",
        ghost: "text-gray-600 bg-transparent focus:ring-gray-200 dark:ring-gray-600",
        danger: "bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600/80 focus:ring-red-300",
    };

    return (
        <button
            className={`
        inline-flex py-2 font-normal rounded-md text-sm w-full px-6 cursor-pointer items-center justify-center transition-colors duration-200
        focus:outline-none focus:ring-0 focus:ring-offset-0
        disabled:opacity-70 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${className}
      `}
            disabled={disabled || isLoading}
            {...props}>
            {isLoading ? <Loader /> : <>{children}</>}
        </button>
    );
};

export default Button;
