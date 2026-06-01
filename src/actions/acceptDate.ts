"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  const letter = await prisma.letter.update({
    where: { id: input.letterId },
    data: {
      accepted: true,
      selectedDate: input.selectedDate,
      selectedTime: input.selectedTime,
      meetLocation: input.meetLocation,
    },
    include: { sender: true },
  });

  await resend.emails.send({
    from: "Amore <onboarding@resend.dev>",
    to: letter.sender.email,
    subject: `${letter.crushName} таны урилгыг хүлээн зөвшөөрлөө! 💌`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #e91e63;">Баяр хүргэе! 🎉</h2>
        <p><strong>${letter.crushName}</strong> таны урилгыг хүлээн зөвшөөрч, уулзах цаг товлолоо:</p>
        <ul style="line-height: 2;">
          <li><strong>Өдөр:</strong> ${input.selectedDate}</li>
          <li><strong>Цаг:</strong> ${input.selectedTime}</li>
          <li><strong>Газар:</strong> ${input.meetLocation}</li>
        </ul>
        <p style="color: #888; font-size: 13px;">Amore-оор дамжуулан илгээсэн.</p>
      </div>
    `,
  });

  return {
    accepted: true,
    selectedDate: input.selectedDate,
    selectedTime: input.selectedTime,
    meetLocation: input.meetLocation,
  };
}
