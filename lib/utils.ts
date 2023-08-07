import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts seconds to a stopwatch format.
 * @param timeInSeconds The time in seconds.
 * @returns The time in the format HH:MM:SS.
 * @example
 * calulateGameTime(0) // "00:00:00"
 * calulateGameTime(60) // "00:01:00"
 * calulateGameTime(3600) // "01:00:00"
 * calulateGameTime(3661) // "01:01:01"
 * calulateGameTime(36610) // "10:10:10"
 * calulateGameTime(366100) // "101:41:40"
 * */
export function calulateGameTime(timeInSeconds = 0) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
