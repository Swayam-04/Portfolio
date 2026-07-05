import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { InteractiveHeading } from "./InteractiveHeading";
import type { Section } from "../../store/useRobotStore";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  sectionId?: Section;
}

export const SectionHeading = ({ title, subtitle, className, sectionId }: SectionHeadingProps) => {
  return (
    <div className={cn("mb-16 flex flex-col items-center text-center", className)}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 text-sm font-semibold tracking-wider text-primary uppercase"
        >
          {subtitle}
        </motion.span>
      )}
      
      {sectionId ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <InteractiveHeading sectionId={sectionId} className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-text">
            {title}
          </InteractiveHeading>
        </motion.div>
      ) : (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text"
        >
          {title}
        </motion.h2>
      )}
      
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: "100px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-6 h-1 rounded-full bg-gradient-to-r from-primary to-transparent"
      />
    </div>
  );
};
