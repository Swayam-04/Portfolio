import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { ShieldCheck, ExternalLink, Award } from "lucide-react";
import { cn } from "../../utils/cn";
import { GlassCard } from "../ui/GlassCard";

export const Certifications = () => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(portfolioData.certifications.map(c => c.category)))];

  const filteredCerts = portfolioData.certifications.filter(c => 
    filter === "All" || c.category === filter
  );

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="Verified Credentials" subtitle="Certifications" sectionId="certifications" />

        {/* Premium Animated Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat || "All")}
              className={cn(
                "relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors duration-300",
                filter === cat ? "text-black" : "text-muted hover:text-white"
              )}
            >
              {filter === cat && (
                <motion.div
                  layoutId="certFilter"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                key={`${cert.title}-${idx}`}
                className="group h-full"
              >
                <GlassCard className="h-full flex flex-col p-8 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,229,255,0.2)]">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-semibold text-muted tracking-wider border border-white/5">
                      {cert.date}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted font-medium mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-secondary" /> {cert.issuer}
                    </p>
                    {cert.category && (
                      <span className="inline-block px-3 py-1 bg-black/40 border border-white/10 rounded text-xs font-bold text-white/80 mb-6">
                        {cert.category}
                      </span>
                    )}
                  </div>

                  {/* Footer CTA */}
                  <div className="mt-auto pt-6 border-t border-white/10 flex justify-end">
                    <button className="flex items-center gap-2 text-sm font-semibold text-primary/80 hover:text-primary transition-colors group/btn">
                      Verify Credential 
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
