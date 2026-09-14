import { describe, expect, it } from "vitest";

import { projects } from "@/content/projects";

describe("projects content", () => {
  it("contains only publishable editorial fields", () => {
    expect(projects).toHaveLength(3);
    expect(JSON.stringify(projects)).not.toContain("TODO");
    expect(projects.every((project) => project.technologies.length > 0)).toBe(
      true,
    );
  });
});
