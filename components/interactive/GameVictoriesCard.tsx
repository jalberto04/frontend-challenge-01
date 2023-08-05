'use client';

import { useId } from "react";

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { useMatchHistory } from "@/hooks/useGameHistory";

type GameHistory = {
  winner: "P1" | "P2" | "not-played";
};

const gameHistory: GameHistory[] = [
  { winner: "P1" },
  { winner: "P2" },
  { winner: "P1" },
  { winner: "P2" },
  { winner: "P2" },
  { winner: "not-played" },
  { winner: "not-played" },
  { winner: "not-played" },
  { winner: "not-played" },
];

function GameHistoryPip({
  winner,
  gameIdx,
}: {
  winner: "P1" | "P2" | "not-played";
  gameIdx: number;
}) {
  const id = useId();

  if (winner === "not-played")
    return (
      <div
        id={`game-history-pip__${gameIdx}_${id}`}
        className="w-10 h-10 border border-solid border-gray-500 bg-white"
      ></div>
    );

  return (
    <div
      id={`game-history-pip__${gameIdx}_${id}`}
      className="w-10 h-10 bg-gray-500 flex justify-center items-center text-center"
    >
      <span className="text-white">{winner}</span>
    </div>
  );
}

export default function GameBoard() {
  return (
    <Card className="row-span-1">
      <CardHeader>
        <CardTitle>Victories %</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-8 justify-center space-x-2">
          <div className="flex flex-col gap-4">
            <span className="text-lg">PLAYER 1</span>
            <div className="flex flex-row gap-4">
              <div>
                <div className="w-10 h-10 bg-gray-500 flex justify-center items-center text-center rounded-full">
                  <span className="text-white">40%</span>
                </div>
                <span>V</span>
              </div>
              <div>
                <div className="w-10 h-10 bg-gray-500 flex justify-center items-center text-center rounded-full">
                  <span className="text-white">60%</span>
                </div>
                <span>L</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-lg">PLAYER 2</span>
            <div className="flex flex-row gap-4">
              <div>
                <div className="w-10 h-10 bg-gray-500 flex justify-center items-center text-center rounded-full">
                  <span className="text-white">60%</span>
                </div>
                <span>V</span>
              </div>
              <div>
                <div className="w-10 h-10 bg-gray-500 flex justify-center items-center text-center rounded-full">
                  <span className="text-white">40%</span>
                </div>
                <span>L</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
