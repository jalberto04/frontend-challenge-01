"use client";

import { useBoundStore } from "@/engine";

export default function GamePlayerVictoryCount({ player }: { player: number }) {
    const matchGamesPlayed = useBoundStore((state) => state.matchGamesPlayed);

    const playerVictories = matchGamesPlayed.filter((game) => game.winner === player).length;

  return (
    <div className="flex flex-col justify-center text-center">
      <span className="font-bold text-2xl">PLAYER {player}</span>
      <span className="font-semibold text-5xl">{playerVictories}</span>
    </div>
  );
}
