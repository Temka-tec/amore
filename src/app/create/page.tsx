import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateLetterClient from "@/app/_components/CreateLetterClient";

export default async function CreatePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return <CreateLetterClient />;
}
