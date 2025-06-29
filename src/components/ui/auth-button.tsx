import { motion } from "motion/react";

interface AuthButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function AuthButton({ 
  children, 
  variant = "primary", 
  isLoading,
  className = "",
  ...props 
}: AuthButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`
        w-full flex justify-center items-center gap-2 py-3 px-4 
        rounded-xl text-sm font-semibold transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variant === "primary" 
          ? "text-white bg-[#D291BC] hover:bg-[#c17ba6] focus:ring-2 focus:ring-offset-2 focus:ring-[#D291BC]" 
          : "text-[#D291BC] bg-[#FFE3EC] hover:bg-[#ffd4e3] focus:ring-2 focus:ring-offset-2 focus:ring-[#FFE3EC]"
        }
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Memproses...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
} 