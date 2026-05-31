"use client";

import { motion } from "framer-motion";
import type { Theme } from "@/lib/utils";

const themes: { id: Theme; label: string; colors: string[]; dark: boolean }[] =
  [
    {
      id: "pink",
      label: "Romantic Pink",
      colors: ["#FDE8EE", "#F5C4CF", "#C9505A"],
      dark: false,
    },
    {
      id: "night",
      label: "Night Sky",
      colors: ["#0D0A14", "#1A1235", "#9B7CC8"],
      dark: true,
    },
    {
      id: "minimal",
      label: "Minimal Cute",
      colors: ["#FAFAFA", "#F0E8EC", "#B0A0A5"],
      dark: false,
    },
  ];

interface Props {
  value: Theme;
  onChange: (t: Theme) => void;
}

export default function ThemeSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {themes.map((theme) => (
        <motion.button
          key={theme.id}
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onChange(theme.id)}
          className={`relative rounded-2xl overflow-hidden aspect-[4/3] border-2 transition-all duration-200 ${
            value === theme.id
              ? "border-rose shadow-[0_0_0_2px_rgba(201,80,90,0.3)]"
              : "border-transparent"
          }`}
        >
          {/* Gradient swatch */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${theme.colors[0]}, ${theme.colors[1]})`,
            }}
          />
          {/* Dot + label */}
          <div className="relative flex flex-col items-center justify-center h-full gap-1.5">
            <div
              className="w-5 h-5 rounded-full shadow-sm"
              style={{ background: theme.colors[2] }}
            />
            <span
              className={`text-[10px] font-medium tracking-wide ${
                theme.dark ? "text-white/90" : "text-[#1A1218]/70"
              }`}
            >
              {theme.label}
            </span>
          </div>
          {/* Selected checkmark */}
          {value === theme.id && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-rose rounded-full flex items-center justify-center">
              <span className="text-white text-[10px]">✓</span>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
}
