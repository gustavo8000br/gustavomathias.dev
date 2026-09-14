"use client";

import { Download } from "lucide-react";

import { createResumePdf } from "@/lib/resume";

export function ResumeDownload() {
  function downloadResume() {
    const resume = createResumePdf(new Date());
    const pdfBytes = new Uint8Array(resume);
    const blob = new Blob([pdfBytes.buffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");

    link.href = url;
    link.download = "curriculo-gustavo-mathias-rocha.pdf";
    window.document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return (
    <button
      className="button button-secondary"
      type="button"
      onClick={downloadResume}
    >
      Baixar currículo em PDF <Download size={18} aria-hidden="true" />
    </button>
  );
}
