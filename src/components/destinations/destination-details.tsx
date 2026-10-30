"use client";

import Image from "next/image";
import { useState } from "react";


/** Used when the API's imageUrl is missing or not a loadable image. */
const FALLBACK_IMAGE = "/images/Banner.png";

export function DestinationHero({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl bg-muted">
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 1100px, 100vw"
        className="object-cover"
        onError={() => setImageSrc(FALLBACK_IMAGE)}
        priority
      />
    </div>
  );
}




