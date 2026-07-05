import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

// Combining types to support both standard button attributes and framer motion props
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-primary text-black font-semibold shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]",
      secondary: "bg-secondary text-white font-medium shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]",
      outline: "border border-white/20 bg-transparent text-white hover:bg-white/5",
      ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/10",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-colors duration-300 backdrop-blur-sm",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
