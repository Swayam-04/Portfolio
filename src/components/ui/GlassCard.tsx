import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard = ({ children, className, glow = false, ...props }: GlassCardProps) => {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden",
        glow && "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-primary/20 before:blur-xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        className
      )}
      {...props}
    >
      {/* Glossy inner border effect */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
      {children}
    </motion.div>
  );
};
