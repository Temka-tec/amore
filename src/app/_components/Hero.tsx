"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const floatingHearts = ["♡", "♥", "✦", "✿"];

export default function Hero() {
  const { isSignedIn } = useUser();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FBF5F0] via-[#F5E8E8] to-[#EFE0EC] flex flex-col">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-[#FBF5F0]/80 backdrop-blur-md border-b border-rose-100/60">
        <span className="font-cormorant text-[22px] italic text-rose">
          amare ♡
        </span>
        <div className="flex items-center gap-3">
          {!isSignedIn ? (
            <>
              <SignInButton>
                <button className="text-[13px] text-muted border border-muted/30 hover:border-rose hover:text-rose rounded-full px-4 py-2 transition-all duration-200">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="text-[13px] bg-rose text-white rounded-full px-4 py-2 hover:bg-rose-dark transition-all duration-200 shadow-[0_4px_12px_rgba(201,80,90,0.25)]">
                  Sign up
                </button>
              </SignUpButton>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <UserButton />
            </div>
          )}
        </div>
      </nav>

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-[#F2C4C8] blur-[80px] opacity-40 -top-48 -left-24"
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-[#D4A8DE] blur-[80px] opacity-40 -bottom-24 -right-12"
          animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 0.96, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full bg-[#F9D4A0] blur-[80px] opacity-30 top-1/2 left-1/2"
          animate={{ x: [0, 15, -15, 0], y: [0, -20, 10, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-lg"
            style={{
              left: `${((i * 17 + 9) % 100).toFixed(0)}%`,
              color: ["#C9505A", "#E8A0B0", "#D4A8DE", "#F9D4A0"][i % 4],
            }}
            initial={{ y: "100vh", opacity: 0, scale: 0.5 }}
            animate={{ y: "-100px", opacity: [0, 0.6, 0.2, 0], scale: 1.2 }}
            transition={{
              duration: 5 + (i % 4) * 0.85,
              repeat: Infinity,
              delay: (i % 6) * 0.7,
              ease: "easeIn",
            }}
          >
            {floatingHearts[i % floatingHearts.length]}
          </motion.span>
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 bg-rose/10 text-rose border border-rose/25 text-[11px] tracking-[0.08em] uppercase px-4 py-1.5 rounded-full mb-8"
        >
          ✦ the most unforgettable way to ask
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cormorant font-light text-[clamp(44px,7vw,80px)] leading-[1.1] text-ink mb-5"
        >
          Say it with a<br />
          <em className="italic text-rose">love letter</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted text-[16px] font-light leading-relaxed max-w-md mb-11"
        >
          Create a digital love letter with music, animation, and a surprise
          invitation — they&apos;ll never forget.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/create"
            className="inline-flex items-center gap-2 bg-rose text-white px-9 py-4 rounded-full text-[15px] shadow-[0_8px_32px_rgba(201,80,90,0.35)] hover:bg-rose-dark hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(201,80,90,0.45)] transition-all duration-300"
          >
            ✦ Create a letter
          </Link>
          <Link
            href="/open"
            className="inline-flex items-center gap-2 bg-transparent text-ink border border-ink/20 px-9 py-4 rounded-full text-[15px] hover:border-rose hover:text-rose hover:-translate-y-0.5 transition-all duration-300"
          >
            ↗ Open a letter
          </Link>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mt-20"
        >
          {[
            { icon: "✉️", label: "Letters sent", val: "12,847" },
            { icon: "💌", label: "Dates accepted", val: "9,203" },
            { icon: "🎵", label: "Songs played", val: "48,129" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/70 backdrop-blur-xl border border-rose/10 rounded-[20px] px-6 py-5 min-w-[160px] text-left shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="text-[26px] mb-2">{stat.icon}</div>
              <div className="text-[12px] text-muted font-light mb-1">
                {stat.label}
              </div>
              <div className="font-cormorant text-[22px] text-ink">
                {stat.val}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
