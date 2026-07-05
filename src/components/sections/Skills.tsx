import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { portfolioData } from "../../data/portfolio";
import { cn } from "../../utils/cn";
import { InteractiveHeading } from "../ui/InteractiveHeading";

// --- Helper ---
const getIconUrl = (skill: string) => {
  const map: Record<string, string> = {
    Python: "python", Java: "java", JavaScript: "js", C: "c",
    SQL: "mysql", HTML5: "html", CSS3: "css",
    React: "react", Bootstrap: "bootstrap", "Tailwind CSS": "tailwind",
    "Three.js": "threejs", Django: "django", Flask: "flask",
    "Node.js": "nodejs", Express: "express",
    MySQL: "mysql", PostgreSQL: "postgres", MongoDB: "mongodb",
    PyTorch: "pytorch", TensorFlow: "tensorflow",
    Git: "git", GitHub: "github", Docker: "docker", Vercel: "vercel",
  };
  return map[skill] ? `https://skillicons.dev/icons?i=${map[skill]}` : null;
};

// --- Premium Bento Card Component ---
const BentoCard = ({ children, className, span, title }: { children: React.ReactNode, className?: string, span?: string, title: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

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

  // Convert raw mouse coordinates to pixels for the spotlight
  const background = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const rect = ref.current?.getBoundingClientRect();
      const px = (latestX as number + 0.5) * (rect?.width || 0);
      const py = (latestY as number + 0.5) * (rect?.height || 0);
      return `radial-gradient(400px circle at ${px}px ${py}px, rgba(0,229,255,0.08), transparent 40%)`;
    }
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-[32px] overflow-hidden group bg-white/[0.02] border border-white/10 backdrop-blur-md p-8 flex flex-col hover:border-primary/30 transition-colors duration-500",
        span,
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background }}
      />
      
      <div className="relative z-10 w-full h-full flex flex-col" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6 tracking-tight drop-shadow-sm">{title}</h3>
        <div className="flex-grow relative">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// --- Custom Category Visualizers ---

const LanguagesVisualizer = ({ skills }: { skills: string[] }) => (
  <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 w-full h-full content-center">
    {skills.map((skill, i) => (
      <div key={skill} className="flex flex-col items-center gap-3 group/skill">
        <div className="relative w-14 h-14 flex items-center justify-center">
           <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]" viewBox="0 0 36 36">
              <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <motion.path 
                className="text-primary" 
                strokeDasharray="100, 100"
                initial={{ strokeDashoffset: 100 }}
                whileInView={{ strokeDashoffset: 100 - (70 + Math.random() * 25) }}
                transition={{ duration: 1.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
           </svg>
           {getIconUrl(skill) ? <img src={getIconUrl(skill)!} className="w-7 h-7 object-contain z-10 transition-transform group-hover/skill:scale-110" /> : <span className="text-sm font-bold z-10">{skill[0]}</span>}
        </div>
        <span className="text-[11px] font-semibold text-muted uppercase tracking-wider group-hover/skill:text-primary transition-colors">{skill}</span>
      </div>
    ))}
  </div>
);

const AIVisualizer = ({ skills }: { skills: string[] }) => (
  <div className="w-full h-full flex flex-col relative overflow-hidden">
     <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none">
           <path d="M20,20 L150,80 M150,80 L200,30 M150,80 L80,180 M150,80 L250,200" stroke="#00E5FF" strokeWidth="1" className="animate-pulse" />
           <circle cx="20" cy="20" r="3" fill="#00E5FF" />
           <circle cx="150" cy="80" r="4" fill="#7C3AED" />
           <circle cx="200" cy="30" r="3" fill="#00E5FF" />
           <circle cx="80" cy="180" r="3" fill="#00E5FF" />
           <circle cx="250" cy="200" r="3" fill="#00E5FF" />
        </svg>
     </div>
     <div className="flex flex-col gap-3 mt-auto">
       {skills.map((skill, i) => (
         <motion.div 
           key={skill}
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3 + i * 0.1 }}
           className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-md group/ai hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
         >
           {getIconUrl(skill) && <img src={getIconUrl(skill)!} className="w-7 h-7 rounded-md shadow-sm" />}
           <span className="font-semibold text-sm text-white/90 group-hover/ai:text-primary transition-colors">{skill}</span>
         </motion.div>
       ))}
     </div>
  </div>
);

