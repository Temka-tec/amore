"use client";

import { motion } from "framer-motion";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeAnimation({ onOpen }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center"
    >
      {/* Envelope */}
      <motion.div
        className="relative w-[280px] h-[180px] cursor-pointer group"
        onClick={onOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Body */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF0F2] to-[#F5DCE0] rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-white/80" />

        {/* Letter paper peeking */}
        <motion.div
          className="absolute w-[90%] h-[85%] bg-white left-[5%] bottom-[5%] rounded-sm z-[1] shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden"
          whileHover={{ y: "-30%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="p-3 font-cormorant text-[11px] text-[#888] leading-relaxed italic">
            <em>Dear, my love…</em>
            <br />I have written you
            <br />
            these words from
            <br />
            the deepest corner…
          </div>
        </motion.div>

        {/* Flap */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 z-[3] rounded-t-lg overflow-hidden"
          style={{ transformOrigin: "top" }}
          whileHover={{ rotateX: -160 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-full h-full bg-gradient-to-b from-[#F5DCE0] to-[#EEC8CE]"
            style={{ clipPath: "polygon(0 0, 50% 60%, 100% 0)" }}
          />
        </motion.div>

        {/* Seal */}
        <motion.div
          className="absolute w-10 h-10 bg-rose rounded-full z-[4] top-[20%] left-1/2 -translate-x-1/2 flex items-center justify-center text-lg border-2 border-white/50 shadow-[0_4px_12px_rgba(201,80,90,0.4)]"
          whileHover={{ y: -10, scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          💌
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-[14px] text-white/40 mt-5 font-light"
      >
        tap to open
      </motion.p>
    </motion.div>
  );
}
