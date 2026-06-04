"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export type TypewriterLine = {
  text: string;
  /** className for the text itself (size / color / gradient) */
  className?: string;
  /** className for the line wrapper (margins / max-width) */
  wrapperClassName?: string;
};

export function Typewriter({
  lines,
  speed = 60,
  startDelay = 350,
  lineDelay = 450,
}: {
  lines: TypewriterLine[];
  speed?: number;
  startDelay?: number;
  lineDelay?: number;
}) {
  const reduce = useReducedMotion();
  const [counts, setCounts] = useState<number[]>(() => lines.map(() => 0));
  const [activeLine, setActiveLine] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Respect reduced-motion: reveal everything at once.
    if (reduce) {
      const id = setTimeout(() => {
        setCounts(lines.map((l) => l.text.length));
        setActiveLine(lines.length);
        setFinished(true);
      }, 0);
      return () => clearTimeout(id);
    }

    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (line >= lines.length) {
        setFinished(true);
        return;
      }
      const text = lines[line].text;
      if (char < text.length) {
        char += 1;
        const at = char;
        const idx = line;
        setCounts((prev) => {
          const next = [...prev];
          next[idx] = at;
          return next;
        });
        timer = setTimeout(tick, speed);
      } else {
        line += 1;
        char = 0;
        setActiveLine(line);
        timer = setTimeout(tick, lineDelay);
      }
    };

    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [reduce, lines, speed, startDelay, lineDelay]);

  return (
    <div>
      {lines.map((line, i) => (
        <div key={i} className={line.wrapperClassName}>
          <span className="sr-only">{line.text}</span>
          <span aria-hidden className={line.className}>
            {line.text.slice(0, counts[i])}
          </span>
          {i === activeLine && !finished && (
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] animate-pulse bg-primary align-middle"
            />
          )}
        </div>
      ))}
    </div>
  );
}
