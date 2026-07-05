import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../../data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Clock, ThumbsUp, MessageSquare, ChevronLeft, Calendar, Share2 } from "lucide-react";

export const JourneyBlog = () => {
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (selectedPost) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedPost]);

  return (
    <section id="journey" className="py-24 relative bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <SectionHeading title="Milestones & Reflections" subtitle="Journey Log" />

        <div className="relative mt-16 pl-4 md:pl-0">
          {/* Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

          {portfolioData.blogPosts.map((post, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={post.id} className={cn("relative flex items-center justify-between mb-12", isEven ? "md:flex-row-reverse" : "")}>
                
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(0,229,255,0.6)] z-10" />
                
                {/* Empty Space for Grid Alignment on Desktop */}
                <div className="hidden md:block w-[45%]" />

                {/* Card */}
                <motion.div 
                  layoutId={`card-${post.id}`}
                  onClick={() => setSelectedPost(post)}
                  className="w-[90%] md:w-[45%] ml-auto md:ml-0 bg-surface border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-primary/50 transition-colors group"
                >
                  <motion.div layoutId={`image-${post.id}`} className="h-48 relative overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md rounded-full text-white/90">
                        {post.date}
                      </span>
                    </div>
                  </motion.div>
                  <div className="p-6">
                    <motion.h3 layoutId={`title-${post.id}`} className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </motion.h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2">{post.summary}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4 text-xs font-semibold text-muted">
                        <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> {(Math.random() * 200 + 50).toFixed(0)}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {(Math.random() * 20 + 5).toFixed(0)}</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-bold text-primary"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Article Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-background/95 backdrop-blur-xl"
          >
            <div className="min-h-screen container mx-auto px-6 py-8 max-w-4xl">
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-muted hover:text-white transition-colors mb-8 bg-surface px-4 py-2 rounded-full border border-white/10"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Journey
              </button>

              <motion.div layoutId={`card-${selectedPost.id}`} className="bg-surface border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
                <motion.div layoutId={`image-${selectedPost.id}`} className="w-full h-[40vh] md:h-[50vh] relative">
                  <img src={selectedPost.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                </motion.div>

                <div className="p-8 md:p-12 -mt-20 relative z-10">
                  <div className="flex items-center gap-4 text-sm font-semibold text-primary mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedPost.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedPost.readTime}</span>
                  </div>

                  <motion.h1 layoutId={`title-${selectedPost.id}`} className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    {selectedPost.title}
                  </motion.h1>

                  <div className="flex gap-2 mb-10">
                    {selectedPost.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 text-xs font-bold bg-white/5 rounded-full border border-white/10 text-white/70">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-xl text-white/80 leading-relaxed font-medium mb-8">
                      {selectedPost.summary}
                    </p>
                    <p className="text-muted leading-relaxed mb-6">
                      The journey to building premium products requires dedication, persistence, and continuous learning. Over the course of my career, I've consistently pushed the boundaries of what's possible, tackling complex engineering challenges with modern technology stacks.
                    </p>
                    <h3 className="text-2xl font-bold text-white mt-10 mb-4">Lessons Learned</h3>
                    <p className="text-muted leading-relaxed mb-6">
                      Every milestone brings new perspectives. Whether it's architecting a scalable backend, fine-tuning a machine learning model, or collaborating in a high-stakes hackathon environment, the core takeaway remains the same: adaptability is the ultimate skill.
                    </p>
                    <div className="p-6 bg-primary/10 border-l-4 border-primary rounded-r-xl my-8">
                      <p className="text-primary font-medium italic m-0">
                        "Technology should solve real problems, not just look impressive. But when it does both, that's when you've built something truly remarkable."
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm font-semibold text-muted">
                      <span className="flex items-center gap-2 hover:text-white cursor-pointer"><ThumbsUp className="w-4 h-4" /> Like</span>
                      <span className="flex items-center gap-2 hover:text-white cursor-pointer"><MessageSquare className="w-4 h-4" /> Comment</span>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-colors border border-white/10">
                      <Share2 className="w-4 h-4" /> Share Article
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
