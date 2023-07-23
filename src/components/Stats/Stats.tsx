import classNames from "classnames";
import { Player } from "../Board/Board";
import { IconO, IconX } from "../Icons/Icons";

export type Timer = {
  seconds: number;
  minutes: number;
  hours: number;
};

type StatsProps = {
  matchHistory: Player[];
  gameNumber: number;
  gameTimer: Timer;
  matchTimer: Timer;
};
export default function Stats({
  matchHistory,
  gameNumber,
  gameTimer,
  matchTimer,
}: StatsProps) {
  const gameHours = gameTimer.hours;
  const gameMinutes = gameTimer.minutes;
  const gameSeconds = gameTimer.seconds;
  const matchHours = matchTimer.hours;
  const matchMinutes = matchTimer.minutes;
  const matchSeconds = matchTimer.seconds;

  return (
    <div className="flex flex-col gap-6 text-xl">
      <div>
        <p>
          {gameHours < 10 ? `0${gameHours}` : gameHours}:
          {gameMinutes < 10 ? `0${gameMinutes}` : gameMinutes}:
          {gameSeconds < 10 ? `0${gameSeconds}` : gameSeconds}
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl mb-2">Played Games</h3>
        <div className="flex justify-center gap-1 items-center">
          {Array.from(Array(10).keys())?.map((index) => {
            const isPreviousGame = gameNumber > index + 1;
            const isPlayingGame = gameNumber === index + 1;
            return (
              <div
                key={index}
                className={classNames(
                  "w-10 h-10 border rounded-full grid place-items-center",
                  {
                    ["bg-gray-400 border-gray-400"]: isPreviousGame,
                    ["bg-gray-300 border-gray-300"]: isPlayingGame,
                    ["bg-neutral-100 border-neutral-100"]:
                      !isPlayingGame && !isPreviousGame,
                  }
                )}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl mb-2">Match History</h3>
        <div className="flex justify-center gap-1 items-center">
          {Array.from(Array(10).keys())?.map((index) => {
            const isWinnerX = matchHistory[index] === "X";
            const isWinnerO = matchHistory[index] === "O";
            return (
              <div
                key={index}
                className="w-10 h-10 border bg-gray-300 border-neutral-400 rounded-full p-2"
              >
                {isWinnerX ? <IconX /> : isWinnerO ? <IconO /> : null}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h3 className="text-2xl">Total Time</h3>
        <p>
          {matchHours < 10 ? `0${matchHours}` : matchHours}:
          {matchMinutes < 10 ? `0${matchMinutes}` : matchMinutes}:
          {matchSeconds < 10 ? `0${matchSeconds}` : matchSeconds}
        </p>
      </div>
    </div>
  );
}
