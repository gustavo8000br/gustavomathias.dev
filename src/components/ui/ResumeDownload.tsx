"use client";

import { Download } from "lucide-react";

import { createResumeDocument } from "@/lib/resume";

export function ResumeDownload() {
  function downloadResume() {
    const resumeDocument = createResumeDocument(new Date());
    const blob = new Blob([resumeDocument], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");

    link.href = url;
    link.download = "curriculo-gustavo-mathias-rocha.html";
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
      Baixar currículo <Download size={18} aria-hidden="true" />
    </button>
  );
}
