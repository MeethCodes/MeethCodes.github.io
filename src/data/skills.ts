import { Code, Database, Layout, Terminal, Cpu, Bot } from "lucide-react"; // Note: Added 'Bot' for the new category
import { LucideIcon } from "lucide-react";

export type SkillCategory = {
  name: string;
  icon: LucideIcon;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    icon: Terminal,
    skills: ["Python", "Java", "Kotlin", "C++", "JavaScript"],
  },
  {
    name: "AI/ML Development",
    icon: Bot, // A new icon for this category
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "NLP"],
  },
  {
    name: "Full-Stack Development",
    icon: Layout,
    skills: ["Android Development", "Full-Stack Web Dev", "REST APIs"],
  },
  {
    name: "Databases",
    icon: Database,
    skills: ["SQL", "Firebase"],
  },
  {
    name: "Tools & Technologies",
    icon: Cpu,
    skills: ["Git", "GitHub", "GitHub CLI", "Arduino"],
  },
];
