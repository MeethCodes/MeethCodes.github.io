export type ExperienceItem = {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "startup",
    period: "Nov 2025 – Present",
    title: "AIML Engineer",
    company: "AI Tech Startup",
    description:
      "Building production AI systems — from model fine-tuning to the servers they run on.",
    highlights: [
      "Fine-tuned TTS, LLMs & SLMs using LoRA / QLoRA on A100 GPUs",
      "Built RAG pipelines with Qdrant, Neo4j, and LangChain",
      "Managed AWS services: Lambda, ECR, API Gateway, DynamoDB, S3, IAM",
      "Set up GPU servers with fail2ban, CrowdSec, 2FA, and ntfy alerts",
      "Automated team workflows with n8n, shell aliases, and nginx subdomains",
    ],
  },
  {
    id: "internship",
    period: "3 months",
    title: "AI Intern",
    company: "Industry Internship",
    description:
      "Hands-on production ML and automation exposure across real-world AI tooling.",
    highlights: [
      "Worked with Lindy AI, n8n, Azure Automation, and Automation Anywhere",
      "Deployed models on Render, Heroku, Firebase, and Docker",
      "Explored fine-tuning approaches including QLoRA and LoRA",
    ],
  },
];
