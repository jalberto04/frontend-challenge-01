import { useState } from "react";
import Board from "./components/Board/Board";
import { BoardSizeOptions } from "./components/BoardSizeOptions/BoardSizeOptions";

function App() {
  const [gridSize, setGridSize] = useState(0);
  const [confirmGridSize, setConfirmGridSize] = useState(false);
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGridSize(Number(event.currentTarget.value));
  };
  return (
    <div className="text-center w-full">
      <h3 className="text-neutral-900 font-bold text-4xl mb-6">
        Tic Tac Toe Game
      </h3>
      <div className="flex justify-center items-center">
        {!confirmGridSize ? (
          <BoardSizeOptions
            gridSize={gridSize}
            onBoardSizeChange={handleSizeChange}
            onConfirmGrid={() => setConfirmGridSize(true)}
          />
        ) : null}
        {confirmGridSize ? (
          <Board
            gridSize={gridSize}
            onChangeBoardSize={() => setConfirmGridSize(false)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
