import type { StateCreator } from "zustand";
import type { Player } from "./types";
import { createGameSlice, type GameSlice } from "./game";
import { produce } from "immer";

export const BEST_OF = 9;

function calcWinsNeeded() {
  return Math.floor((BEST_OF + 1) / 2);
}

const WINS_NEEDED = calcWinsNeeded();

type GameHistory = {
  // Only wins will be tracked, draws will be replayed
  winner: Player;
};

type MatchState = {
  matchGamesPlayed: GameHistory[];
  matchWinner: Player | null;
};

type MatchActions = {
  matchAddGame: (gameWinner: Player) => void;
  matchReset: () => void;
};

export type MatchSlice = MatchState & MatchActions;

const initalState: MatchState = {
  matchGamesPlayed: [],
  matchWinner: null,
};

function checkMatchWin(gamesPlayed: GameHistory[], player: Player) {
  return (
    gamesPlayed.filter((game) => game.winner === player).length >= WINS_NEEDED
  );
}

// The game store is initialized with an empty board and player 1
export const createMatchSlice: StateCreator<
  GameSlice & MatchSlice,
  [["zustand/devtools", never]],
  [],
  MatchSlice
> = (set, ...a) => ({
  ...initalState,
  matchAddGame: (gameWinner) =>
    set((state) => {
      const matchGamesPlayed = produce(state.matchGamesPlayed, (draft) => {
        draft.push({ winner: gameWinner });
      });

      if (checkMatchWin(matchGamesPlayed, gameWinner)) {
        state.matchWinner = gameWinner;
        return {
          matchGamesPlayed,
          matchWinner: gameWinner,
        };
      }

      return {
        matchGamesPlayed,
      };
    }),
  matchReset: () => {
    createGameSlice(set, ...a).gameReset();
    set(initalState);
  },
});
