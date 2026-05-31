"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function RejectButton() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  function flee(e: React.MouseEvent | React.TouchEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const dist = Math.hypot(clientX - cx, clientY - cy);
    if (dist < 90) {
      const angle = Math.atan2(cy - clientY, cx - clientX);
      const flee = 130;
      setPos((prev) => {
        const nx = prev.x + Math.cos(angle) * flee;
        const ny = prev.y + Math.sin(angle) * flee;
        const maxX = window.innerWidth / 2 - 100;
        const maxY = window.innerHeight / 2 - 50;
        return {
          x: Math.max(-maxX, Math.min(maxX, nx)),
          y: Math.max(-maxY, Math.min(maxY, ny)),
        };
      });
    }
  }

  return (
    <motion.button
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={flee}
      onTouchStart={flee}
      className="flex items-center gap-2 bg-transparent text-muted border-[1.5px] border-[#E0D0D4] px-7 py-4 rounded-full text-[15px] hover:text-[#B0A0A5] transition-colors cursor-pointer select-none"
    >
      Reject 💔
    </motion.button>
  );
}
