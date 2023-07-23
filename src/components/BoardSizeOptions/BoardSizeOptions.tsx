import classNames from "classnames";
import { ChangeEventHandler } from "react";

type BoardSizeOptionsProps = {
  gridSize: number;
  onBoardSizeChange: ChangeEventHandler<HTMLInputElement>;
  onConfirmGrid: () => void;
};

export function BoardSizeOptions({
  gridSize,
  onBoardSizeChange,
  onConfirmGrid,
}: BoardSizeOptionsProps) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-3xl mb-4">Select the Board Size</h3>
      <div className="justify-center flex items-center mb-6 gap-4">
        {[3, 6, 9].map((size) => (
          <div key={size} className="flex items-center gap-0">
            <input
              type="radio"
              className="text-green-500"
              checked={gridSize === size}
              value={size}
              onChange={onBoardSizeChange}
              id={`${size}x${size}`}
            />
            <label
              htmlFor={`${size}x${size}`}
              className="inline-flex items-center"
            >
              <span className="ml-2 text-green-700">
                {size}x{size}
              </span>
            </label>
          </div>
        ))}
      </div>
      <button
        className="disabled:bg-gray-300 px-3 py-2 border border-neutral-400 rounded bg-white w-[220px] mx-auto"
        onClick={onConfirmGrid}
        disabled={gridSize === 0}
      >
        Confirm Board Size
      </button>
      <div className="w-full flex justify-center">
        <div
          className={classNames("grid gap-0", {
            ["grid-cols-3 w-[120px]"]: gridSize === 3,
            ["grid-cols-6 w-[240px]"]: gridSize === 6,
            ["grid-cols-9 w-[360px]"]: gridSize === 9,
          })}
        >
          {Array.from(Array(gridSize * gridSize).keys()).map(() => (
            <div
              className={classNames(
                "h-10 w-10 border-2 text-black border-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
