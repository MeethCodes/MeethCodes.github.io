import { useQuery } from "@tanstack/react-query";
import { links } from "@/data/links";

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
};

async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${links.githubUsername}/repos?sort=updated&per_page=12`,
  );
  if (!res.ok) throw new Error("Failed to fetch repos");
  const data: GitHubRepo[] = await res.json();
  return data.filter((r) => !r.fork).slice(0, 6);
}

export function useGitHubRepos() {
  return useQuery({
    queryKey: ["github-repos", links.githubUsername],
    queryFn: fetchRepos,
    staleTime: 15 * 60 * 1000,
    retry: 2,
  });
}
