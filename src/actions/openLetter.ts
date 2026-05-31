"use server";

import { prisma } from "@/lib/prisma";
import type { Theme } from "@/lib/utils";

export interface OpenedLetter {
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

export async function openLetter(code: string): Promise<OpenedLetter | null> {
  const letter = await prisma.letter.findUnique({
    where: { code },
    select: {
      id: true,
      senderId: true,
      crushName: true,
      message: true,
      youtubeId: true,
      theme: true,
      location: true,
      accepted: true,
      selectedDate: true,
      selectedTime: true,
      meetLocation: true,
      sender: {
        select: {
          email: true,
        },
      },
    },
  });
  if (!letter) return null;

  const senderEmail =
    letter.sender?.email ??
    (
      await prisma.user.findUnique({
        where: { clerkId: letter.senderId },
        select: { email: true },
      })
    )?.email ??
    "anonymous@amore.app";

  return {
    id: letter.id,
    crushName: letter.crushName,
    message: letter.message,
    youtubeId: letter.youtubeId,
    theme: letter.theme,
    location: letter.location || null,
    accepted: letter.accepted,
    selectedDate: letter.selectedDate,
    selectedTime: letter.selectedTime,
    meetLocation: letter.meetLocation,
    senderEmail,
  };
}
