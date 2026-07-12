import Link from "next/link";

/**
 * Global legal bar rendered on every page (root layout). German law requires
 * the imprint to be easily and directly reachable from anywhere in the
 * service (§ 5 DDG), including signed-in pages that have no page footer.
 */
export function LegalFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-zinc-500 dark:text-zinc-400 sm:px-6">
        <p>© {new Date().getFullYear()} Dee Empire</p>
        <nav aria-label="Legal" className="flex gap-4">
          <Link href="/imprint" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            Imprint
          </Link>
          <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
