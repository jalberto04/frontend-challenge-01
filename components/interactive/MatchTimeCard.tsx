'use client';

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { useBoundStore } from "@/engine";
import { calulateGameTime } from "@/lib/utils";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";

export default function MatchTimeCard() {
  const gameStartDateTime = useBoundStore((state) => state.gameStartDateTime);
  const gameStopDateTime = useBoundStore((state) => state.gameStopDateTime);
  const matchGamesPlayed = useBoundStore((state) => state.matchGamesPlayed);

  const [currentGameTime, setCurrentGameTime] = useState(0);

  const timeElapsedInPreviousGames = useMemo(
    () =>
      matchGamesPlayed.reduce((acc, game) => {
        return acc + game.timeTaken;
      }, 0),
    [matchGamesPlayed]
  );

  useEffect(() => {
    if (gameStartDateTime != null && gameStopDateTime == null) {
      const timer = setInterval(() => {
        setCurrentGameTime(
          Math.floor(DateTime.now().diff(gameStartDateTime, "seconds").seconds)
        );
      }, 100);
      return () => clearTimeout(timer);
    }

    setCurrentGameTime(0);

    return () => {};
  }, [gameStartDateTime, gameStopDateTime]);

  const totalPlayTime = calulateGameTime(timeElapsedInPreviousGames + currentGameTime);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Total play time</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl">{totalPlayTime}</p>
      </CardContent>
    </Card>
  );
}
