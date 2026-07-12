import { parseEnv, webEnvSchema } from "@issuefit/config";
import type { GithubContributor } from "@issuefit/github";
import type { Metadata } from "next";
import Image from "next/image";
import { LuCircleDot, LuGitPullRequest, LuHeart, LuStar, LuUsers } from "react-icons/lu";
import { SiGithub } from "react-icons/si";

import { PublicShell } from "../../components/public-shell";
import { gitHubClient } from "../../lib/github-client";

export const metadata: Metadata = {
  title: "Supporters",
};

// Rendered per request, but the GitHub calls are cached in-process for an hour
// (below) so public views never hammer the API or the rate limit.
export const dynamic = "force-dynamic";

const SPONSOR_EMAIL = "issuefit@dee-empire.com";
const TTL_MS = 60 * 60 * 1000;

interface SupportData {
  contributors: GithubContributor[];
  stars: number | null;
  openIssues: number | null;
  description: string | null;
}

const EMPTY: SupportData = { contributors: [], stars: null, openIssues: null, description: null };

let cache: { fetchedAt: number; data: SupportData } | null = null;

async function loadSupportData(owner: string, name: string, token: string): Promise<SupportData> {
  if (cache !== null && Date.now() - cache.fetchedAt < TTL_MS) {
    return cache.data;
  }
  try {
    const [contributors, repo] = await Promise.all([
      gitHubClient.listRepositoryContributors(token, owner, name),
      gitHubClient.getRepository(token, owner, name),
    ]);
    const data: SupportData = {
      contributors,
      stars: repo.stargazersCount,
      openIssues: repo.openIssuesCount,
      description: repo.description,
    };
    cache = { fetchedAt: Date.now(), data };
    return data;
  } catch {
    // Never fail the public page on a transient GitHub error; keep the last good data.
    return cache?.data ?? EMPTY;
  }
}

function formatCount(value: number | null): string {
  if (value === null) {
    return "—";
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }
  return String(value);
}

export default async function SupportersPage() {
  const { GITHUB_SERVICE_TOKEN, PROJECT_GITHUB_REPO } = parseEnv(webEnvSchema, process.env);
  const [owner = "", name = ""] = PROJECT_GITHUB_REPO.split("/");
  const repoUrl = `https://github.com/${PROJECT_GITHUB_REPO}`;
  const data =
    owner !== "" && name !== "" ? await loadSupportData(owner, name, GITHUB_SERVICE_TOKEN) : EMPTY;

  const stats = [
    { icon: LuStar, label: "Stars", value: formatCount(data.stars) },
    {
      icon: LuUsers,
      label: "Contributors",
      value: formatCount(data.contributors.length === 0 ? null : data.contributors.length),
    },
    { icon: LuCircleDot, label: "Open issues", value: formatCount(data.openIssues) },
  ];

  const waysToSupport = [
    {
      icon: SiGithub,
      title: "Star it on GitHub",
      body: "The quickest way to help — a star makes the project easier for other developers to find.",
      href: repoUrl,
      cta: "Star on GitHub",
      external: true,
    },
    {
      icon: LuGitPullRequest,
      title: "Contribute",
      body: "IssueFit is built the way it recommends contributing. Pick an open issue and send a pull request.",
      href: `${repoUrl}/issues`,
      cta: "Find an issue",
      external: true,
    },
    {
      icon: LuHeart,
      title: "Sponsor",
      body: "Help keep IssueFit free for developers. Sponsors are credited here and on the repository.",
      href: `mailto:${SPONSOR_EMAIL}`,
      cta: "Get in touch",
      external: false,
    },
  ];

  return (
    <PublicShell>
      <div className="flex flex-col items-start gap-4">
        <span className="rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-700 dark:text-teal-300">
          Open source · Apache-2.0
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Built in the open</h1>
        <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
          {data.description ??
            "IssueFit is free software, built by its community and kept running by its sponsors."}
        </p>
      </div>

      <dl className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-950/40"
          >
            <stat.icon aria-hidden className="h-5 w-5 text-teal-500" />
            <dd className="text-2xl font-bold tracking-tight sm:text-3xl">{stat.value}</dd>
            <dt className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <section className="mt-14">
        <h2 className="text-xl font-semibold">Contributors</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          The people who build IssueFit on GitHub.
        </p>
        {data.contributors.length > 0 ? (
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {data.contributors.map((contributor) => (
              <li key={contributor.login}>
                <a
                  href={contributor.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-zinc-200 p-3 transition-colors hover:border-teal-500/50 hover:bg-teal-500/5 dark:border-zinc-800"
                >
                  {contributor.avatarUrl !== "" ? (
                    <Image
                      src={contributor.avatarUrl}
                      alt=""
                      width={44}
                      height={44}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="h-11 w-11 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{contributor.login}</span>
                    <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                      {contributor.contributions}{" "}
                      {contributor.contributions === 1 ? "commit" : "commits"}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            See all contributors on{" "}
            <a
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-teal-600 hover:underline dark:text-teal-400"
            >
              GitHub
            </a>
            .
          </p>
        )}
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold">Support IssueFit</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          IssueFit is free for developers. Here&apos;s how you can help keep it that way.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {waysToSupport.map((way) => (
            <div
              key={way.title}
              className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white/60 p-5 dark:border-zinc-800 dark:bg-zinc-950/40"
            >
              <way.icon aria-hidden className="h-6 w-6 text-teal-500" />
              <h3 className="font-semibold">{way.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {way.body}
              </p>
              <a
                href={way.href}
                target={way.external ? "_blank" : undefined}
                rel={way.external ? "noreferrer" : undefined}
                className="inline-flex items-center text-sm font-medium text-teal-600 hover:underline dark:text-teal-400"
              >
                {way.cta} →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-teal-500/30 bg-teal-500/5 p-6 sm:p-8">
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-lg font-semibold">Become the first sponsor</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            IssueFit doesn&apos;t have sponsors yet. If your company hires developers or cares about
            healthy open source, sponsoring IssueFit puts your name in front of contributors and
            keeps the platform free. Get in touch and we&apos;ll set it up.
          </p>
          <a
            href={`mailto:${SPONSOR_EMAIL}`}
            className="mt-1 inline-flex items-center gap-2 rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            <LuHeart aria-hidden className="h-4 w-4" />
            {SPONSOR_EMAIL}
          </a>
        </div>
      </section>
    </PublicShell>
  );
}
