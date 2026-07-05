import { motion } from "framer-motion";
import { portfolioData } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Briefcase, Calendar } from "lucide-react";

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative bg-surface/30">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <SectionHeading title="Experience" subtitle="My Career Path" sectionId="experience" />

        <div className="relative">
          {/* Central Line for desktop, left line for mobile */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          
          {portfolioData.experience.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12 relative flex flex-col md:flex-row w-full items-start"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[10px] md:left-1/2 top-1.5 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(0,229,255,0.8)] z-10 md:-translate-x-1/2" />
                
                {/* Content */}
                <div className={`w-full pl-12 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left md:ml-auto'}`}>
                  <div className="flex flex-col gap-1 mb-2">
                    <span className={`inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                      <Briefcase className="w-3 h-3" />
                      {exp.type}
                    </span>
                    <h3 className="text-xl font-bold text-text">{exp.role}</h3>
                    <h4 className="text-lg font-medium text-white/80">{exp.company}</h4>
                    <span className={`flex items-center gap-2 text-sm text-muted mt-1 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed mt-4">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
