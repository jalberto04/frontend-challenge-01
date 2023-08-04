import XSvg from "@/components/svg-icons/XSvgIcon";
import OSvg from "@/components/svg-icons/OSvgIcon";
import { Fragment } from "react";

type GridProps = {
  grid: string[][];
  onCellClick: (row: number, col: number) => void;
};

export default function GameGrid({ grid, onCellClick }: GridProps) {
  const numOfRows = grid.length;

  return (
    <div className={`grid grid-rows-3 grid-cols-3 gap-4`}>
      {grid.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
            >
              {cell === "X" ? <XSvg /> : cell === "O" ? <OSvg /> : null}
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
