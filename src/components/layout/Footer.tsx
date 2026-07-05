import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolioData } from "../../data/portfolio";

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-background py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-2xl tracking-tighter text-white">SWAYAM BARIK</span>
            <p className="text-muted text-sm text-center md:text-left max-w-xs">
              {portfolioData.personal.tagline}
            </p>
          </div>

          <div className="flex gap-4">
            <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 text-muted hover:text-primary hover:bg-white/10 transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 text-muted hover:text-primary hover:bg-white/10 transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href={`mailto:${portfolioData.personal.email}`} className="p-2 rounded-full bg-white/5 text-muted hover:text-primary hover:bg-white/10 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted">
            Built with <span className="text-primary animate-pulse">❤</span> & Vite
          </div>
        </div>
      </div>
    </footer>
  );
};
