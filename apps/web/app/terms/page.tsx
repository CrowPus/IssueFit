import type { Metadata } from "next";
import Link from "next/link";

import { PublicShell } from "../../components/public-shell";

export const metadata: Metadata = {
  title: "Terms of service",
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{children}</h2>
  );
}

export default function TermsPage() {
  return (
    <PublicShell>
      <article className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Terms of service
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          These terms govern the use of the hosted IssueFit service operated by Dee Empire, Owner:
          Mohamed Sesay, Forststraße 6, 96264 Altenkunstadt, Germany (see the{" "}
          <Link
            href="/imprint"
            className="text-teal-600 underline-offset-2 hover:underline dark:text-teal-400"
          >
            imprint
          </Link>
          ). The IssueFit software itself is free software under the Apache License 2.0; a
          self-hosted instance is governed by its own operator, not by these terms.
        </p>

        <H2>1. The service</H2>
        <p>
          IssueFit matches developers with open-source issues that fit their skills and career
          goals, provides deterministic issue briefings, tracks contributions, and generates
          portfolio entries. The service is currently provided free of charge and may include beta
          features. Recommendations and scores are informational only — always verify an issue is
          still available and read the target project&apos;s contribution guidelines before starting
          work.
        </p>

        <H2>2. Account and eligibility</H2>
        <p>
          You sign in with your GitHub account and must comply with GitHub&apos;s own terms. You are
          responsible for activity under your session. We may require that you are at least 16 years
          old to use the service.
        </p>

        <H2>3. Acceptable use</H2>
        <p>
          Use IssueFit to find and track genuine open-source contributions. You must not use the
          service to harass maintainers, spam repositories, misrepresent your work, scrape the
          service, disrupt its operation, or violate applicable law. We may suspend or terminate
          accounts that violate these rules.
        </p>

        <H2>4. Your content</H2>
        <p>
          You retain all rights to content you create (portfolio summaries, skill edits, feedback).
          By making a portfolio entry public you grant us the non-exclusive right to display it on
          your public profile page for as long as you keep it public; you can withdraw this at any
          time by making the entry or your profile private again.
        </p>

        <H2>5. Third-party content</H2>
        <p>
          Repositories, issues, and related metadata shown in the service belong to their respective
          projects and authors and are subject to their own licenses. IssueFit displays this public
          information without adopting it as its own.
        </p>

        <H2>6. Availability</H2>
        <p>
          We aim for good availability but do not guarantee uninterrupted operation. We may change,
          limit, or discontinue features of the free service; where reasonable we will announce
          significant changes in advance.
        </p>

        <H2>7. Liability</H2>
        <p>
          We are liable without limitation for intent and gross negligence, for injury to life,
          body, or health, and under the German Product Liability Act. In cases of slight negligence
          we are liable only for breaches of essential contractual obligations (obligations whose
          fulfilment makes the proper performance of the contract possible in the first place and on
          whose fulfilment you may regularly rely), limited to the damage foreseeable and typical at
          the time of conclusion. Any further liability is excluded. As the service is provided free
          of charge, statutory rules for services provided without remuneration remain unaffected.
        </p>

        <H2>8. Termination</H2>
        <p>
          You may stop using the service and request deletion of your account at any time. We may
          terminate or suspend access for cause, in particular for violations of section 3.
        </p>

        <H2>9. Changes to these terms</H2>
        <p>
          We may amend these terms with effect for the future, for example when the service or the
          legal situation changes. The current version is always published on this page; material
          changes will be indicated within the service where reasonable.
        </p>

        <H2>10. Governing law</H2>
        <p>
          The law of the Federal Republic of Germany applies, excluding the UN Convention on
          Contracts for the International Sale of Goods. If you use the service as a consumer,
          mandatory consumer-protection provisions of the country of your habitual residence remain
          unaffected.
        </p>

        <H2>11. Severability</H2>
        <p>
          Should individual provisions of these terms be or become invalid, the validity of the
          remaining provisions remains unaffected.
        </p>
      </article>
    </PublicShell>
  );
}
