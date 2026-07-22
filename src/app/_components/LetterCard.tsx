"use client";

import { motion } from "framer-motion";
import { HeartIcon, MusicNoteIcon, SparklesIcon } from "@/app/_components/Icons";
import type { Theme } from "@/lib/utils";

interface Props {
  crushName: string;
  message: string;
  theme: Theme;
  youtubeId?: string;
}

const themeStyles = {
  pink: {
    bg: "from-[#FDE8EE] via-[#F5C4CF] to-[#EDA0B5]",
    text: "text-white",
    subtext: "text-white/75",
    border: "border-white/20",
    acceptBg: "bg-white/20 text-white",
    heart: "text-white/40",
  },
  night: {
    bg: "from-[#0D0A14] via-[#1A1235] to-[#0E1528]",
    text: "text-[#E8D9F0]",
    subtext: "text-[#A090B0]",
    border: "border-white/10",
    acceptBg: "bg-[#9B7CC8]/30 text-[#E8D9F0]",
    heart: "text-[#9B7CC8]/40",
  },
  minimal: {
    bg: "from-[#FAFAFA] via-[#F5F0F2] to-[#EDE8EC]",
    text: "text-[#1A1218]",
    subtext: "text-[#7C6670]",
    border: "border-[#E0D0D4]",
    acceptBg: "bg-[#C9505A] text-white",
    heart: "text-rose/30",
  },
};

export default function LetterCard({
  crushName,
  message,
  theme,
  youtubeId,
}: Props) {
  const s = themeStyles[theme];

  return (
    <div
      className={`rounded-3xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.14)] bg-gradient-to-br ${s.bg}`}
    >
      <div className="relative p-8 min-h-[360px]">
        {/* Floating hearts bg */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[HeartIcon, SparklesIcon, HeartIcon].map((Icon, i) => (
            <motion.span
              key={i}
              className={`absolute text-2xl ${s.heart}`}
              style={{
                left: `${[15, 75, 85][i]}%`,
                top: `${[20, 35, 70][i]}%`,
              }}
              animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut",
              }}
            >
              <Icon className="h-6 w-6" />
            </motion.span>
          ))}
        </div>

        {/* Content */}
        <p
          className={`text-[13px] font-light tracking-[0.05em] mb-2 ${s.subtext}`}
        >
          to my dearest,
        </p>
        <h2
          className={`font-cormorant font-light text-[clamp(32px,5vw,42px)] leading-[1.15] mb-6 ${s.text}`}
        >
          {crushName || "Someone Special"}
        </h2>
        <p
          className={`text-[14px] font-light leading-[1.8] line-clamp-4 ${s.subtext}`}
        >
          {message || "Your love letter will appear here as you type…"}
        </p>

        {/* Footer */}
        <div
          className={`flex items-center justify-between mt-7 pt-5 border-t ${s.border}`}
        >
          <span
            className={`text-[12px] flex items-center gap-1.5 ${s.subtext}`}
          >
            <MusicNoteIcon className="h-3.5 w-3.5 shrink-0" />
            {youtubeId ? (
              <span className="truncate max-w-[120px]">{youtubeId}</span>
            ) : (
              "Your song"
            )}
          </span>
          <span
            className={`text-[12px] px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 ${s.acceptBg}`}
          >
            Accept <HeartIcon className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
