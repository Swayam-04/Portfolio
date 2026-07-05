import { motion } from "framer-motion";
import { useRobotStore } from "../../store/useRobotStore";
import type { Section } from "../../store/useRobotStore";
import { useState } from "react";

interface InteractiveHeadingProps {
  sectionId: Section;
  children: React.ReactNode;
  className?: string;
}

export const InteractiveHeading = ({ sectionId, children, className = "" }: InteractiveHeadingProps) => {
  const { forceSection, setHoverState } = useRobotStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    console.log(`[STAGE 1] Heading Clicked: ${sectionId}`);
    setIsAnimating(true);
    forceSection(sectionId);
    
    // Stop the pulse animation after a short duration
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <div 
      className="relative inline-block group cursor-pointer"
      onMouseEnter={() => setHoverState(sectionId as any)}
      onMouseLeave={() => setHoverState('none')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Learn more about ${children}`}
    >
      <h2 
        className={`text-3xl md:text-5xl font-bold transition-all duration-300 group-hover:text-[#00E5FF] ${isAnimating ? 'animate-pulse scale-105' : ''} ${className}`}
      >
        {children}
      </h2>
      
      {/* Animated underline */}
      <motion.div 
        className="absolute -bottom-2 left-0 h-1 bg-[#00E5FF] w-0 group-hover:w-full transition-all duration-300 ease-out rounded-full"
        initial={false}
      />
    </div>
  );
};
