import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/config/site";

type ProjectListProps = {
  title: string;
  projects: Project[];
};

export function ProjectList({ title, projects }: ProjectListProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-2xl border border-border p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              {project.href ? (
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg font-medium hover:underline"
                >
                  {project.name}
                </Link>
              ) : (
                <h3 className="text-lg font-medium">{project.name}</h3>
              )}
              <span className="text-sm text-muted-foreground">
                {project.role}
              </span>
            </div>
            <p className="mt-2 text-muted-foreground">{project.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
