"use client";

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { BEST_OF, useBoundStore } from "@/engine";
import { useId } from "react";

function GameHistoryPip({
  winner,
  gameIdx,
}: {
  winner: "P1" | "P2" | "not-played";
  gameIdx: number;
}) {
  if (winner === "not-played")
    return (
      <div
        className="w-10 h-10 border border-solid border-gray-500 bg-white"
      ></div>
    );

  return (
    <div
      className="w-10 h-10 bg-gray-500 flex justify-center items-center text-center"
    >
      <span className="text-white">{winner}</span>
    </div>
  );
}

export default function MatchVictoriesCard() {
  const gamesPlayed = useBoundStore((state) => state.matchGamesPlayed);

  const gameHistory = Array.from({ length: BEST_OF }, (_, idx) => {
    const game = gamesPlayed[idx];
    if (!game) {
      return (
        <GameHistoryPip key={`game_${idx}`} winner="not-played" gameIdx={idx} />
      );
    }

    return (
      <GameHistoryPip
        key={`game_${idx}`}
        winner={game.winner === 1 ? "P1" : "P2"}
        gameIdx={idx}
      />
    );
  });

  return (
    <Card className="row-span-1">
      <CardHeader>
        <CardTitle>Games History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-center space-x-2">
          {gameHistory}
        </div>
      </CardContent>
    </Card>
  );
}
