import type { Metadata } from "next";

import { PublicShell } from "../../components/public-shell";

export const metadata: Metadata = {
  title: "Imprint",
};

export default function ImprintPage() {
  return (
    <PublicShell>
      <article className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Imprint (Impressum)
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Information in accordance with § 5 DDG (German Digital Services Act).
        </p>

        <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Service provider
        </h2>
        <p>
          Dee Empire
          <br />
          Owner: Mohamed Sesay
          <br />
          Forststraße 6<br />
          96264 Altenkunstadt
          <br />
          Germany
        </p>

        <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Contact</h2>
        <p>
          E-mail:{" "}
          <a
            href="mailto:support@dee-empire.com"
            className="text-teal-600 underline-offset-2 hover:underline dark:text-teal-400"
          >
            support@dee-empire.com
          </a>
          <br />
          Phone: +49 9572 8744123
        </p>

        <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Business identification number
        </h2>
        <p>W-IdNr.: DE455289768</p>

        <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Responsible for content
        </h2>
        <p>
          Responsible for content in accordance with § 18 Abs. 2 MStV:
          <br />
          Mohamed Sesay, Forststraße 6, 96264 Altenkunstadt, Germany
        </p>

        <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Consumer dispute resolution
        </h2>
        <p>
          We are neither willing nor obliged to participate in dispute resolution proceedings before
          a consumer arbitration board (§ 36 VSBG).
        </p>

        <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Liability for content and links
        </h2>
        <p>
          As a service provider we are responsible for our own content on these pages in accordance
          with general law (§ 7 Abs. 1 DDG). We are not obliged to monitor transmitted or stored
          third-party information or to investigate circumstances that indicate illegal activity (§§
          8–10 DDG). Obligations to remove or block the use of information under general law remain
          unaffected; liability in this respect is only possible from the moment we become aware of
          a specific infringement, and we will remove such content immediately upon becoming aware
          of it.
        </p>
        <p>
          Our service links to external websites (in particular GitHub repositories and profiles)
          over whose content we have no control. The respective provider or operator is always
          responsible for the content of linked pages. Linked pages were checked for possible legal
          violations at the time of linking; permanent monitoring of linked pages is not reasonable
          without concrete indications of an infringement. Upon notification of violations, we will
          remove such links immediately.
        </p>

        <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Open-source software
        </h2>
        <p>
          The IssueFit software is free software published under the Apache License 2.0. This
          imprint applies to the hosted service operated by Dee Empire; self-hosted instances are
          the responsibility of their respective operators.
        </p>
      </article>
    </PublicShell>
  );
}
