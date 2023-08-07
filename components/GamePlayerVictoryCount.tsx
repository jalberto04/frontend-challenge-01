"use client";

import { useBoundStore } from "@/engine";
import { cn } from "@/lib/utils";

export default function GamePlayerVictoryCount({
  className,
  player,
}: {
  className?: string;
  player: number;
}) {
  const matchGamesPlayed = useBoundStore((state) => state.matchGamesPlayed);

  const playerVictories = matchGamesPlayed.filter(
    (game) => game.winner === player
  ).length;

  return (
    <div className={cn("flex flex-col justify-center text-center", className)}>
      <span className="font-bold text-2xl">PLAYER {player}</span>
      <span className="font-semibold text-5xl">{playerVictories}</span>
    </div>
  );
}
