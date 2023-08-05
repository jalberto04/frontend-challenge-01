"use client";

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { useBoundStore } from "@/engine";

export default function MatchVictoriesCard() {
  const player1VictoryPercentage = useBoundStore(
    (state) =>
      (state.matchGamesPlayed.filter((game) => game.winner === 1).length /
        state.matchGamesPlayed.length) *
      100
  );
  const player2VictoryPercentage = useBoundStore(
    (state) =>
      (state.matchGamesPlayed.filter((game) => game.winner === 1).length /
        state.matchGamesPlayed.length) *
      100
  );

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
                  <span className="text-white">{`${player1VictoryPercentage}%`}</span>
                </div>
                <span>V</span>
              </div>
              <div>
                <div className="w-10 h-10 bg-gray-500 flex justify-center items-center text-center rounded-full">
                  <span className="text-white">{`${
                    100 - player1VictoryPercentage
                  }%`}</span>
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
                  <span className="text-white">{`${player2VictoryPercentage}%`}</span>
                </div>
                <span>V</span>
              </div>
              <div>
                <div className="w-10 h-10 bg-gray-500 flex justify-center items-center text-center rounded-full">
                  <span className="text-white">{`${
                    100 - player2VictoryPercentage
                  }%`}</span>
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
