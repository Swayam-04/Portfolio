import { create } from 'zustand';

export type HoverState = 'none' | 'resume' | 'projects' | 'skills' | 'contact' | 'github' | 'linkedin' | 'vaani' | 'cropintel' | 'rezumo' | 'intruder' | 'journey';
export type Section = 'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'learning' | 'journey' | 'certifications' | 'awards' | 'github' | 'resume' | 'contact' | 'footer';

interface RobotStore {
  // Global States
  hoverState: HoverState;
  activeSection: Section;
  clickCount: number;
  isBooting: boolean;
  
  // Analytics
  visitorCount: number;
  activeMilestone: number | null;
  scrollLock: boolean;
  
  // NEW Help Text System (Centralized, Callback-based)
  bubbleVisible: boolean;
  bubbleText: string;
  speechId: number;
  speechRequestId: number;
  
  // Actions
  setHoverState: (state: HoverState) => void;
  setActiveSection: (section: Section) => void;
  incrementClick: () => void;
  setBooting: (status: boolean) => void;
  
  // Help Text Actions
  onRobotArrived: (section: Section) => void;
  hideBubble: () => void;
  
  // Utility
  forceSection: (section: Section) => void;
  setVisitorCount: (count: number) => void;
  triggerMilestone: (milestone: number) => void;

  // Draggable Settings
  followGuide: boolean;
  customPosition: { x: number; y: number } | null;
  setFollowGuide: (val: boolean) => void;
  setCustomPosition: (pos: { x: number; y: number } | null) => void;
  resetPosition: () => void;
}

export const GUIDE_TEXT: Record<Section, string> = {
  hero: "Welcome! This is the starting point of my portfolio. I'll guide you through my journey, projects, achievements, and technical expertise.",
  about: "This section introduces who I am, my background, interests, and the journey that shaped me into an AI and Full Stack Developer.",
  skills: "Explore the technologies, frameworks, programming languages, and tools I use to build intelligent software.",
  experience: "This section highlights internships, leadership experiences, and real-world engineering work.",
  projects: "Here you'll discover my most impactful projects, including AI applications, full-stack platforms, and research-driven solutions.",
  learning: "Explore my learning universe, featuring courses, certifications, workshops, and technical growth.",
  journey: "This section highlights my key milestones, technical reflections, and journey logs.",
  certifications: "These certifications validate my practical skills and commitment to continuous learning.",
  awards: "Every achievement here represents dedication, teamwork, innovation, and problem solving.",
  github: "Explore my coding consistency, repositories, open-source work, and development activity.",
  resume: "View or download my latest resume for a complete overview of my skills and experience.",
  contact: "If you'd like to collaborate, discuss opportunities, or simply connect, this is the place.",
  footer: "Thanks for visiting my portfolio. I hope you enjoyed exploring my work."
};

export const useRobotStore = create<RobotStore>((set) => ({
  hoverState: 'none',
  activeSection: 'hero',
  clickCount: 0,
  isBooting: true,
  
  visitorCount: 0,
  activeMilestone: null,
  scrollLock: false,
  
  bubbleVisible: false,
  bubbleText: "",
  speechId: 0,
  speechRequestId: 0,

  setHoverState: (state) => set({ hoverState: state }),
  
  setActiveSection: (section) => set((state) => {
    if (state.scrollLock) return state;
    if (state.activeSection === section) return state;
    return { 
      activeSection: section,
      speechRequestId: state.speechRequestId + 1,
      bubbleVisible: false,
      followGuide: true
    };
  }),
  
  incrementClick: () => set((state) => ({ clickCount: state.clickCount + 1 })),
  setBooting: (status) => set({ isBooting: status }),
  
  onRobotArrived: (section) => {
    console.log(`[STAGE 5] Bubble Manager: onRobotArrived triggered for section ${section}`);
    const text = GUIDE_TEXT[section] || "Information coming soon.";
    set((state) => ({
      bubbleVisible: true,
      bubbleText: text,
      speechId: state.speechId + 1
    }));
  },
  
  hideBubble: () => {
    console.log(`[STAGE 9] Bubble Manager: hideBubble called`);
    set({ bubbleVisible: false });
  },
  
  forceSection: (section) => {
    console.log(`[STAGE 2] Store Update: forceSection(${section})`);
    
    // Clear existing lock if any
    if ((window as any)._scrollLockTimeout) {
      clearTimeout((window as any)._scrollLockTimeout);
    }
    
    set((state) => ({
      scrollLock: true,
      activeSection: section,
      bubbleVisible: false, // Instantly hide bubble when moving starts
      speechRequestId: state.speechRequestId + 1,
      followGuide: true
    }));
    
    // Unlock scrolling after robot likely arrives
    (window as any)._scrollLockTimeout = setTimeout(() => {
      set({ scrollLock: false });
    }, 2000);
  },
  
  setVisitorCount: (count) => set({ visitorCount: count }),
  
  triggerMilestone: (milestone) => {
    set({ activeMilestone: milestone });
    setTimeout(() => {
      set({ activeMilestone: null });
    }, 5000);
  },

  followGuide: true,
  customPosition: null,
  setFollowGuide: (val) => set({ followGuide: val }),
  setCustomPosition: (pos) => set({ customPosition: pos }),
  resetPosition: () => set({ followGuide: true, customPosition: null })
}));
