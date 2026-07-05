import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Trophy, Star, Target, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { GlassCard } from "../ui/GlassCard";

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
      
      // Easing out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
};

export const Achievements = () => {
  const stats = [
    { label: "Projects", value: portfolioData.stats.projects, icon: Target, suffix: "+" },
    { label: "Hackathons", value: portfolioData.stats.hackathons, icon: Trophy, suffix: "+" },
    { label: "Bootcamps", value: portfolioData.stats.bootcamps, icon: BookOpen, suffix: "" },
    { label: "Awards", value: portfolioData.stats.awards, icon: Star, suffix: "+" },
    { label: "Commits", value: portfolioData.stats.githubContributions, icon: FaGithub, suffix: "+" },
  ];

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="Impact by the Numbers" subtitle="Achievements" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 mt-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <GlassCard glow className="p-8 flex flex-col items-center justify-center text-center group">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                    <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-text mb-2 flex items-center">
                    <Counter end={stat.value} />
                    <span className="text-primary ml-1">{stat.suffix}</span>
                  </div>
                  <span className="text-sm font-medium text-muted uppercase tracking-wider">{stat.label}</span>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
