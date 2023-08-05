import type { StateCreator } from "zustand";
// Add immer mutator to StateCreator (wierd pattern)
import type {} from "zustand/middleware/immer";
import type { Player } from "./types";
import type { GameSlice } from "./game";

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
};

export type MatchSlice = MatchState & MatchActions;

function checkMatchWin(gamesPlayed: GameHistory[], player: Player) {
  return (
    gamesPlayed.filter((game) => game.winner === player).length >= WINS_NEEDED
  );
}

// The game store is initialized with an empty board and player 1
export const createMatchSlice: StateCreator<
  GameSlice & MatchSlice,
  [["zustand/immer", never]],
  [],
  MatchSlice
> = (set) => ({
  matchWinner: null,
  matchGamesPlayed: [],
  matchAddGame: (gameWinner) =>
    set((state) => {
      state.match.gamesPlayed.push({ winner: gameWinner });
      if (checkMatchWin(state.match.gamesPlayed, gameWinner)) {
        state.match.matchWinner = gameWinner;
      }
    }),
});
