import { describe, expect, it } from "vitest";

import { projects } from "@/content/projects";
import { getProjectLabel } from "@/lib/content";

describe("projects content", () => {
  it("contains complete, publishable and uniquely identified projects", () => {
    expect(projects).toHaveLength(3);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(
      projects.length,
    );

    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(project.title.trim()).not.toHaveLength(0);
      expect(project.summary.trim()).not.toHaveLength(0);
      expect(project.role.trim()).not.toHaveLength(0);
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(new URL(project.link).protocol).toMatch(/^https:$/);
    }
  });

  it("separates status and visibility with a readable dash", () => {
    expect(getProjectLabel(projects[0])).toBe(
      "Em desenvolvimento — Projeto pessoal",
    );
  });
});
