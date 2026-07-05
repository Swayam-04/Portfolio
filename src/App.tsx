import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Analytics } from "@vercel/analytics/react";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Certifications } from "./components/sections/Certifications";
import { LearningJourney } from "./components/sections/LearningJourney";
import { Awards } from "./components/sections/Awards";
import { JourneyBlog } from "./components/sections/JourneyBlog";
import { Contact } from "./components/sections/Contact";
import { GlobalCanvas } from "./components/3d/GlobalCanvas";
import { SpeechBubbleOverlay } from "./components/ui/SpeechBubbleOverlay";

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-background min-h-screen text-text selection:bg-primary/30">
      <GlobalCanvas />
      <SpeechBubbleOverlay />
      <Navbar />
      
      <main className="flex flex-col gap-16 md:gap-24 pb-24">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <LearningJourney />
        <Awards />
        <JourneyBlog />
        <Contact />
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
