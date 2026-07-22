"use client";

import { useState } from "react";
import { MusicNoteIcon } from "@/app/_components/Icons";

interface Props {
  videoId: string;
  autoplay?: boolean;
}

export default function MusicPlayer({ videoId, autoplay = true }: Props) {
  const [isIOS] = useState(() => {
    if (typeof navigator === "undefined") return false;
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream
    );
  });
  const [userStarted, setUserStarted] = useState(false);

  const handlePlay = () => {
    setUserStarted(true);
  };

  if (!videoId) return null;

  const shouldAutoPlay = autoplay && (!isIOS || userStarted);
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=${
    shouldAutoPlay ? 1 : 0
  }&loop=1&playlist=${videoId}&controls=0&mute=0&playsinline=1&rel=0&modestbranding=1`;

  return (
    <>
      {autoplay && (
        <iframe
          src={src}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          className="absolute -left-[9999px] top-0 w-[1px] h-[1px] opacity-0 pointer-events-none"
          title="background music"
          referrerPolicy="origin"
        />
      )}
      {autoplay && isIOS && !userStarted && (
        <button
          onClick={handlePlay}
          className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-pink-200 bg-white/90 px-4 py-3 text-sm font-medium text-pink-500 shadow-lg backdrop-blur-sm active:scale-95 transition-transform"
          aria-label="Дуу тоглуулах"
        >
          <MusicNoteIcon className="h-4 w-4" />
          <span>Дуу тоглуулах</span>
        </button>
      )}
    </>
  );
}
