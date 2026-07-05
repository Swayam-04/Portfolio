import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { Send, MapPin, Mail, Loader2 } from "lucide-react";
import { portfolioData } from "../../data/portfolio";

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate EmailJS integration
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <SectionHeading title="Let's Connect" subtitle="Contact Me" sectionId="contact" />

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-text">Ready to build something amazing?</h3>
              <p className="text-muted text-lg">
                Whether you have a question, a project idea, or just want to say hi, my inbox is always open. Let's create the future together.
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted uppercase tracking-wider">Email</h4>
                  <a href={`mailto:${portfolioData.personal.email}`} className="text-lg font-semibold text-text hover:text-primary transition-colors">
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted uppercase tracking-wider">Location</h4>
                  <span className="text-lg font-semibold text-text">
                    {portfolioData.personal.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Map Area */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 relative mt-4 bg-surface/20">
              <iframe 
                src="https://maps.google.com/maps?q=Bhubaneswar&t=m&z=12&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale invert-[0.9] contrast-[1.2] opacity-80 hover:opacity-100 transition-opacity duration-300"
                allowFullScreen
                loading="lazy"
                title="Bhubaneswar Map"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard glow className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-text">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      className="bg-background border border-white/10 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-text">Your Email</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      className="bg-background border border-white/10 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-medium text-text">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    required
                    className="bg-background border border-white/10 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-text">Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={6}
                    className="bg-background border border-white/10 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full mt-4 h-14">
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Sending...</>
                  ) : submitted ? (
                    "Message Sent Successfully!"
                  ) : (
                    <><Send className="w-5 h-5 mr-2" /> Send Message</>
                  )}
                </Button>
                
              </form>
            </GlassCard>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
