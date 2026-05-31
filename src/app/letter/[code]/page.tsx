import { notFound } from "next/navigation";
import { openLetter } from "@/actions/openLetter";
import LetterView from "@/app/_components/LetterView";

interface Props {
  params: Promise<{ code: string }>;
}

export default async function LetterPage({ params }: Props) {
  const { code } = await params;
  const letter = await openLetter(code);

  if (!letter) notFound();

  return <LetterView letter={letter} />;
}
