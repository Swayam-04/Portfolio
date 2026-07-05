import { Canvas } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { AICoreRobot } from "./AICoreRobot";
import { useEffect } from "react";
import { useRobotStore } from "../../store/useRobotStore";
import type { Section } from "../../store/useRobotStore";
export const GlobalCanvas = () => {
  const { setActiveSection } = useRobotStore();

  useEffect(() => {
    // 12 Sections to track
    const sections: Section[] = ['hero', 'about', 'skills', 'experience', 'projects', 'learning', 'certifications', 'awards', 'github', 'resume', 'contact', 'footer', 'journey'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let maxIntersectionRatio = 0;
        let mostVisibleSection: Section | null = null;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id as Section;
          }
        });

        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        root: null,
        rootMargin: '-10% 0px -40% 0px', // Trigger slightly below the top and ignore the bottom
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // high resolution tracking
      }
    );

    // Observe all sections by their ID
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <>
      <div className="fixed inset-0 z-40 pointer-events-none">
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 45 }}
          eventSource={document.body}
          eventPrefix="client"
          style={{ pointerEvents: 'none' }}
        >
          <AICoreRobot />
          <Environment preset="city" />
          <Preload all />
        </Canvas>
      </div>
    </>
  );
};
