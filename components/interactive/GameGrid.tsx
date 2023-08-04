'use client';
import { Fragment } from "react";
import { useGameStore } from "@/engine/game";
import XSvg from "@/components/svg-icons/XSvgIcon";
import OSvg from "@/components/svg-icons/OSvgIcon";


export default function GameGrid() {
  const { board, play, winner } = useGameStore();

  const onCellClick = (rowIndex: number, colIndex: number) => {
    if (winner) return;
    play(rowIndex, colIndex);
  };

  return (
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
  );
}
