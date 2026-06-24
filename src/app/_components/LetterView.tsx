"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { acceptDate } from "@/actions/acceptDate";
import EnvelopeAnimation from "@/app/_components/EnvelopeAnimation";
import MusicPlayer from "@/app/_components/MusicPlayer";
import RejectButton from "@/app/_components/RejectButton";
import ScheduleModal from "@/app/_components/ScheduleModal";
import type { Theme } from "@/lib/utils";

interface LetterData {
  id: string;
  crushName: string;
  message: string;
  youtubeId: string | null;
  theme: Theme;
  location: string | null;
  accepted: boolean;
  selectedDate: string | null;
  selectedTime: string | null;
  meetLocation: string | null;
  senderEmail: string;
}

const themeConfig = {
  pink: {
    bg: "from-[#FDE8EE] via-[#F5C4CF] to-[#EDA0B5]",
    card: "bg-white",
    crush: "text-[#7C6670]",
    name: "text-[#1A1218]",
    body: "text-[#7C6670]",
    divider: "border-[#F0E8EC]",
    accent: "#C9505A",
  },
  night: {
    bg: "from-[#0D0A14] via-[#1A1235] to-[#0E1528]",
    card: "bg-[#1A1235]/80 backdrop-blur-xl border border-white/10",
    crush: "text-[#A090B0]",
    name: "text-[#E8D9F0]",
    body: "text-[#A090B0]",
    divider: "border-white/10",
    accent: "#9B7CC8",
  },
  minimal: {
    bg: "from-[#FAFAFA] via-[#F5F0F2] to-[#EDE8EC]",
    card: "bg-white border border-gray-200",
    crush: "text-[#7C6670]",
    name: "text-[#1A1218]",
    body: "text-[#7C6670]",
    divider: "border-[#E0D4D8]",
    accent: "#C9505A",
  },
};

export default function LetterView({ letter }: { letter: LetterData }) {
  const [opened, setOpened] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [accepted, setAccepted] = useState(letter.accepted);
  const [confirmedSchedule, setConfirmedSchedule] = useState({
    date: letter.selectedDate,
    time: letter.selectedTime,
    location: letter.meetLocation,
  });
  const t = themeConfig[letter.theme];

  async function handleAcceptDate(data: {
    date: string;
    time: string;
    location: string;
  }) {
    const result = await acceptDate({
      letterId: letter.id,
      selectedDate: data.date,
      selectedTime: data.time,
      meetLocation: data.location,
    });
    setConfirmedSchedule({
      date: result.selectedDate,
      time: result.selectedTime,
      location: result.meetLocation || null,
    });
    setScheduleOpen(false);
    setAccepted(true);
    launchConfetti();
  }

  function launchConfetti() {
    import("canvas-confetti").then((mod) => {
      const confetti = mod.default;
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#C9505A", "#F5C4CF", "#9B7CC8", "#F9D4A0", "#5DA0C9"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 120,
          origin: { x: 0.2, y: 0.5 },
        });
        confetti({
          particleCount: 80,
          spread: 120,
          origin: { x: 0.8, y: 0.5 },
        });
      }, 600);
    });
  }

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${t.bg} flex flex-col items-center justify-center`}
    >
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
        <Link
          href="/"
          className={`font-cormorant text-[22px] italic opacity-60 hover:opacity-100 transition-opacity ${
            letter.theme === "night" ? "text-starlight" : "text-rose"
          }`}
        >
          amare ♡
        </Link>
      </nav>

      {/* Bg decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-white/15 blur-[80px] -top-40 -right-40" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-white/10 blur-[60px] -bottom-10 -left-10" />
        {/* Floating hearts */}
        {opened &&
          Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-xl"
              style={{
                left: `${((i * 19 + 11) % 100).toFixed(0)}%`,
                color: "rgba(201,80,90,0.35)",
              }}
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: "-80px", opacity: [0, 0.5, 0] }}
              transition={{
                duration: 6 + (i % 4) * 0.75,
                repeat: Infinity,
                delay: (i % 5) * 1.1,
                ease: "easeIn",
              }}
            >
              ♡
            </motion.span>
          ))}
      </div>

      {/* Hidden music player */}
      {opened && letter.youtubeId && (
        <MusicPlayer videoId={letter.youtubeId} autoplay={true} />
      )}

      {/* Envelope → Letter transition */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-5 py-20">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <EnvelopeAnimation onOpen={() => setOpened(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.1, 0.64, 1],
              }}
              className="w-full max-w-lg"
            >
              {/* Accepted banner */}
              <AnimatePresence>
                {accepted && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 space-y-2"
                  >
                    <span className="inline-flex items-center gap-2 bg-rose text-white text-[13px] px-5 py-2 rounded-full shadow-[0_4px_16px_rgba(201,80,90,0.4)]">
                      ❤ Date confirmed — check your email!
                    </span>
                    {confirmedSchedule.date && confirmedSchedule.time && (
                      <p className={`text-[13px] ${t.body}`}>
                        {confirmedSchedule.date} at {confirmedSchedule.time}
                        {confirmedSchedule.location
                          ? ` · ${confirmedSchedule.location}`
                          : ""}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={`${t.card} rounded-3xl p-10 md:p-12 shadow-[0_32px_80px_rgba(0,0,0,0.15)] relative overflow-hidden`}
              >
                {/* Decorative circle */}
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-10"
                  style={{ background: t.accent }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p
                    className={`text-[12px] tracking-[0.1em] uppercase mb-2 ${t.crush}`}
                  >
                    a letter just for you
                  </p>
                  <h2
                    className={`font-cormorant font-light italic text-[clamp(40px,7vw,56px)] leading-[1.1] mb-8 ${t.name}`}
                  >
                    {letter.crushName}
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p
                    className={`font-cormorant text-[18px] leading-[1.9] font-light border-t pt-7 mb-9 whitespace-pre-wrap ${t.body} ${t.divider} border-t`}
                  >
                    {letter.message}
                  </p>
                </motion.div>

                {!accepted && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-wrap items-center justify-center gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setScheduleOpen(true)}
                      className="flex items-center gap-2 bg-rose text-white px-8 py-4 rounded-full text-[16px] shadow-[0_8px_24px_rgba(201,80,90,0.35)] animate-pulse-glow hover:bg-rose-dark transition-all"
                    >
                      Accept ❤
                    </motion.button>
                    <RejectButton />
                  </motion.div>
                )}

                {accepted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <p
                      className={`font-cormorant italic text-[20px] ${t.body}`}
                    >
                      See you soon… ✦
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ScheduleModal open={scheduleOpen} onConfirm={handleAcceptDate} />
    </main>
  );
}
