-- Rebuild the schema so Prisma Studio matches the current app model.
-- This migration resets the old demo tables because the previous history
-- only contained a partial User table and the app now relies on full Letter storage.

DROP TABLE IF EXISTS "Letter" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE TABLE "Letter" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "crushName" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "youtubeId" TEXT,
    "theme" TEXT NOT NULL DEFAULT 'pink',
    "location" TEXT,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "selectedDate" TEXT,
    "selectedTime" TEXT,
    "meetLocation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Letter_code_key" UNIQUE ("code"),
    CONSTRAINT "Letter_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX "Letter_senderId_idx" ON "Letter"("senderId");
