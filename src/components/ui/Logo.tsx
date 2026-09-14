"use client";

import Image from "next/image";
import { useState } from "react";

export function LogoPhoto() {
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <div className="logo-photo">
      {hasPhoto ? (
        <Image
          src="/logo.png"
          alt=""
          fill
          sizes="56px"
          priority
          onError={() => setHasPhoto(false)}
        />
      ) : null}
      {/* Opcional: Só exibe as iniciais se a foto falhar */}
      {!hasPhoto && (
        <span className="brand-mark" aria-hidden="true">
          GMR
        </span>
      )}
    </div>
  );
}
