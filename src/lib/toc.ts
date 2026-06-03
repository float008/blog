import GithubSlugger from "github-slugger";

export type TocItem = { depth: number; text: string; id: string };

/**
 * Extract an h2/h3 table of contents from raw markdown. Uses github-slugger so
 * the generated ids match those produced by `rehype-slug` at render time.
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trimEnd();
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!match) continue;

    const text = match[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*?([^*]+)\*\*?/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim();

    items.push({ depth: match[1].length, text, id: slugger.slug(text) });
  }

  return items;
}
