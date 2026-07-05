import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../ui/Button";
import { useRobotStore } from "../../store/useRobotStore";
import type { Section } from "../../store/useRobotStore";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certifications" },
  { name: "Learning", href: "#learning" },
  { name: "Awards", href: "#awards" },
  { name: "Journey", href: "#journey" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setHoverState, activeSection, forceSection } = useRobotStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    forceSection(id as Section);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-surface/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-1 group">
          <img src="/image/logo.png" className="w-10 h-10 object-contain rounded-md" alt="Swayam Barik Logo" />
          <span className="font-bold text-xl tracking-tighter">SWAYAM BARIK</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => handleClick(link.href.substring(1))}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative group",
                    activeSection === link.href.substring(1) ? "text-primary" : "text-muted"
                  )}
                  onMouseEnter={() => setHoverState(link.name.toLowerCase() as any)}
                  onMouseLeave={() => setHoverState('none')}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                    activeSection === link.href.substring(1) && "w-full"
                  )} />
                </a>
              </li>
            ))}
          </ul>
          <div className="h-6 w-px bg-white/10" />
          <Button variant="primary" size="sm" onClick={() => window.location.href = '#contact'}>
            Let's Talk
          </Button>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-text p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleClick(link.href.substring(1))}
                  className="text-lg font-medium text-text hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10">
                <Button className="w-full" onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '#contact';
                }}>
                  Let's Talk
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
