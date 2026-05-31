import type { Theme } from "@/lib/utils";

export interface StoredLetter {
  id: string;
  code: string;
  crushName: string;
  message: string;
  youtubeUrl: string;
  theme: Theme;
  location: string;
  createdAt: string;
  accepted: boolean;
}

const lettersById = new Map<string, StoredLetter>();
const lettersByCode = new Map<string, StoredLetter>();

export function storeLetter(letter: StoredLetter) {
  lettersById.set(letter.id, letter);
  lettersByCode.set(letter.code, letter);
}

export function markLetterAccepted(id: string) {
  const letter = lettersById.get(id);
  if (letter) {
    letter.accepted = true;
  }
}

export function findLetterByCode(code: string) {
  return lettersByCode.get(code);
}
