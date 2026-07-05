import { motion } from "framer-motion";
import { portfolioData } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { Brain, Code, Terminal, Zap } from "lucide-react";

const badgeIcons = [Brain, Code, Terminal, Zap];

export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="About Me" subtitle="Who I Am" sectionId="about" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image Placeholder & Badges */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Image Placeholder */}
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
              <img
                src="/image/Photo.jpeg"
                alt="Swayam Barik"
                className="w-full h-full object-cover object-[60%_80%] transition-transform duration-700 group-hover:scale-105"
              />
              {/* Neon Glow effect behind */}
              <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* Floating Badges */}
            <div className="absolute -right-8 -bottom-8 grid grid-cols-2 gap-4 z-20 hidden md:grid">
              {portfolioData.about.badges.map((badge, idx) => {
                const Icon = badgeIcons[idx % badgeIcons.length];
                return (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <GlassCard className="p-4 flex flex-col items-center justify-center gap-2 text-center w-32 h-32 hover:border-primary/50 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                      <span className="text-xs font-medium text-text">{badge}</span>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Intro & Journey */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-text">Building the Future with AI</h3>
              <p className="text-muted text-lg leading-relaxed">
                {portfolioData.about.introduction}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-text">My Journey</h3>
              <p className="text-muted text-lg leading-relaxed">
                {portfolioData.about.journey}
              </p>
            </div>

            {/* Simple Timeline/Highlights */}
            <div className="flex flex-col gap-6 mt-4">
              {[
                { title: "B.Tech in Computer Science", desc: "Focus on AI & Machine Learning" },
                { title: "Multiple Hackathon Wins", desc: "Recognized for innovative AI solutions" },
                { title: "Open Source Contributor", desc: "Giving back to the dev community" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text">{item.title}</h4>
                    <p className="text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
