"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const starField = Array.from({ length: 80 }).map((_, i) => ({
  left: `${(i * 13 + 7) % 100}%`,
  top: `${(i * 29 + 19) % 100}%`,
  size: i % 4 === 0 ? "3px" : "2px",
  duration: 2 + (i % 5) * 0.45,
  delay: (i % 8) * 0.2,
}));

export default function OpenPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleOpen(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.toUpperCase().trim();
    if (trimmed.length !== 6) {
      setError(true);
      setTimeout(() => setError(false), 1200);
      return;
    }
    router.push(`/letter/${trimmed}`);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0D0A14] via-[#1A0F1E] to-[#0E1528] flex flex-col items-center justify-center">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
        <Link
          href="/"
          className="font-cormorant text-[22px] italic text-starlight/80"
        >
          amare ♡
        </Link>
      </nav>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {starField.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-12 md:p-16 max-w-md w-full mx-5 text-center shadow-[0_32px_80px_rgba(0,0,0,0.5)]"
      >
        <p className="text-[11px] tracking-[0.15em] uppercase text-starlight/50 mb-4">
          ✦ someone is waiting
        </p>
        <h1 className="font-cormorant font-light italic text-[clamp(38px,6vw,52px)] text-starlight leading-[1.2] mb-10">
          Open your
          <br />
          invitation
        </h1>

        <form onSubmit={handleOpen} className="space-y-4">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={6}
            placeholder="ENTER CODE"
            className={`w-full px-6 py-5 bg-white/8 border-[1.5px] rounded-2xl text-center text-[28px] tracking-[0.3em] text-white placeholder-white/25 font-cormorant font-light focus:outline-none transition-all duration-300 ${
              error
                ? "border-rose/70 bg-rose/10"
                : "border-white/15 focus:border-starlight/50"
            }`}
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
          <motion.button
            type="submit"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 bg-gradient-to-r from-rose to-[#A0365F] text-white rounded-2xl text-[16px] shadow-[0_8px_32px_rgba(201,80,90,0.4)] hover:shadow-[0_14px_40px_rgba(201,80,90,0.5)] transition-all"
          >
            Open letter ↗
          </motion.button>
        </form>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-rose/80 text-[13px] mt-3"
          >
            Please enter a valid 6-character code
          </motion.p>
        )}

        <p className="text-[12px] text-white/25 mt-5 font-light">
          Enter the 6-character code you received
        </p>
      </motion.div>
    </main>
  );
}
