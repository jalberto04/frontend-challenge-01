type ControlsProps = {
  gameNumber: number;
  hasMatchWinner: boolean;
  hasGameWinner: boolean;
  onNextGame: () => void;
  onStartGame: () => void;
  onResetGame: () => void;
  onEndMatch: () => void;
  onChangeBoardSize: () => void;
};
export default function Controls({
  gameNumber,
  hasMatchWinner,
  hasGameWinner,
  onNextGame,
  onStartGame,
  onResetGame,
  onEndMatch,
  onChangeBoardSize,
}: ControlsProps) {
  const hasWinnerOrGameNotStarted =
    hasGameWinner || hasMatchWinner || gameNumber === 0;
  const gameNotStarted = gameNumber === 0;
  return (
    <>
      <div className="flex gap-2 w-full justify-center text-lg">
        {gameNumber >= 1 ? (
          <button
            className="px-3 py-2 border border-neutral-400 rounded bg-white disabled:bg-gray-300"
            onClick={onNextGame}
            disabled={hasMatchWinner}
          >
            Next Game
          </button>
        ) : (
          <button
            className="px-3 py-2 border border-neutral-400 rounded bg-white disabled:bg-gray-300"
            onClick={onStartGame}
            disabled={hasMatchWinner}
          >
            Start Game
          </button>
        )}
        <button
          className="px-3 py-2 border border-neutral-400 rounded bg-white disabled:bg-gray-300"
          onClick={onResetGame}
          disabled={hasWinnerOrGameNotStarted}
        >
          Reset Game
        </button>
        <button
          className="px-3 py-2 border border-neutral-400 rounded bg-white disabled:bg-gray-300"
          onClick={onEndMatch}
          disabled={gameNotStarted}
        >
          {gameNumber >= 5 ? "Restart Match" : "End Match"}
        </button>
      </div>
      <div>
        <button
          className="px-3 py-2 border border-neutral-400 rounded bg-white text-lg"
          onClick={onChangeBoardSize}
        >
          Change Board Size
        </button>
      </div>
    </>
  );
}
