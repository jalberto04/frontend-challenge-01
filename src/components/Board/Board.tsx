import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import Confetti from "react-confetti";
import { useStopwatch } from "react-timer-hook";
import Block from "../Block/Block";
import useWindowSize from "../../hooks/useWindowSize";
import Stats from "../Stats/Stats";
import Controls from "../Controls/Controls";
import Banner from "../Banner/Banner";
import { checkGameWinner } from "@/utilities/checkGameWinner";
import { IconO, IconX } from "../Icons/Icons";

export type Player = "X" | "O" | null;
type BoardProps = {
  gridSize: number;
  onChangeBoardSize: () => void;
};

export default function Board({ gridSize, onChangeBoardSize }: BoardProps) {
  const [board, setBoard] = useState(Array(gridSize * gridSize).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [matchHistory, setMatchHistory] = useState<Player[]>([]);
  const [gameNumber, setGameNumber] = useState(0);
  const { height, width } = useWindowSize();
  const {
    seconds: gameSeconds,
    minutes: gameMinutes,
    hours: gameHours,
    pause: pauseGame,
    reset: resetGame,
  } = useStopwatch();
  const {
    seconds: matchSeconds,
    minutes: matchMinutes,
    hours: matchHours,
    start: startMatch,
    pause: pauseMatch,
    reset: resetMatch,
  } = useStopwatch();

  const handleClickBlock = (item: number) => {
    if (!gameWinner && gameNumber !== 0 && !matchWinner) {
      const newBoard = [...board];
      if (currentPlayer === "X") {
        newBoard[item] = "X";
        setCurrentPlayer("O");
      }
      if (currentPlayer === "O") {
        newBoard[item] = "O";
        setCurrentPlayer("X");
      }
      setBoard(newBoard);
    }
  };

  function handleResetGame() {
    setBoard(Array(gridSize * gridSize).fill(null));
    setCurrentPlayer("X");
    resetGame();
  }

  function handleEndMatch() {
    setMatchHistory([]);
    setGameNumber(0);
    handleResetGame();

    resetMatch();
    resetGame();

    pauseGame();
    pauseMatch();
  }

  function handleNextGame() {
    if (!matchWinner) {
      resetGame();
      startMatch();

      setGameNumber(gameNumber + 1);
      setBoard(Array(gridSize * gridSize).fill(null));
      setCurrentPlayer("X");
    }
  }

  function handleStartGame() {
    resetGame();
    resetMatch();

    setGameNumber(1);
    setCurrentPlayer("X");
  }

  const gameWinner = useMemo(() => {
    return checkGameWinner(gridSize, board);
  }, [gridSize, board]);

  const matchWinner = useMemo(() => {
    if (gameNumber >= 5) {
      if (matchHistory.filter((game) => game === "X")?.length === 5) {
        return "X";
      }
      if (matchHistory.filter((game) => game === "O")?.length === 5) {
        return "O";
      }
      return null;
    }
  }, [matchHistory, gameNumber]);

  useEffect(() => {
    if (gameWinner) {
      setMatchHistory([...matchHistory, gameWinner.player]);
      pauseGame();
      pauseMatch();
    }
  }, [gameWinner]);

  return (
    <div className="flex flex-col gap-4 w-full justify-center">
      <Banner
        hasGameWinner={!!gameWinner}
        hasMatchWinner={!!matchWinner}
        matchWinner={matchWinner}
        gameWinner={gameWinner?.player}
        gameNumber={gameNumber}
      />
      <div className="flex items-center gap-10 mx-auto">
        <div>
          <h3 className="font-bold uppercase text-2xl flex items-center">
            Player{" "}
            <span className="w-6">
              <IconX />
            </span>
          </h3>
          <p className="text-4xl">
            {matchHistory.filter((game) => game === "X")?.length || 0}
          </p>
        </div>
        <div
          className={classNames("grid gap-0", {
            ["grid-cols-3 w-[240px]"]: gridSize === 3,
            ["grid-cols-6 w-[480px]"]: gridSize === 6,
            ["grid-cols-9 w-[720px]"]: gridSize === 9,
          })}
        >
          {Array.from(Array(gridSize * gridSize).keys()).map((index) => (
            <Block
              key={index}
              onClickBlock={handleClickBlock}
              value={board[index]}
              index={index}
              isHighlighted={
                gameWinner?.winningIndexes?.includes(index) as boolean
              }
              hasGameStarted={gameNumber > 0}
            />
          ))}
        </div>
        <div>
          <h3 className="font-bold uppercase text-2xl flex items-center">
            Player{" "}
            <span className="w-6">
              <IconO />
            </span>
          </h3>
          <p className="text-3xl">
            {matchHistory.filter((game) => game === "O")?.length || 0}
          </p>
        </div>
      </div>
      <Controls
        onChangeBoardSize={onChangeBoardSize}
        onEndMatch={handleEndMatch}
        onNextGame={handleNextGame}
        onResetGame={handleResetGame}
        onStartGame={handleStartGame}
        gameNumber={gameNumber}
        hasGameWinner={!!gameWinner}
        hasMatchWinner={!!matchWinner}
      />
      <Stats
        gameNumber={gameNumber}
        matchHistory={matchHistory}
        gameTimer={{
          seconds: gameSeconds,
          minutes: gameMinutes,
          hours: gameHours,
        }}
        matchTimer={{
          seconds: matchSeconds,
          minutes: matchMinutes,
          hours: matchHours,
        }}
      />
      {matchWinner ? <Confetti width={width} height={height} /> : null}
    </div>
  );
}
