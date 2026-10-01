import type { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
    return <div className="max-w-md relative rounded-md mx-auto border dark:bg-gray-900 border-gray-100 p-4 sm:p-10 dark:border-gray-900 shadow-sm">{children}</div>;
};

export default Card;
