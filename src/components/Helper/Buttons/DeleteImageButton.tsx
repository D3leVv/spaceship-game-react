import React from "react";
import { motion } from "framer-motion";
const pathsVariant = {
    hidden: {
        opacity: 1,
        pathLength: 0,
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 2,
            ease: "easeInOut",
        },
    },
};

function DeleteImageButton({ onClick }: { onClick: () => void }) {
    return (
        <div className="p-1 border-2 border-red-500 rounded-full cursor-pointer">
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-red-500 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={onClick}
            >
                <motion.path
                    variants={pathsVariant}
                    initial="hidden"
                    animate="visible"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
            </motion.svg>
        </div>
    );
}

export default DeleteImageButton;
