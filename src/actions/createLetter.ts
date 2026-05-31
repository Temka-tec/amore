"use server";

import { randomInt, randomUUID } from "node:crypto";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { extractYouTubeId } from "@/lib/youtube";
import type { Theme } from "@/lib/utils";

export interface CreateLetterInput {
  crushName: string;
  message: string;
  youtubeUrl: string;
  theme: Theme;
  location: string;
}

function generateCode() {
  return randomInt(100000, 1000000).toString();
}

export async function createLetter(input: CreateLetterInput): Promise<{
  code: string;
}> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await currentUser();
  const primaryEmailId = user?.primaryEmailAddressId;
  const email =
    user?.emailAddresses.find(
      (emailAddress) => emailAddress.id === primaryEmailId,
    )?.emailAddress ?? user?.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("Could not determine sender email");
  }

  await prisma.user.upsert({
    where: { clerkId: userId },
    update: { email },
    create: { clerkId: userId, email },
  });

  const id = randomUUID();
  const code = generateCode();

  await prisma.letter.create({
    data: {
      id,
      code,
      senderId: userId,
      crushName: input.crushName,
      message: input.message,
      youtubeId: extractYouTubeId(input.youtubeUrl),
      theme: input.theme,
      location: input.location,
    },
  });

  return { code };
}
