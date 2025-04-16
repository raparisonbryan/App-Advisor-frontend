import React from "react";

interface StarProps {
    size?: number;
    className?: string;
}

const StarFull: React.FC<StarProps> = ({ size = 24, className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={className}
        >
            <path
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0.5"
                d="M12 1.25l3.09 6.25 6.91 1-5 4.87 1.18 6.88-6.18-3.25-6.18 3.25 1.18-6.88-5-4.87 6.91-1z"
            />
        </svg>
    );
};

export default StarFull;