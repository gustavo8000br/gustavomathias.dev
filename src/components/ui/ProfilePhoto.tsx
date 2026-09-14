"use client";

import Image from "next/image";
import { useState } from "react";

type ProfilePhotoProps = {
  className?: string;
  decorative?: boolean;
};

export function ProfilePhoto({
  className = "",
  decorative = false,
}: ProfilePhotoProps) {
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    <div className={`profile-photo ${className}`.trim()}>
      {hasPhoto ? (
        <Image
          src="/profile.png"
          alt={decorative ? "" : "Gustavo Mathias Rocha"}
          fill
          sizes="(max-width: 520px) 104px, (max-width: 800px) 128px, 192px"
          priority
          onError={() => setHasPhoto(false)}
        />
      ) : decorative ? (
        <span aria-hidden="true">GMR</span>
      ) : (
        <span role="img" aria-label="Gustavo Mathias Rocha, GMR">
          GMR
        </span>
      )}
    </div>
  );
}
