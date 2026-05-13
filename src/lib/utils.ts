import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sectionPaddingX = "px-4 sm:px-6" as const;

export const sectionShell =
  `mx-auto w-full max-w-5xl ${sectionPaddingX}` as const;
