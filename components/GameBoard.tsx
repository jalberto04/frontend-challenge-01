'use client';

import GameGrid from "./GameGrid";

const grid = [
  ["X", "O", "O"],
  ["O", "X", "O"],
  ["O", "O", "X"],
];

const onCellClick = (row: number, col: number) => {};

export default function GameBoard() {
  return (
    <section className="mx-auto flex w-full justify-center gap-x-12 bg-gray-200 py-14">
      <div className="flex flex-col justify-center text-center">
        <span className="font-bold text-2xl">PLAYER 1</span>
        <span className="font-semibold text-5xl">2</span>
      </div>
      <div className="p-20 border border-solid border-black">
        <GameGrid grid={grid} onCellClick={onCellClick}/>
      </div>
      <div className="flex flex-col justify-center text-center">
        <span className="font-bold text-2xl">PLAYER 2</span>
        <span className="font-semibold text-5xl">3</span>
      </div>
    </section>
  );
}
