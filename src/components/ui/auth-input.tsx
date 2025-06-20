import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import { motion } from "motion/react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
}

export function AuthInput({ 
  label, 
  error, 
  showPasswordToggle, 
  type = "text",
  className = "",
  ...props 
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <motion.div 
      className="space-y-1.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <label className="block text-sm font-medium text-[#D291BC]">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          className={`
            block w-full px-4 py-3 bg-white/50 
            border border-[#D291BC] rounded-xl
            text-gray-900 placeholder:text-gray-400/70
            focus:outline-none focus:ring-2 focus:ring-[#D291BC]/50
            hover:border-[#D291BC]/70 transition-colors
            ${error ? "border-red-400 focus:ring-red-400/50" : ""}
            ${className}
          `}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#D291BC] transition-colors"
          >
            {showPassword ? (
              <IconEyeOff className="h-5 w-5" />
            ) : (
              <IconEye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
} 