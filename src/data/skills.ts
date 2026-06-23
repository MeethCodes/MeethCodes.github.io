export type SkillCategory = {
  id: string;
  name: string;
  skills: string[];
  span?: "sm" | "md" | "lg";
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages & Mobile",
    span: "lg",
    skills: ["Python", "C", "C++", "Kotlin", "Jetpack Compose", "JavaScript"],
  },
  {
    id: "aiml",
    name: "AI / ML",
    span: "lg",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "LangChain",
      "LoRA / QLoRA",
      "RAG",
      "LLM Fine-tuning",
      "NLP",
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Infra",
    span: "md",
    skills: [
      "AWS",
      "Docker",
      "Nginx",
      "Gitea",
      "Firebase",
      "Heroku",
      "Render",
      "fail2ban",
      "CrowdSec",
    ],
  },
  {
    id: "databases",
    name: "Databases",
    span: "md",
    skills: ["PostgreSQL", "MySQL", "Qdrant", "Neo4j", "DynamoDB"],
  },
  {
    id: "automation",
    name: "Automation",
    span: "md",
    skills: ["n8n", "Azure Automation", "Lindy AI", "Shell scripting", "ntfy"],
  },
];

export const statCounters = [
  { label: "Public Repos", value: 12, suffix: "+" },
  { label: "Languages", value: 4, suffix: "" },
  { label: "Certifications", value: 7, suffix: "+" },
  { label: "Years Coding", value: 4, suffix: "+" },
];
