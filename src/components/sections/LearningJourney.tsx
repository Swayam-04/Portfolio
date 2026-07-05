import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence, useInView, animate } from "framer-motion";
import { portfolioData } from "../../data/portfolio";
import { Star, Target, Clock } from "lucide-react";
import { useRobotStore } from "../../store/useRobotStore";
import { InteractiveHeading } from "../ui/InteractiveHeading";

// --- Subcomponents ---

const BackgroundUniverse = ({ explosion }: { explosion: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Space Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface via-background to-black opacity-90" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] animate-[pulse_4s_ease-in-out_infinite]" />

      {/* Floating Particles (Hexagons) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            x: [null, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            boxShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
          }}
        />
      ))}

      {/* Neural Network Beams */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={`beam-${i}`}
            d={`M ${Math.random() * 1000} 0 Q ${Math.random() * 1000} 500, ${Math.random() * 1000} 1000`}
            stroke="url(#beam-gradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
          />
        ))}
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </svg>

      {/* Explosion Easter Egg */}
      <AnimatePresence>
        {explosion && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 10, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary rounded-full blur-[50px]"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const HolographicYearSphere = ({ year, progress, isUnlocked }: { year: string, progress: number, isUnlocked: boolean }) => {
  return (
    <motion.div 
      className="relative w-32 h-32 flex items-center justify-center group cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isUnlocked ? { 
        opacity: 1, 
        scale: [0.8, 1, 1.15, 1],
      } : { opacity: 0, scale: 0.8 }}
      transition={isUnlocked ? {
        duration: 0.8,
        times: [0, 0.4, 0.7, 1],
        ease: "easeInOut"
      } : undefined}
      whileHover={{ scale: 1.2 }}
    >
      {/* Outer Ring */}
      <motion.div 
        className="absolute inset-0 rounded-full border border-primary/30 border-t-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner Ring */}
      <motion.div 
        className="absolute inset-2 rounded-full border border-accent/30 border-b-accent"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      {/* Core Glow */}
      <motion.div 
        className="absolute inset-4 rounded-full bg-primary/10 blur-md group-hover:bg-primary/30 transition-colors duration-500"
        animate={isUnlocked ? {
          boxShadow: ["0 0 10px rgba(0,229,255,0)", "0 0 30px rgba(0,229,255,0.8)", "0 0 10px rgba(0,229,255,0.2)"],
        } : {}}
        transition={isUnlocked ? { delay: 0.3, duration: 0.5 } : undefined}
      />
      
      <div className="z-10 text-center">
        <span className="block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">
          {year}
        </span>
        <span className="text-xs text-primary/80 font-mono tracking-widest">{progress}%</span>
      </div>
    </motion.div>
  );
};

