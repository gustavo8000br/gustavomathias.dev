import type { Project } from "@/content/projects";

export function getProjectLabel(project: Project): string {
  return `${project.status} - ${project.visibility}`;
}
