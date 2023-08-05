"use client";
import { Fragment, useEffect, useState } from "react";
import { DateTime, Duration, IntervalObject } from "luxon";

import { useBoundStore } from "@/engine";
import XSvg from "@/components/svg-icons/XSvgIcon";
import OSvg from "@/components/svg-icons/OSvgIcon";
import { Button } from "@/components/ui/button";

const calulateGameTime = (
  startDate: DateTime | null,
  endDate: DateTime | null
) => {
  if (startDate && endDate) {
    return DateTime.fromObject({ hour: 0, minute: 0, second: 0 })
      .plus(endDate.diff(startDate))
      .toLocaleString(DateTime.TIME_24_WITH_SECONDS);
  }

  if (startDate && endDate == null) {
    return DateTime.fromObject({ hour: 0, minute: 0, second: 0 })
      .plus(DateTime.now().diff(startDate))
      .toLocaleString(DateTime.TIME_24_WITH_SECONDS);
  }

  return DateTime.fromObject({ hour: 0, minute: 0, second: 0 })
    .toLocaleString(DateTime.TIME_24_WITH_SECONDS);
};

export default function GameGrid() {
  const board = useBoundStore((state) => state.gameBoard);
  const currentPlayer = useBoundStore((state) => state.gameCurrentPlayer);
  const progress = useBoundStore((state) => state.gameProgress);
  const play = useBoundStore((state) => state.gamePlay);
  const gameReset = useBoundStore((state) => state.gameReset);
  const matchReset = useBoundStore((state) => state.matchReset);
  const matchWinner = useBoundStore((state) => state.matchWinner);
  const startDate = useBoundStore((state) => state.gameStartDate);
  const endDate = useBoundStore((state) => state.gameEndDate);
  const startTimer = useBoundStore((state) => state.gameStartTimer);

  const [gameTime, setGameTime] = useState<string>(
    calulateGameTime(startDate, endDate)
  );

  useEffect(() => {
    setGameTime(calulateGameTime(startDate, endDate));

    if (startDate && endDate == null) {
      const interval = setInterval(() => {
        setGameTime(calulateGameTime(startDate, null));
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

    return () => {};
  }, [startDate, endDate]);

  useEffect(() => {
    startTimer();
  }, []);

  const onCellClick = (rowIndex: number, colIndex: number) => {
    if (progress === "ongoing") {
      play(rowIndex, colIndex);
    }
  };

  const nextGame = () => {
    gameReset();
    startTimer();
  };

  const nextMatch = () => {
    matchReset();
  };

  return (
    <div>
      <div className={`grid grid-rows-3 grid-cols-3 border border-black`}>
        {board.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => onCellClick(rowIndex, colIndex)}
                className="border border-black p-3"
              >
                {cell === 1 ? <XSvg /> : null}
                {cell === 2 ? <OSvg /> : null}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col">
        <span>Current Player: {currentPlayer}</span>
        <span>{gameTime}</span>
      </div>
      {matchWinner != null ? (
        <div>
          <span>Match Winner!: {matchWinner}</span>
          <Button type="button" onClick={nextMatch}>
            Next game
          </Button>
        </div>
      ) : (
        <>
          {progress === "current-player-win" ? (
            <div>
              <span>Game Winner!: {currentPlayer}</span>
              <Button type="button" onClick={nextGame}>
                Next game
              </Button>
            </div>
          ) : null}
          {progress == "draw" ? (
            <div>
              <span>Draw</span>
              <Button type="button" onClick={nextGame}>
                Next game
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
