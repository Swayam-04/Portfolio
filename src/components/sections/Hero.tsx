import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Mail, Download, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolioData } from "../../data/portfolio";
import { Button } from "../ui/Button";
import { useRobotStore } from "../../store/useRobotStore";

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.substring(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const { setHoverState, forceSection } = useRobotStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % portfolioData.personal.role.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Animated Grid & Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl text-primary font-medium tracking-wide uppercase">
              Hello, I'm
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold text-text tracking-tighter">
              {portfolioData.personal.name}
            </h1>
            <div className="h-12 md:h-16 text-2xl md:text-4xl font-semibold text-muted">
              <TypewriterText key={roleIndex} text={portfolioData.personal.role[roleIndex]} />
            </div>
          </div>

          <p className="text-lg text-muted max-w-lg leading-relaxed">
            {portfolioData.personal.tagline}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Button 
              onClick={() => {
                window.location.href = '#projects';
                forceSection('projects');
              }} 
              className="gap-2" 
              onMouseEnter={() => setHoverState('projects')} 
              onMouseLeave={() => setHoverState('none')}
            >
              View Projects <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onMouseEnter={() => setHoverState('resume')} 
              onMouseLeave={() => setHoverState('none')}
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'Swayam_Barik_Resume.pdf';
                link.click();
              }}
            >
              <Download className="w-4 h-4" /> Download Resume
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-8">
            <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="text-muted hover:text-text transition-colors transform hover:scale-110" onMouseEnter={() => setHoverState('github')} onMouseLeave={() => setHoverState('none')}>
              <FaGithub className="w-6 h-6" />
            </a>
            <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-text transition-colors transform hover:scale-110" onMouseEnter={() => setHoverState('linkedin')} onMouseLeave={() => setHoverState('none')}>
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href={`mailto:${portfolioData.personal.email}`} className="text-muted hover:text-text transition-colors transform hover:scale-110" onMouseEnter={() => setHoverState('contact')} onMouseLeave={() => setHoverState('none')}>
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        {/* Right 3D Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[400px] md:h-[600px] w-full relative"
        >
          {/* Subtle glow behind where the global robot sits */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};
