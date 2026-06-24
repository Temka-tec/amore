"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onConfirm: (data: {
    date: string;
    time: string;
    location: string;
  }) => Promise<void>;
}

export default function ScheduleModal({ open, onConfirm }: Props) {
  const [today] = useState(() => new Date().toISOString().split("T")[0]);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("19:00");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (!date || !time) return;
    setLoading(true);
    await onConfirm({ date, time, location });
    setLoading(false);
  }

  const inputCls =
    "w-full min-w-0 px-4 py-3.5 rounded-xl border-[1.5px] border-[#E8DDE0] bg-[#FDFAFA] text-ink text-[15px] focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/10 transition";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-night/80 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-6 sm:p-10 max-w-md w-full shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
          >
            <h2 className="font-cormorant font-light italic text-[36px] text-ink mb-2">
              Plan the date ✦
            </h2>
            <p className="text-[13px] text-muted mb-8">
              Choose a time that works for both of you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[11px] tracking-[0.08em] uppercase text-muted mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  className={`${inputCls} pr-10`}
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.08em] uppercase text-muted mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={`${inputCls} pr-10`}
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[11px] tracking-[0.08em] uppercase text-muted mb-2">
                Location{" "}
                <span className="normal-case tracking-normal text-[#C4B0B5]">
                  (optional)
                </span>
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Coffee shop, rooftop, park…"
                className={inputCls}
              />
            </div>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full py-4 bg-rose text-white rounded-2xl text-[16px] shadow-[0_8px_24px_rgba(201,80,90,0.3)] hover:bg-rose-dark transition-all disabled:opacity-60"
            >
              {loading ? "Confirming…" : "Confirm date ❤"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
