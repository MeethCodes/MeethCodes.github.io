import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { AppProvider } from "@/context/AppContext";
import { useLenis } from "@/hooks/useLenis";
import Seo from "@/components/layout/Seo";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import SkillsSection from "@/components/skills/SkillsSection";
import GitHubSection from "@/components/github/GitHubSection";
import ProjectsTeaser from "@/components/projects/ProjectsTeaser";
import ContactSection from "@/components/contact/ContactSection";
import ChatWidget from "@/components/chat/ChatWidget";

const queryClient = new QueryClient();

function PortfolioPage() {
  useLenis();

  return (
    <div className="min-h-screen bg-garage-bg">
      <Seo />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <GitHubSection />
        <ProjectsTeaser />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AppProvider>
          <PortfolioPage />
        </AppProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
