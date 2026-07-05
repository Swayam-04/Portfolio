import { useEffect, useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { portfolioData } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Trophy, Star, Target, Medal } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { GlassCard } from "../ui/GlassCard";
// Removing unused cn import

// --- Animated Counter ---
const Counter = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;
    const update = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(update);
    };
    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
};

// --- Spotlight Card for Awards ---
const AwardCard = ({ award, index }: { award: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    x.set((e.clientX - rect.left) / width - 0.5);
    y.set((e.clientY - rect.top) / height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const background = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const rect = ref.current?.getBoundingClientRect();
      const px = (latestX as number + 0.5) * (rect?.width || 0);
      const py = (latestY as number + 0.5) * (rect?.height || 0);
      return `radial-gradient(400px circle at ${px}px ${py}px, rgba(255,215,0,0.15), transparent 40%)`;
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full group"
      >
        <GlassCard className="h-full flex flex-col overflow-hidden hover:border-[#FFD700]/50 transition-colors duration-500">
          <motion.div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background }} />
          
          <div className="relative h-48 overflow-hidden z-10">
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10" />
            <img src={award.image} alt={award.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-[#FFD700]/50 text-[#FFD700] text-xs font-bold rounded-full shadow-[0_0_15px_rgba(255,215,0,0.3)] flex items-center gap-1.5">
                <Medal className="w-3.5 h-3.5" /> {award.position}
              </span>
            </div>
          </div>

          <div className="p-6 relative z-10 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
            <p className="text-sm font-semibold text-primary mb-1">{award.competition}</p>
            <p className="text-xs text-muted font-medium mb-4">{award.organizer} • {award.date}</p>
            <p className="text-sm text-muted/90 leading-relaxed mb-6 flex-grow">{award.description}</p>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export const Awards = () => {
  const stats = [
    { label: "Projects Built", value: portfolioData.stats.projects, icon: Target, suffix: "+" },
    { label: "Hackathons", value: portfolioData.stats.hackathons, icon: Trophy, suffix: "+" },
    { label: "Awards Won", value: portfolioData.stats.awards, icon: Star, suffix: "+" },
    { label: "Github Commits", value: portfolioData.stats.githubContributions, icon: FaGithub, suffix: "+" },
  ];

  return (
    <section id="awards" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="Impact & Recognition" subtitle="Awards" sectionId="awards" />

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 mt-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 hover:border-primary/50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-1 flex items-center">
                  <Counter end={stat.value} />
                  <span className="text-primary ml-1">{stat.suffix}</span>
                </div>
                <span className="text-xs font-bold text-muted uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Awards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.awards.map((award, idx) => (
            <AwardCard key={award.title} award={award} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