const FrontendVisualizer = ({ skills }: { skills: string[] }) => (
  <div className="flex flex-wrap gap-3 content-start pt-2">
    {skills.map((skill) => (
      <motion.div
        key={skill}
        whileHover={{ scale: 1.05, y: -2 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-colors shadow-sm cursor-default"
      >
        {getIconUrl(skill) && <img src={getIconUrl(skill)!} className="w-5 h-5" />}
        <span className="text-sm font-semibold">{skill}</span>
      </motion.div>
    ))}
  </div>
);

const BackendVisualizer = ({ skills }: { skills: string[] }) => (
  <div className="flex flex-col gap-4 justify-center h-full relative">
    <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/10 z-0" />
    {skills.map((skill) => (
      <div key={skill} className="flex items-center gap-4 group/be relative cursor-default z-10">
        <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center border border-white/10 group-hover/be:border-primary transition-all group-hover/be:shadow-[0_0_15px_rgba(0,229,255,0.4)]">
           {getIconUrl(skill) ? <img src={getIconUrl(skill)!} className="w-5 h-5" /> : <span className="text-sm font-bold">{skill[0]}</span>}
        </div>
        <span className="font-semibold text-sm group-hover/be:text-primary transition-colors">{skill}</span>
      </div>
    ))}
  </div>
);

const DatabaseVisualizer = ({ skills }: { skills: string[] }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-3">
    {skills.map((skill) => (
      <motion.div 
         key={skill}
         whileHover={{ scale: 1.02, x: 5 }}
         className="w-[90%] h-14 bg-white/5 border border-white/10 rounded-xl flex items-center px-5 gap-4 relative overflow-hidden group/db shadow-sm hover:shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-shadow cursor-default"
      >
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/20 group-hover/db:bg-primary transition-colors" />
        {getIconUrl(skill) && <img src={getIconUrl(skill)!} className="w-6 h-6 drop-shadow-md" />}
        <span className="font-bold text-sm tracking-wide">{skill}</span>
      </motion.div>
    ))}
  </div>
);

const CloudVisualizer = ({ skills }: { skills: string[] }) => (
  <div className="relative w-full h-full flex items-center justify-center min-h-[180px]">
    <div className="absolute w-32 h-32 rounded-full border border-dashed border-white/20 animate-[spin_12s_linear_infinite]" />
    <div className="absolute w-48 h-48 rounded-full border border-dashed border-white/10 animate-[spin_18s_linear_infinite_reverse]" />
    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.2)] z-10 backdrop-blur-md">
      <span className="text-xs font-black text-primary text-center leading-tight tracking-wider">CLOUD<br/>CORE</span>
    </div>
    
    {skills.map((skill, i) => {
       const angle = (i / skills.length) * Math.PI * 2;
       const radius = 80;
       const x = Math.cos(angle) * radius;
       const y = Math.sin(angle) * radius;
       return (
         <motion.div 
           key={skill}
           className="absolute flex flex-col items-center gap-1 group/cloud z-20 cursor-default"
           style={{ x, y }}
           whileHover={{ scale: 1.15 }}
         >
           <div className="w-10 h-10 bg-surface rounded-full border border-white/10 flex items-center justify-center p-1.5 group-hover/cloud:border-primary shadow-lg transition-colors">
             {getIconUrl(skill) ? <img src={getIconUrl(skill)!} className="w-full h-full rounded-full" /> : <span className="font-bold text-xs">{skill[0]}</span>}
           </div>
           <span className="text-[11px] absolute -bottom-5 opacity-0 group-hover/cloud:opacity-100 transition-opacity whitespace-nowrap bg-black/90 text-white px-2 py-1 rounded font-semibold pointer-events-none">{skill}</span>
         </motion.div>
       )
    })}
  </div>
);

export const Skills = () => {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Unforgettable Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <InteractiveHeading sectionId="skills" className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary pb-2 tracking-tight">
              Technologies I Build With
            </InteractiveHeading>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg mt-4 max-w-2xl"
          >
            A curated ecosystem of modern tools, frameworks, and languages designed to build scalable, high-performance applications.
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-6" 
          />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl mx-auto auto-rows-[minmax(320px,auto)]">
          
          <BentoCard title="Programming Languages" span="md:col-span-2 md:row-span-1">
            <LanguagesVisualizer skills={portfolioData.skills.languages} />
          </BentoCard>
          
          <BentoCard title="AI & Machine Learning" span="md:col-span-1 md:row-span-2">
            <AIVisualizer skills={portfolioData.skills.ai} />
          </BentoCard>

          <BentoCard title="Frontend Architecture" span="md:col-span-1 md:row-span-1">
            <FrontendVisualizer skills={portfolioData.skills.frontend} />
          </BentoCard>

          <BentoCard title="Backend Systems" span="md:col-span-1 md:row-span-1">
            <BackendVisualizer skills={portfolioData.skills.backend} />
          </BentoCard>

          <BentoCard title="Data & Storage" span="md:col-span-1 md:row-span-1">
            <DatabaseVisualizer skills={portfolioData.skills.database} />
          </BentoCard>

          <BentoCard title="Cloud & DevOps" span="md:col-span-2 md:row-span-1">
            <CloudVisualizer skills={portfolioData.skills.cloud} />
          </BentoCard>
          
        </div>
      </div>
    </section>
  );
};
