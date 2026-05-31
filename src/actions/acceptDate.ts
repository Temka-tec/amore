"use server";

import { prisma } from "@/lib/prisma";

export interface AcceptDateInput {
  letterId: string;
  selectedDate: string;
  selectedTime: string;
  meetLocation: string;
}

export async function acceptDate(input: AcceptDateInput): Promise<{
  accepted: boolean;
  selectedDate: string;
  selectedTime: string;
  meetLocation: string;
}> {
  await prisma.letter.update({
    where: { id: input.letterId },
    data: {
      accepted: true,
      selectedDate: input.selectedDate,
      selectedTime: input.selectedTime,
      meetLocation: input.meetLocation,
    },
  });

  return {
    accepted: true,
    selectedDate: input.selectedDate,
    selectedTime: input.selectedTime,
    meetLocation: input.meetLocation,
  };
}
