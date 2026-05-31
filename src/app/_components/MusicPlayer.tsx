"use client";

import { useEffect, useRef } from "react";

interface Props {
  videoId: string;
  autoplay?: boolean;
}

export default function MusicPlayer({ videoId, autoplay = true }: Props) {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Re-load when videoId changes
  }, [videoId]);

  if (!videoId) return null;

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&mute=0&enablejsapi=1`;

  return (
    <iframe
      ref={ref}
      src={src}
      allow="autoplay; encrypted-media"
      className="absolute w-0 h-0 opacity-0 pointer-events-none"
      title="background music"
    />
  );
}
