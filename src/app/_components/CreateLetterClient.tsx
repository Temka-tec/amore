"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createLetter } from "@/actions/createLetter";
import { extractYouTubeId } from "@/lib/youtube";
import LetterCard from "@/app/_components/LetterCard";
import ThemeSelector from "@/app/_components/ThemeSelector";
import type { Theme } from "@/lib/utils";

export default function CreateLetterClient() {
  const [crushName, setCrushName] = useState("");
  const [message, setMessage] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [theme, setTheme] = useState<Theme>("pink");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const ytId = extractYouTubeId(youtubeUrl) ?? undefined;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!crushName.trim() || !message.trim()) return;
    setLoading(true);
    try {
      const result = await createLetter({
        crushName,
        message,
        youtubeUrl,
        theme,
        location,
      });
      setGeneratedCode(result.code);
    } finally {
      setLoading(false);
    }
  }

  function copyCode() {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F7F0EC] to-[#FBF5F0]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-[#FBF5F0]/80 backdrop-blur-md border-b border-rose-100/60">
        <Link href="/" className="font-cormorant text-[22px] italic text-rose">
          amare ♡
        </Link>
        <Link
          href="/open"
          className="text-[13px] text-muted border border-muted/30 hover:border-rose hover:text-rose rounded-full px-5 py-2 transition-all duration-200"
        >
          Open letter
        </Link>
      </nav>

      <div className="pt-28 pb-20 px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] tracking-[0.12em] uppercase text-rose mb-3">
            ✦ write your heart
          </p>
          <h1 className="font-cormorant font-light text-[clamp(36px,5vw,58px)] text-ink leading-tight">
            Craft your <em className="italic text-rose">letter</em>
          </h1>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:sticky lg:top-28 h-fit"
          >
            <LetterCard
              crushName={crushName}
              message={message}
              theme={theme}
              youtubeId={ytId}
            />
            <p className="text-center text-[12px] text-muted mt-3">
              Live preview — updates as you type
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-rose/10 space-y-6"
            >
              {/* Crush name */}
              <div>
                <label className="block text-[11px] tracking-[0.08em] uppercase text-muted mb-2">
                  Their name
                </label>
                <input
                  value={crushName}
                  onChange={(e) => setCrushName(e.target.value)}
                  placeholder="Her / his name…"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border-[1.5px] border-[#E8DDE0] bg-[#FDFAFA] text-ink placeholder-[#C4B0B5] text-[15px] focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/10 transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] tracking-[0.08em] uppercase text-muted mb-2">
                  Your message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write from the heart…"
                  required
                  rows={5}
                  className="w-full px-4 py-3.5 rounded-xl border-[1.5px] border-[#E8DDE0] bg-[#FDFAFA] text-ink placeholder-[#C4B0B5] text-[15px] focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/10 transition resize-y"
                />
              </div>

              {/* YouTube */}
              <div>
                <label className="block text-[11px] tracking-[0.08em] uppercase text-muted mb-2">
                  YouTube music link
                </label>
                <input
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=…"
                  className="w-full px-4 py-3.5 rounded-xl border-[1.5px] border-[#E8DDE0] bg-[#FDFAFA] text-ink placeholder-[#C4B0B5] text-[15px] focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/10 transition"
                />
                {ytId && (
                  <p className="text-[12px] text-rose mt-1.5">
                    ✓ Song detected: {ytId}
                  </p>
                )}
              </div>

              {/* Theme */}
              <div>
                <label className="block text-[11px] tracking-[0.08em] uppercase text-muted mb-2">
                  Theme
                </label>
                <ThemeSelector value={theme} onChange={setTheme} />
              </div>

              {/* Location */}
              <div>
                <label className="block text-[11px] tracking-[0.08em] uppercase text-muted mb-2">
                  Date location{" "}
                  <span className="normal-case tracking-normal text-[#C4B0B5]">
                    (optional)
                  </span>
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Rooftop at The Grand Hotel…"
                  className="w-full px-4 py-3.5 rounded-xl border-[1.5px] border-[#E8DDE0] bg-[#FDFAFA] text-ink placeholder-[#C4B0B5] text-[15px] focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/10 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-rose text-white rounded-2xl text-[16px] shadow-[0_8px_24px_rgba(201,80,90,0.3)] hover:bg-rose-dark hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(201,80,90,0.4)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating…" : "Create letter ✦"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {generatedCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-night/75 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-[0_40px_100px_rgba(0,0,0,0.25)]"
            >
              <div className="text-5xl mb-5">💌</div>
              <h2 className="font-cormorant font-light italic text-[38px] text-ink mb-3">
                Letter created!
              </h2>
              <p className="text-muted text-[14px] leading-relaxed mb-8">
                Share this secret code with the person you&apos;re inviting.
                They&apos;ll use it to open your letter.
              </p>

              {/* Code display */}
              <div className="bg-[#FDF0F2] border-2 border-dashed border-[#F0C4C8] rounded-2xl p-6 mb-6">
                <p className="text-[11px] tracking-[0.1em] uppercase text-muted mb-2">
                  Your code
                </p>
                <p className="font-cormorant font-light text-[52px] tracking-[0.2em] text-rose leading-none">
                  {generatedCode}
                </p>
              </div>

              <button
                onClick={copyCode}
                className="w-full py-4 bg-rose text-white rounded-xl text-[15px] shadow-[0_6px_20px_rgba(201,80,90,0.3)] hover:bg-rose-dark transition-all mb-3"
              >
                {copied ? "Copied ✓" : "Copy code ✦"}
              </button>
              <button
                onClick={() => setGeneratedCode(null)}
                className="text-[13px] text-muted underline hover:text-ink transition-colors"
              >
                dismiss
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
