export const portfolioData = {
  personal: {
    name: "Swayam Barik",
    role: ["AI Developer", "Full Stack Developer"],
    location: "Bhubaneswar, Odisha, India",
    tagline: "Building AI solutions that solve real-world problems.",
    email: "swayambarik23@gmail.com",
    github: "https://github.com/Swayam-04",
    linkedin: "https://www.linkedin.com/in/swayambarik23",
  },
  about: {
    introduction:
      "Ambitious Computer Science & Engineering undergraduate with proven experience building scalable web apps, full-stack frameworks, and AI-driven solutions. Deep technical competency across Python, Java, JavaScript, and cloud-ready architectures.",
    journey:
      "Demonstrated problem-solving and rapid prototyping capabilities as a two-time hackathon winner and former defense-sector tech intern. Actively seeking an entry-level software engineering or web development role within a progressive tech ecosystem.",
    badges: ["Problem Solver", "Hackathon Winner", "Tech Intern", "AI Enthusiast"],
  },
  skills: {
    languages: ["Python", "Java", "JavaScript", "C", "SQL", "HTML5", "CSS3"],
    frontend: ["React", "Bootstrap", "Tailwind CSS", "Framer Motion", "Three.js"],
    backend: ["Django", "Flask", "REST APIs", "Node.js", "Express"],
    database: ["MySQL", "Relational Databases", "PostgreSQL", "MongoDB"],
    ai: ["YOLOv8", "Computer Vision", "Machine Learning", "PyTorch", "TensorFlow"],
    cloud: ["Git", "GitHub", "Docker", "Vercel"],
  },
  projects: [
    {
      id: "vaani-ai",
      title: "Vaani AI",
      category: "AI",
      description: "An advanced AI Voice Assistant capable of natural conversations, utilizing state-of-the-art LLMs, speech-to-text, and text-to-speech technologies.",
      techStack: ["React", "FastAPI", "LLM", "Whisper STT", "Chatterbox TTS"],
      features: ["Real-time streaming", "Contextual understanding", "Multi-language support"],
      github: "https://github.com/Swayam-04/Vaani-AI",
      live: "",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop", 
    },
    {
      id: "cropintel",
      title: "CropIntel AI",
      category: "AI & Web",
      description: "An intelligent platform for farmers providing disease detection, profit prediction, and smart irrigation insights using Machine Learning and weather data.",
      techStack: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "Weather API"],
      features: ["Disease Detection", "Profit Prediction", "Market Analysis", "Smart Irrigation"],
      github: "https://github.com/Swayam-04/agri-decision-platform",
      live: "",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop", 
    },
    {
      id: "cybernetra",
      title: "CyberNetra",
      category: "Security",
      description: "Cybersecurity Platform for Odisha Police developed to help spread awareness against cyber attacks and provide training.",
      techStack: ["JavaScript", "HTML", "CSS"],
      features: ["Cyber Awareness", "Training Modules", "Incident Reporting"],
      github: "",
      live: "",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "intruder-yolo",
      title: "Intruder Detection System",
      category: "Computer Vision",
      description: "A real-time computer vision system using YOLO and OpenCV to detect unauthorized access and send instant alerts.",
      techStack: ["Python", "YOLOv8", "OpenCV", "Twilio API"],
      features: ["Real-time Detection", "Instant Alerts", "Motion Tracking", "Video Logging"],
      github: "https://github.com/Swayam-04/Surveilence-System",
      live: "",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1000&auto=format&fit=crop", 
    },
    {
      id: "phisingsimulator",
      title: "Phishing Simulator",
      category: "Security",
      description: "An educational tool simulating phishing attacks to train users in recognizing malicious attempts.",
      techStack: ["JavaScript", "HTML", "CSS"],
      features: ["Attack Simulation", "User Metrics", "Training Modules"],
      github: "https://github.com/Swayam-04/phisingsimulator",
      live: "",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "radar-simulate",
      title: "Radar Simulator",
      category: "Security",
      description: "A web-based simulation of radar systems and target tracking.",
      techStack: ["HTML", "JavaScript"],
      features: ["Real-time sweeping", "Target generation", "Interactive UI"],
      github: "https://github.com/Swayam-04/RadarSimulate",
      live: "",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "ai-train",
      title: "AI Train Traffic Control (SIH)",
      category: "AI",
      description: "An AI-powered decision-support system developed for the Smart India Hackathon to maximize railway section throughput and detect real-time conflicts.",
      techStack: ["Python", "TensorFlow", "React", "Node.js"],
      features: ["Conflict Detection", "Throughput Optimization", "Predictive Analytics"],
      github: "https://github.com/Swayam-04/ai-train",
      live: "",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "nss-website",
      title: "NSS Organization Website",
      category: "Web App",
      description: "Official web platform built for the National Service Scheme organization to manage events and volunteers.",
      techStack: ["TypeScript", "React"],
      features: ["Event Management", "Volunteer Registration", "Gallery"],
      github: "https://github.com/Swayam-04/nss_website",
      live: "",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "univ-lms",
      title: "University LMS Platform",
      category: "Web App",
      description: "A comprehensive Learning Management System built for universities to manage courses, assignments, and student engagement.",
      techStack: ["React", "Node.js", "MongoDB", "Express"],
      features: ["Course Management", "Real-time Chat", "Assignment Tracking"],
      github: "",
      live: "",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "ai-hospital",
      title: "AI Hospital Management System",
      category: "AI & Web",
      description: "An intelligent healthcare platform that integrates AI for patient diagnosis prediction and automated resource allocation.",
      techStack: ["Python", "TensorFlow", "React", "PostgreSQL"],
      features: ["Patient Management", "Disease Prediction", "Resource Optimization"],
      github: "",
      live: "",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "aestroshield",
      title: "AestroShield (Cosmic Tracker)",
      category: "Web App & 3D",
      description: "Real-time asteroid tracking and risk assessment platform powered by NASA's Near Earth Object API with interactive 3D orbit visualization.",
      techStack: ["Next.js", "Three.js", "Express", "MongoDB", "NASA API"],
      features: ["Live Asteroid Tracking", "3D Orbit Viewer", "Risk Assessment Engine", "AI Chat"],
      github: "",
      live: "",
      image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop",
    }
  ],
  experience: [
    {
      id: 1,
      role: "Summer Intern",
      company: "PXE, DRDO",
      duration: "Jun 2026 - Present",
      description: "Developed a surveillance system to identify optimal threats and targets. Assessed factors to establish accurate threat levels and collaborated with the Ministry of Defence to enhance security measures.",
      type: "Internship"
    },
    {
      id: 2,
      role: "AIML Internship",
      company: "ITR, DRDO",
      duration: "May 2026 - Jun 2026",
      description: "Built a YOLOv8-based AI model for real-time human and drone intrusion detection. Performed dataset collection, preprocessing, and augmentation. Evaluated model using Precision, Recall, F1-Score, and mAP metrics.",
      type: "Internship"
    },
    {
      id: 3,
      role: "Web Developer",
      company: "DRDO",
      duration: "Jun 2025 - Jul 2025",
      description: "Contributed to defense-oriented web applications, focusing on reliability, security, and precision in technology.",
      type: "Internship"
    },
    {
      id: 4,
      role: "Lead Developer",
      company: "University Hackathon Team",
      duration: "2023 - Present",
      description: "Led a team to win the National AI Hackathon (Cybersecurity Hackathon Winner 2025, BPUT 2nd Runner-up). Architected backend and integrated real-time models.",
      type: "Leadership"
    }
  ],
  stats: {
    projects: 25,
    hackathons: 20,
    bootcamps: 3,
    awards: 3,
    githubContributions: 1200,
  },
  certifications: [
    {
      title: "Developing Back-End Apps with Node.js and Express",
      issuer: "Coursera / IBM",
      date: "2023",
      category: "Web Development"
    },
    {
      title: "Introduction to Generative AI",
      issuer: "Google Cloud",
      date: "2023",
      category: "AI & ML"
    },
    {
      title: "Getting Started With Artificial Intelligence",
      issuer: "LinkedIn Learning",
      date: "2023",
      category: "AI & ML"
    },
    {
      title: "Introduction to Web Development with HTML, CSS, JavaScript",
      issuer: "IBM",
      date: "2023",
      category: "Web Development"
    },
    {
      title: "EY Techathon 5.0 (Round 1: Executive Summary)",
      issuer: "EY",
      date: "2023",
      category: "Business & Strategy"
    }
  ],
  courses: [
    { 
      name: "Python Bootcamp", platform: "Udemy", instructor: "Dr. Angela Yu", year: "2024", duration: "40 hours", 
      difficulty: "Beginner", knowledgeLevel: 5, projectsBuilt: 15, category: "Programming",
      tech: [
        { name: "Python", experience: "3 Years", projects: 15 },
        { name: "OOP", experience: "2 Years", projects: 8 }
      ] 
    },
    { 
      name: "Full-Stack Web Development", platform: "Coursera", instructor: "IBM", year: "2024", duration: "6 months", 
      difficulty: "Intermediate", knowledgeLevel: 4, projectsBuilt: 10, category: "Web",
      tech: [
        { name: "React", experience: "2 Years", projects: 10 },
        { name: "Node.js", experience: "2 Years", projects: 8 },
        { name: "MongoDB", experience: "1 Year", projects: 5 }
      ] 
    },
    { 
      name: "Machine Learning A-Z", platform: "Udemy", instructor: "Kirill Eremenko", year: "2025", duration: "45 hours", 
      difficulty: "Intermediate", knowledgeLevel: 4, projectsBuilt: 8, category: "AI & ML",
      tech: [
        { name: "Scikit-Learn", experience: "1.5 Years", projects: 8 },
        { name: "Pandas", experience: "2 Years", projects: 12 }
      ] 
    },
    { 
      name: "YOLO Object Detection", platform: "DeepLearning.AI", instructor: "Andrew Ng", year: "2025", duration: "20 hours", 
      difficulty: "Advanced", knowledgeLevel: 5, projectsBuilt: 4, category: "Computer Vision",
      tech: [
        { name: "YOLO", experience: "1 Year", projects: 4 },
        { name: "PyTorch", experience: "1 Year", projects: 3 },
        { name: "OpenCV", experience: "1.5 Years", projects: 6 }
      ] 
    },
    { 
      name: "FastAPI Modern Backend", platform: "Udemy", instructor: "Sebastian Ramirez", year: "2025", duration: "25 hours", 
      difficulty: "Advanced", knowledgeLevel: 4, projectsBuilt: 5, category: "Backend",
      tech: [
        { name: "FastAPI", experience: "1 Year", projects: 5 },
        { name: "SQLAlchemy", experience: "1 Year", projects: 4 }
      ] 
    },
    { 
      name: "AI Agents & Autonomous Systems", platform: "DeepLearning.AI", instructor: "Harrison Chase", year: "2026", duration: "40 hours", 
      difficulty: "Expert", knowledgeLevel: 4, projectsBuilt: 3, category: "AI & ML",
      tech: [
        { name: "LangChain", experience: "6 Months", projects: 3 },
        { name: "LLMs", experience: "1 Year", projects: 5 }
      ] 
    },
    { 
      name: "Advanced Computer Vision", platform: "Coursera", instructor: "Andrew Ng", year: "2026", duration: "50 hours", 
      difficulty: "Expert", knowledgeLevel: 4, projectsBuilt: 4, category: "Computer Vision",
      tech: [
        { name: "CNNs", experience: "1.5 Years", projects: 6 },
        { name: "Vision Transformers", experience: "6 Months", projects: 2 }
      ] 
    }
  ],
  awards: [
    {
      title: "2x Hackathon Winner",
      competition: "State-Level Hackathons",
      organizer: "Various Institutions",
      date: "2024 - 2025",
      position: "Winner",
      description: "Secured first place in multiple state-level hackathons by building innovative AI and Web solutions under strict time constraints.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Cybersecurity Hackathon Surprise Winner",
      competition: "Odisha Police Cybersecurity Hackathon",
      organizer: "Odisha Police",
      date: "2025",
      position: "Winner",
      description: "Awarded as the Surprise Winner for developing Cyber Netra, an innovative awareness platform against cyber attacks.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "2nd Runner's Up",
      competition: "BPUT Hackathon",
      organizer: "Biju Patnaik University of Technology",
      date: "2025",
      position: "Top 3",
      description: "Secured podium finish competing against top engineering students across the university.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "2x Shining Star Awardee",
      competition: "Academic Excellence",
      organizer: "Trident Academy of Technology",
      date: "2024 - 2025",
      position: "Awardee",
      description: "Recognized twice for outstanding academic performance, leadership, and contribution to the tech community.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
    }
  ],
  blogPosts: [
    {
      id: "started-btech",
      date: "August 2023",
      title: "Started B.Tech Journey",
      summary: "Began my Computer Science undergraduate degree at Trident Academy of Technology, Bhubaneswar.",
      readTime: "3 min",
      tags: ["Education", "Milestone"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "built-first-ai",
      date: "February 2024",
      title: "Built First AI Project",
      summary: "Successfully trained and deployed my first Machine Learning model using Python and Scikit-Learn.",
      readTime: "5 min",
      tags: ["AI", "Python", "Machine Learning"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "drdo-web-intern",
      date: "June 2025",
      title: "Joined DRDO as Web Developer",
      summary: "Started my first professional internship at DRDO, working on defense-oriented web applications.",
      readTime: "4 min",
      tags: ["Internship", "Web Development", "DRDO"],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "published-vaani",
      date: "October 2025",
      title: "Published Vaani AI",
      summary: "Released Vaani AI, an advanced AI Voice Assistant capable of natural conversations using state-of-the-art LLMs.",
      readTime: "6 min",
      tags: ["AI", "Voice Assistant", "LLM"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "won-cyber-hackathon",
      date: "December 2025",
      title: "Surprise Winner at Cybersecurity Hackathon",
      summary: "Won the Odisha Police Cybersecurity Hackathon for developing Cyber Netra.",
      readTime: "5 min",
      tags: ["Hackathon", "Cybersecurity", "Winner"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "drdo-aiml-intern",
      date: "May 2026",
      title: "Advanced AIML Internship at DRDO (ITR)",
      summary: "Began my second DRDO internship, focusing entirely on Computer Vision and YOLO-based drone detection models.",
      readTime: "4 min",
      tags: ["Internship", "AI", "Computer Vision"],
      image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1000&auto=format&fit=crop"
    }
  ]
};