const InteractiveKnowledgeOrb = ({ tech, index }: { tech: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  // Calculate orbit positions based on index
  const angle = (index / 3) * Math.PI * 2;
  const radius = 80;
  
  return (
    <motion.div
      className="absolute z-20"
      initial={{ x: 0, y: 0 }}
      animate={{ 
        x: Math.cos(angle) * radius, 
        y: Math.sin(angle) * radius
      }}
      transition={{ 
        duration: 0.5, 
        type: "spring",
        repeat: Infinity,
        repeatType: "mirror"
      }}
      style={{ left: '50%', top: '50%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <motion.div 
          className="w-10 h-10 rounded-full bg-surface/80 border border-primary/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)] cursor-pointer"
          whileHover={{ scale: 1.2, boxShadow: "0 0 25px rgba(0,229,255,0.8)" }}
        >
          <span className="text-[10px] font-bold text-primary truncate px-1">{tech.name.substring(0,4)}</span>
        </motion.div>
        
        {/* Expanded Info */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute top-12 left-1/2 -translate-x-1/2 w-32 p-3 bg-surface border border-primary/30 rounded-xl backdrop-blur-xl shadow-2xl z-50 pointer-events-none"
            >
              <div className="text-xs font-bold text-white mb-1">{tech.name}</div>
              <div className="text-[10px] text-muted flex justify-between"><span>Exp:</span><span className="text-primary">{tech.experience}</span></div>
              <div className="text-[10px] text-muted flex justify-between"><span>Built:</span><span className="text-accent">{tech.projects} Proj</span></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const CourseCard3D = ({ course }: { course: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { setHoverState } = useRobotStore();
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(event.clientX - centerX);
      y.set(event.clientY - centerY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHoverState('none');
  };

  return (
    <div style={{ perspective: 1200 }} className="relative z-10 w-full max-w-md mx-auto my-12">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHoverState('journey' as any)}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl bg-surface/40 backdrop-blur-xl border border-white/10 p-6 shadow-2xl hover:shadow-[0_0_40px_rgba(0,229,255,0.2)] transition-shadow duration-500 group"
      >
        {/* Floating Hologram Orbs */}
        <div className="absolute inset-0 pointer-events-none" style={{ transform: "translateZ(50px)" }}>
          {course.tech?.map((t: any, i: number) => (
            <InteractiveKnowledgeOrb key={`${course.name}-orb-${t}-${i}`} tech={t} index={i} />
          ))}
        </div>

        {/* Card Content translated in Z space for 3D depth */}
        <div style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{course.name}</h3>
              <p className="text-sm text-muted">{course.platform} • {course.instructor}</p>
            </div>
            <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
              {course.difficulty}
            </div>
          </div>

          {/* Progress System */}
          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="bg-black/20 p-3 rounded-lg border border-white/5">
              <div className="text-[10px] text-muted uppercase tracking-wider mb-1 flex items-center gap-1"><Star className="w-3 h-3 text-accent"/> Knowledge</div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={`${course.name}-knowledge-${i}`} className={`w-2 h-4 rounded-sm ${i < course.knowledgeLevel ? 'bg-accent' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>
            <div className="bg-black/20 p-3 rounded-lg border border-white/5">
              <div className="text-[10px] text-muted uppercase tracking-wider mb-1 flex items-center gap-1"><Target className="w-3 h-3 text-primary"/> Projects</div>
              <div className="text-lg font-mono font-bold text-white">{course.projectsBuilt} <span className="text-xs text-muted font-sans">built</span></div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted pt-4 border-t border-white/10">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {course.duration}</div>
            <div className="text-primary">{course.category}</div>
          </div>
        </div>

        {/* Hover Gradient Sweep */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </motion.div>
    </div>
  );
};

export const LearningJourney = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [explosion, setExplosion] = useState(false);
  const inView = useInView(containerRef, { once: true, amount: 0.1 });
  
  const [animationStarted, setAnimationStarted] = useState(false);
  const [unlockedNodes, setUnlockedNodes] = useState<boolean[]>([false, false, false]);
  const [unlockedCards, setUnlockedCards] = useState<boolean[]>([false, false, false]);
  const [timelineGlow, setTimelineGlow] = useState(false);
  
  const timelineProgress = useMotionValue(0);
  const pulseLength = useTransform(timelineProgress, (val) => val > 0.05 ? 0.05 : val);
  const pulseOffset = useTransform(timelineProgress, (val) => val > 0.05 ? val - 0.05 : 0);

  const handleDoubleClick = () => {
    setExplosion(true);
    setTimeout(() => setExplosion(false), 1500);
  };

  useEffect(() => {
    if (inView && !animationStarted) {
      setAnimationStarted(true);
      
      const runSequence = async () => {
        try {
          // 1. Fade into view: delay slightly
          await new Promise(resolve => setTimeout(resolve, 500));

          // 2. Draw line to Year 1 (progress 0.15)
          await animate(timelineProgress, 0.15, { duration: 1.2, ease: "easeInOut" });

          // 3. Unlock Year 1 node (2024)
          setUnlockedNodes([true, false, false]);
          await new Promise(resolve => setTimeout(resolve, 800));

          // 4. Unlock Year 1 cards
          setUnlockedCards([true, false, false]);
          await new Promise(resolve => setTimeout(resolve, 1000));

          // 5. Draw line to Year 2 (progress 0.5)
          await animate(timelineProgress, 0.5, { duration: 1.8, ease: "easeInOut" });

          // 6. Unlock Year 2 node (2025)
          setUnlockedNodes([true, true, false]);
          await new Promise(resolve => setTimeout(resolve, 800));

          // 7. Unlock Year 2 cards
          setUnlockedCards([true, true, false]);
          await new Promise(resolve => setTimeout(resolve, 1200));

          // 8. Draw line to Year 3 (progress 0.85)
          await animate(timelineProgress, 0.85, { duration: 1.8, ease: "easeInOut" });

          // 9. Unlock Year 3 node (2026)
          setUnlockedNodes([true, true, true]);
          await new Promise(resolve => setTimeout(resolve, 800));

          // 10. Unlock Year 3 cards
          setUnlockedCards([true, true, true]);
          await new Promise(resolve => setTimeout(resolve, 1000));

          // 11. Draw line to the end (progress 1.0)
          await animate(timelineProgress, 1.0, { duration: 1.0, ease: "easeInOut" });

          // 12. Complete & glow
          setTimelineGlow(true);
        } catch (error) {
          console.error("Timeline animation failed, falling back to show all:", error);
          // Fallback: show everything immediately
          setUnlockedNodes([true, true, true]);
          setUnlockedCards([true, true, true]);
          timelineProgress.set(1.0);
          setTimelineGlow(true);
        }
      };

      runSequence();
    }
  }, [inView, animationStarted, timelineProgress]);

  // Group courses by year for the Snaking Timeline
  const coursesByYear = portfolioData.courses.reduce((acc: any, course) => {
    if (!acc[course.year]) acc[course.year] = [];
    acc[course.year].push(course);
    return acc;
  }, {});
  
  const years = Object.keys(coursesByYear).sort();

  return (
    <section 
      id="learning" 
      ref={containerRef}
      onDoubleClick={handleDoubleClick}
      className="relative min-h-screen py-32 overflow-hidden bg-background"
    >
      <BackgroundUniverse explosion={explosion} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <InteractiveHeading sectionId="learning" className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-accent">
              LEARNING UNIVERSE
            </InteractiveHeading>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent rounded-full animate-pulse" />
          </motion.div>
          <p className="mt-6 text-muted text-lg max-w-2xl mx-auto">
            "Every course, certification, and project represents another step toward becoming a world-class AI Engineer."
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Snaking Energy Timeline */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-32 pointer-events-none hidden md:block">
            <svg className="w-full h-full" preserveAspectRatio="none">
              {/* Background Path */}
              <path
                d="M 64 0 Q 128 250, 64 500 T 64 1000 T 64 1500 T 64 2000"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="4"
                fill="none"
              />
              
              {/* Main Line Path (Growing) */}
              <motion.path
                d="M 64 0 Q 128 250, 64 500 T 64 1000 T 64 1500 T 64 2000" // Approximated snake
                stroke="url(#snake-gradient)"
                strokeWidth="4"
                fill="none"
                style={{ pathLength: timelineProgress }}
                animate={timelineGlow ? {
                  strokeWidth: [4, 8, 4],
                  filter: [
                    "drop-shadow(0 0 10px rgba(0,229,255,0.8))",
                    "drop-shadow(0 0 25px rgba(0,229,255,1))",
                    "drop-shadow(0 0 10px rgba(0,229,255,0.8))"
                  ]
                } : {}}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]"
              />
              
              {/* Energy Pulse Path (Leading Edge) */}
              <motion.path
                d="M 64 0 Q 128 250, 64 500 T 64 1000 T 64 1500 T 64 2000"
                stroke="#FFFFFF"
                strokeWidth="6"
                fill="none"
                style={{ 
                  pathLength: pulseLength,
                  pathOffset: pulseOffset
                }}
                className="drop-shadow-[0_0_15px_rgba(255,255,255,1)]"
              />
              
              <linearGradient id="snake-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E5FF" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </svg>
          </div>

          {/* Year Nodes and Courses */}
          <div className="space-y-32">
            {years.map((year, yearIndex) => (
              <div key={year} className="relative">
                {/* Holographic Year Sphere */}
                <div className="flex justify-center mb-16 relative z-20">
                  <HolographicYearSphere year={year} progress={Math.min(100, (yearIndex + 1) * 33)} isUnlocked={unlockedNodes[yearIndex]} />
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 relative z-10">
                  {coursesByYear[year].map((course: any, courseIndex: number) => (
                    <motion.div
                      key={courseIndex}
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      animate={unlockedCards[yearIndex] ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
                      transition={{ duration: 0.8, delay: courseIndex * 0.2, ease: "easeOut" }}
                      className={`${courseIndex % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:mt-24'}`}
                    >
                      <CourseCard3D course={course} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
