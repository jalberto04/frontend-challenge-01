import classNames from "classnames";
import { Player } from "../Board/Board";

type BannerProps = {
  gameNumber: number;
  hasMatchWinner: boolean;
  hasGameWinner: boolean;
  gameWinner: Player | null | undefined;
  matchWinner: Player | null | undefined;
};

export default function Banner({
  gameNumber,
  hasGameWinner,
  hasMatchWinner,
  gameWinner,
  matchWinner,
}: BannerProps) {
  return (
    <>
      {gameNumber >= 1 ? (
        <div>
          {!hasMatchWinner && hasGameWinner ? (
            <h4 className="text-4xl font-bold">
              Player {gameWinner} Wins Game {gameNumber}!
            </h4>
          ) : (
            <h4 className="text-4xl font-bold">Game {gameNumber}</h4>
          )}
        </div>
      ) : (
        <h4 className="text-4xl font-bold">
          Click <span className={classNames("text-green-500")}>Start Game</span>{" "}
          to start playing!
        </h4>
      )}
      {gameNumber >= 5 && hasMatchWinner ? (
        <h4 className="text-4xl font-bold">
          Congrats! Player {matchWinner} has won the match!
        </h4>
      ) : null}
    </>
  );
}
