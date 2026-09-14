import { describe, expect, it } from "vitest";

import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { createResumeDocument } from "@/lib/resume";

describe("resume document", () => {
  it("is generated from the current portfolio content", () => {
    const document = createResumeDocument(new Date("2026-09-14T12:00:00Z"));

    expect(document).toContain(profile.name);
    expect(document).toContain(education[0].institution);
    expect(document).toContain(education[0].course);
    expect(document).toContain("Currículo gerado automaticamente");
  });
});
