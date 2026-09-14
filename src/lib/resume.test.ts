import { describe, expect, it } from "vitest";

import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { createResumePdf } from "@/lib/resume";

const latin1Decoder = new TextDecoder("iso-8859-1");

describe("resume PDF", () => {
  it("is generated from the current portfolio content", () => {
    const pdf = createResumePdf(new Date("2026-09-14T12:00:00Z"));
    const document = latin1Decoder.decode(pdf);

    expect(document).toStartWith("%PDF-1.4");
    expect(document).toContain(profile.name);
    expect(document).toContain(education[0].institution);
    expect(document).toContain(education[0].course);
    expect(document).toContain("Gerado automaticamente");
  });
});
