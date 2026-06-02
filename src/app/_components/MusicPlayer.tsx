"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  videoId: string;
  autoplay?: boolean;
}

export default function MusicPlayer({ videoId, autoplay = true }: Props) {
  const [playing, setPlaying] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // On non-iOS browsers, start automatically on mount
  useEffect(() => {
    if (!autoplay) return;
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    if (!isIOS) {
      setPlaying(true);
    }
  }, [autoplay]);

  const handlePlay = () => {
    setUserStarted(true);
    setPlaying(true);
  };

  if (!videoId) return null;

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&mute=0&enablejsapi=1`;

  return (
    <>
      {playing && (
        <iframe
          ref={iframeRef}
          src={src}
          allow="autoplay; encrypted-media"
          className="absolute w-0 h-0 opacity-0 pointer-events-none"
          title="background music"
        />
      )}
      {!playing && autoplay && !userStarted && (
        <button
          onClick={handlePlay}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-sm text-pink-500 rounded-full px-4 py-2 shadow-lg text-sm font-medium border border-pink-200 active:scale-95 transition-transform"
          aria-label="Дуу тоглуулах"
        >
          <span>♪</span>
          <span>Дуу тоглуулах</span>
        </button>
      )}
    </>
  );
}
