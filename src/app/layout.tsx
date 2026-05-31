import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "amare — ask someone out beautifully",
  description:
    "Create a digital love letter with music, animation, and a surprise invitation.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "amare",
    description: "The most unforgettable way to ask someone out.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
