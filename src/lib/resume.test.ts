import { describe, expect, it } from "vitest";

import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { createResumePdf } from "@/lib/resume";

const latin1Decoder = new TextDecoder("iso-8859-1");

describe("resume PDF", () => {
  it("is generated from the current portfolio content", () => {
    const pdf = createResumePdf(new Date("2026-09-14T12:00:00Z"));
    const document = latin1Decoder.decode(pdf);

    expect(document.startsWith("%PDF-1.4")).toBe(true);
    expect(document).toContain("/Encoding /WinAnsiEncoding");
    expect(document).toContain(profile.name);
    expect(document).toContain("São Paulo");
    expect(document).toContain("aplicações");
    expect(document).toContain(
      education[0].institution.replace(/[()]/g, "\\$&"),
    );
    expect(document).toContain(education[0].course);
    expect(document).toContain("Gerado automaticamente");
  });
});
