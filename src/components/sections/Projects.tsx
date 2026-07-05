import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { portfolioData } from "../../data/portfolio";
import { Search, ExternalLink, Activity, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { cn } from "../../utils/cn";
import { InteractiveHeading } from "../ui/InteractiveHeading";

// --- Premium Card Component with 3D Tilt & Spotlight ---
const PremiumCard = ({ 
  children, className, span, isFlagship = false 
}: { 
  children: React.ReactNode; className?: string; span?: string; isFlagship?: boolean 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Softer springs for premium feel
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isFlagship ? ["2deg", "-2deg"] : ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isFlagship ? ["-2deg", "2deg"] : ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const background = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const rect = ref.current?.getBoundingClientRect();
      const px = (latestX as number + 0.5) * (rect?.width || 0);
      const py = (latestY as number + 0.5) * (rect?.height || 0);
      return `radial-gradient(${isFlagship ? '600px' : '400px'} circle at ${px}px ${py}px, rgba(0,229,255,0.15), transparent 40%)`;
    }
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative rounded-3xl overflow-hidden group bg-surface border border-white/5 backdrop-blur-xl flex flex-col hover:border-primary/40 transition-all duration-700 ease-out",
        "shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,229,255,0.2)] hover:-translate-y-2",
        span,
        className
      )}
    >
      {/* Animated Gradient Border Layer */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Spotlight */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
        style={{ background }}
      />

      {/* Content wrapper with 3D translation */}
      <div className="relative z-10 w-full h-full flex flex-col" style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(portfolioData.projects.map(p => p.category)))];

  const filteredProjects = portfolioData.projects.filter(project => {
    const matchesFilter = filter === "All" || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background Cinematic Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.05)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Engineering Excellence Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <InteractiveHeading sectionId="projects" className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary pb-4 tracking-tighter">
              Engineering Excellence
            </InteractiveHeading>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg md:text-xl mt-4 max-w-3xl leading-relaxed"
          >
            A curated collection of AI-powered applications, full-stack products, and innovative solutions built to solve real-world problems.
          </motion.p>
        </div>

        {/* Premium Filters & Floating Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 relative z-20">
          
          {/* Animated Filter Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors duration-300",
                  filter === cat ? "text-black" : "text-muted hover:text-white"
                )}
              >
                {filter === cat && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Floating Search Bar */}
          <div className="relative w-full lg:w-80 group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-md opacity-20 group-focus-within:opacity-50 transition-opacity duration-500" />
            <div className="relative flex items-center bg-surface/80 backdrop-blur-xl border border-white/10 rounded-full p-1 group-focus-within:border-primary/50 transition-colors">
              <div className="pl-4">
                <Search className="w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none py-2.5 px-4 text-sm text-white placeholder:text-muted focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[450px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isFlagship = project.id === "vaani-ai" || project.title.includes("Vaani");
              
              // Determine Span
              // Flagship takes 2 columns and 2 rows on Desktop (67% width)
              const spanClass = isFlagship 
                ? "md:col-span-2 lg:col-span-2 md:row-span-2" 
                : "col-span-1 row-span-1";

              return (
                <PremiumCard 
                  key={project.id} 
                  span={spanClass} 
                  isFlagship={isFlagship}
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="h-full flex flex-col relative"
                  >
                    {/* Visual Mockup Section */}
                    <div className={cn(
                      "relative overflow-hidden w-full",
                      isFlagship ? "h-2/5 md:h-1/2" : "h-1/2"
                    )}>
                      {/* Premium Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent z-10 pointer-events-none" />
                      
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.15]"
                      />

                      {/* Status / Metric Badge */}
                      <div className="absolute top-6 right-6 z-20 flex gap-2">
                        {isFlagship && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-primary/50 text-primary text-xs font-bold rounded-full shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                            <Star className="w-3.5 h-3.5" /> Featured
                          </span>
                        )}
                        {project.category.includes("AI") && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-secondary/50 text-secondary text-xs font-bold rounded-full shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                            <Activity className="w-3.5 h-3.5" /> AI Powered
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20">
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-black text-primary/80 uppercase tracking-widest mb-2 block">{project.category}</span>
                          <h3 className={cn(
                            "font-bold text-white group-hover:text-primary transition-colors tracking-tight",
                            isFlagship ? "text-3xl md:text-5xl mb-4" : "text-2xl mb-2"
                          )}>
                            {project.title}
                          </h3>
                        </div>

                        {/* Floating Action Buttons */}
                        <div className="flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all shadow-xl">
                              <FaGithub className="w-5 h-5" />
                            </a>
                          )}
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-black hover:bg-white hover:scale-110 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className={cn(
                        "text-muted leading-relaxed line-clamp-3 mb-6",
                        isFlagship ? "text-lg md:text-xl line-clamp-4 max-w-2xl" : "text-sm"
                      )}>
                        {project.description}
                      </p>
                      
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.techStack.slice(0, isFlagship ? 8 : 4).map(tech => (
                            <span 
                              key={tech} 
                              className="px-3 py-1.5 text-xs font-bold bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/90 group-hover:bg-white/10 group-hover:border-white/20 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > (isFlagship ? 8 : 4) && (
                            <span className="px-3 py-1.5 text-xs font-bold bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/50">
                              +{project.techStack.length - (isFlagship ? 8 : 4)}
                            </span>
                          )}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </PremiumCard>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
