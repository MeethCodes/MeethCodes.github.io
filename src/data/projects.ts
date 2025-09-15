export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    github: string;
    live?: string;
  };
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Android app for detecting diabetes (Android app)",
    description: "Conducted detailed EDA and evaluated various ML models to predict diabetes based on health features, developing an Android application with 90% prediction accuracy.",
    image: "/imgs/p1.png", // Placeholder image path
    tags: ["Kotlin", "Jetpack Compose", "Python", "Machine Learning", "Pandas", "Numpy", "Matplotlib", "Sklearn"],
    links: {
      github: ""
      
    },
  },
  {
    id: 2,
    title: "Chatbot based EMS system (Web App)",
    description: "Built an Employee Management System leveraging NLP to convert English prompts into SQL queries and implemented a user-friendly frontend, reducing response time by over 40%.",
    image: "/imgs/p2.png", // Placeholder image path
    tags: ["Python", "HuggingFace", "Gemini API", "Pandas", "Numpy", "Matplotlib", "Sklearn", "GitHub"],
    links: {
      github: ""
    },
  },
  {
    id: 3,
    title: "E-commerce Product Q&A Bot (Browser Extension)",
    description: "Engineered a service that processes dynamically scraped web content, enabling users to receive real-time, context-aware answers to natural language queries about products.",
    image: "/imgs/p3.png", // Placeholder image path
    tags: ["Python", "Flask", "JavaScript", "Groq API (LLM)", "HTML/CSS", "Git"],
    links: {
      github: ""
    },
  },
];