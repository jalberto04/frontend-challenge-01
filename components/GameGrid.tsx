"use client";
import { Fragment, useEffect, useState } from "react";
import { DateTime } from "luxon";

import { useBoundStore } from "@/engine";
import XSvg from "@/components/svg-icons/XSvgIcon";
import OSvg from "@/components/svg-icons/OSvgIcon";
import { Button } from "@/components/ui/button";
import { calulateGameTime, cn } from "@/lib/utils";

export default function GameGrid({ className }: { className?: string }) {
  const board = useBoundStore((state) => state.gameBoard);
  const currentPlayer = useBoundStore((state) => state.gameCurrentPlayer);
  const progress = useBoundStore((state) => state.gameProgress);
  const play = useBoundStore((state) => state.gamePlay);
  const gameReset = useBoundStore((state) => state.gameReset);
  const matchReset = useBoundStore((state) => state.matchReset);
  const matchWinner = useBoundStore((state) => state.matchWinner);
  const startDateTime = useBoundStore((state) => state.gameStartDateTime);
  const stopDateTime = useBoundStore((state) => state.gameStopDateTime);
  const startTimer = useBoundStore((state) => state.gameStartTimer);

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (stopDateTime != null && startDateTime != null) {
      setElapsed(
        Math.floor(stopDateTime.diff(startDateTime, "seconds").seconds)
      );
      return () => {};
    }

    if (startDateTime != null) {
      const timer = setInterval(() => {
        setElapsed(
          Math.floor(DateTime.now().diff(startDateTime, "seconds").seconds)
        );
      }, 100);
      return () => clearTimeout(timer);
    }

    setElapsed(0);

    return () => {};
  }, [startDateTime, stopDateTime]);

  useEffect(() => {
    if (progress === "ongoing" && startDateTime == null) {
      startTimer();
    }
  }, [progress, startDateTime]);

  const onCellClick = (rowIndex: number, colIndex: number) => {
    if (progress === "ongoing") {
      play(rowIndex, colIndex);
    }
  };

  const nextGame = () => {
    gameReset();
  };

  const nextMatch = () => {
    matchReset();
  };

  return (
    <div className={className}>
      <div className="text-center text-lg font-semibold py-2">Current Player: {currentPlayer}</div>
      <div className={`grid grid-rows-3 grid-cols-3 border border-black`}>
        {board.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onCellClick(rowIndex, colIndex)}
                className="border border-black p-4"
              >
                {cell === 1 ? <XSvg className="w-20 h-20 lg:w-10 lg:h-10" /> : null}
                {cell === 2 ? <OSvg className="w-20 h-20 lg:w-10 lg:h-10"/> : null}
                {cell === null ? <div className="w-20 h-20 lg:w-10 lg:h-10" /> : null}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <div className="text-center text-xl py-4">{calulateGameTime(elapsed)}</div>
      {matchWinner != null ? (
        <>
          <span>Match Winner!: {matchWinner}</span>
          <Button type="button" onClick={nextMatch}>
            Next game
          </Button>
        </>
      ) : (
        <>
          {progress === "current-player-win" ? (
            <>
              <span>Game Winner!: {currentPlayer}</span>
              <Button type="button" onClick={nextGame}>
                Next game
              </Button>
            </>
          ) : null}
          {progress == "draw" ? (
            <>
              <span>Draw</span>
              <Button type="button" onClick={nextGame}>
                Next game
              </Button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
