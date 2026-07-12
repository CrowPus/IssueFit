import type { Metadata } from "next";
import Link from "next/link";

import { PublicShell } from "../../components/public-shell";

export const metadata: Metadata = {
  title: "Privacy policy",
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{children}</h2>
  );
}

export default function PrivacyPage() {
  return (
    <PublicShell>
      <article className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Privacy policy
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          This policy explains how the hosted IssueFit service processes personal data under the EU
          General Data Protection Regulation (GDPR). IssueFit is open-source software; if you use a
          self-hosted instance, its operator is responsible for data processing there.
        </p>

        <H2>1. Controller</H2>
        <p>
          Dee Empire, Owner: Mohamed Sesay
          <br />
          Forststraße 6, 96264 Altenkunstadt, Germany
          <br />
          E-mail:{" "}
          <a
            href="mailto:support@dee-empire.com"
            className="text-teal-600 underline-offset-2 hover:underline dark:text-teal-400"
          >
            support@dee-empire.com
          </a>{" "}
          — see the{" "}
          <Link
            href="/imprint"
            className="text-teal-600 underline-offset-2 hover:underline dark:text-teal-400"
          >
            imprint
          </Link>
          .
        </p>

        <H2>2. What data we process</H2>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>Account data from GitHub sign-in:</strong> your GitHub user ID, username,
            display name, e-mail address, and avatar image URL. Sign-in uses OAuth; we never see
            your GitHub password.
          </li>
          <li>
            <strong>Public GitHub activity:</strong> the names, languages, and metadata of your
            public repositories, used to propose an editable skill profile. We do not access private
            repositories.
          </li>
          <li>
            <strong>Data you create in IssueFit:</strong> your skill profile, career goal,
            recommendation feedback, tracked contributions, and portfolio entries.
          </li>
          <li>
            <strong>Technical data:</strong> a session cookie required for sign-in, and server logs
            (IP address, time, requested URL) kept briefly for security and troubleshooting.
          </li>
        </ul>

        <H2>3. Purposes and legal bases (Art. 6 GDPR)</H2>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>Providing the service</strong> (account, skill profile, recommendations,
            contribution tracking): Art. 6 (1) (b) GDPR — performance of the usage agreement.
          </li>
          <li>
            <strong>Security and abuse prevention</strong> (server logs): Art. 6 (1) (f) GDPR —
            legitimate interest in operating a secure service.
          </li>
          <li>
            <strong>Public profile and portfolio display:</strong> Art. 6 (1) (a) GDPR — your
            consent. Public display is off by default, opt-in per entry and per profile, and can be
            withdrawn at any time by switching it off, which immediately hides the page.
          </li>
          <li>
            <strong>Weekly recommendation e-mails</strong> (if offered): Art. 6 (1) (a) GDPR —
            opt-in consent, revocable at any time in your profile settings.
          </li>
        </ul>

        <H2>4. Cookies</H2>
        <p>
          We use only a strictly necessary session cookie to keep you signed in (§ 25 (2) TDDDG). We
          use no advertising, tracking, or third-party analytics cookies, which is why the service
          shows no cookie consent banner.
        </p>

        <H2>5. Recipients and third countries</H2>
        <p>
          Our hosting provider processes data on our behalf under a data processing agreement (Art.
          28 GDPR). When you sign in or synchronise your data, requests are made to GitHub (GitHub,
          Inc., USA) with your authorisation; GitHub&apos;s own{" "}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 underline-offset-2 hover:underline dark:text-teal-400"
          >
            privacy statement
          </a>{" "}
          applies to GitHub&apos;s processing. Where data is transferred to the USA, the transfer is
          safeguarded by the EU–US Data Privacy Framework and/or EU standard contractual clauses. We
          do not sell personal data, show no third-party advertising, and send no data to any AI
          provider — the service uses none.
        </p>

        <H2>6. Retention</H2>
        <p>
          Account and profile data are stored for as long as your account exists. Server logs are
          deleted on a short rolling basis. If you request deletion of your account, we delete your
          personal data without undue delay unless statutory retention duties require otherwise.
        </p>

        <H2>7. Your rights</H2>
        <p>You have the right to:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>access your personal data (Art. 15 GDPR),</li>
          <li>rectification of inaccurate data (Art. 16 GDPR),</li>
          <li>erasure (Art. 17 GDPR) and restriction of processing (Art. 18 GDPR),</li>
          <li>data portability (Art. 20 GDPR),</li>
          <li>
            object to processing based on legitimate interests (Art. 21 GDPR), and withdraw any
            consent at any time with effect for the future (Art. 7 (3) GDPR).
          </li>
        </ul>
        <p>
          To exercise these rights, e-mail{" "}
          <a
            href="mailto:support@dee-empire.com"
            className="text-teal-600 underline-offset-2 hover:underline dark:text-teal-400"
          >
            support@dee-empire.com
          </a>
          . You also have the right to lodge a complaint with a supervisory authority (Art. 77
          GDPR); the authority responsible for us is the Bayerisches Landesamt für
          Datenschutzaufsicht (BayLDA), Ansbach, Germany.
        </p>

        <H2>8. Automated decision-making</H2>
        <p>
          Recommendations are computed by a deterministic, explainable scoring engine and are
          informational only. The service makes no automated decisions that produce legal effects
          concerning you or similarly significantly affect you (Art. 22 GDPR).
        </p>

        <H2>9. Changes</H2>
        <p>
          We will update this policy when the service changes. The current version always applies
          and is published on this page.
        </p>
      </article>
    </PublicShell>
  );
}
