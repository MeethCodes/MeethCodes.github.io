import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork, Loader2 } from "lucide-react";
import { links } from "@/data/links";
import { useGitHubRepos } from "@/hooks/useGitHub";
import { useApp } from "@/context/AppContext";

export default function GitHubSection() {
  const { data: repos, isLoading, isError } = useGitHubRepos();
  const { reducedMotion } = useApp();
  const username = links.githubUsername;

  return (
    <section id="github" className="relative bg-white/[0.02]">
      <div className="section-container">
        <motion.div
          {...(reducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
              })}
        >
          <h2 className="section-heading">Live GitHub</h2>
          <p className="text-garage-muted mb-8 max-w-xl">
            Auto-updated from my GitHub profile — repos, stats, and activity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=tokyonight&hide_border=true&include_all_commits=true&count_private=true`}
            alt="GitHub stats"
            className="w-full rounded-xl"
            loading="lazy"
          />
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight&hide_border=true`}
            alt="GitHub streak"
            className="w-full rounded-xl"
            loading="lazy"
          />
        </div>

        <img
          src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=tokyo-night&hide_border=true&area=true&custom_title=Contributions`}
          alt="Contribution graph"
          className="w-full rounded-xl mb-10"
          loading="lazy"
        />

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Repositories</h3>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-garage-teal hover:underline flex items-center gap-1"
          >
            View all <ExternalLink size={14} />
          </a>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12 text-garage-muted">
            <Loader2 className="animate-spin" size={24} />
          </div>
        )}

        {isError && (
          <p className="text-garage-muted text-sm text-center py-8">
            Could not load repos —{" "}
            <a href={links.github} className="text-garage-teal underline">
              visit GitHub
            </a>
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos?.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card hud-border p-5 block hover:border-garage-teal/30 transition-colors group"
              initial={reducedMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-medium text-white group-hover:text-garage-teal transition-colors truncate">
                  {repo.name}
                </h4>
                <ExternalLink
                  size={14}
                  className="text-garage-muted shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-xs text-garage-muted mt-2 line-clamp-2 min-h-[2.5rem]">
                {repo.description || "No description"}
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-garage-muted">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-garage-teal" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star size={12} /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> fork
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
