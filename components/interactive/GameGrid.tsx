"use client";
import { Fragment } from "react";
import { useBoundStore } from "@/engine";
import XSvg from "@/components/svg-icons/XSvgIcon";
import OSvg from "@/components/svg-icons/OSvgIcon";
import { Button } from "@/components/ui/button";

export default function GameGrid() {
  const board = useBoundStore((state) => state.gameBoard);
  const currentPlayer = useBoundStore((state) => state.gameCurrentPlayer);
  const progress = useBoundStore((state) => state.gameProgress);
  const play = useBoundStore((state) => state.gamePlay);
  const gameReset = useBoundStore((state) => state.gameReset);
  const matchReset = useBoundStore((state) => state.matchReset);
  const matchWinner = useBoundStore((state) => state.matchWinner);

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
