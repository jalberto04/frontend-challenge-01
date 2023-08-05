import type { StateCreator } from "zustand";
// Add immer mutator to StateCreator (wierd pattern)
import type {} from "zustand/middleware/immer";
import type { Player } from "./types";
import type { MatchSlice } from "./match";

// Engine logic for a game of tic-tac-toe

// The game board is represented as a 3x3 array of numbers
type Empty = null;
type Square = Empty | Player;
type Board = Square[][];

type GameState = {
  gameBoard: Board;
  gameCurrentPlayer: Player;
  gameProgress: "ongoing" | "current-player-win" | "draw";
};

type GameActions = {
  gamePlay: (row: number, col: number) => void;
  gameReset: () => void;
};

export type GameSlice = GameState & GameActions;

function checkGameWin(board: Board, player: Player) {
  // Check rows
  const rowWin = board.some((row) => row.every((square) => square === player));

  // Check columns
  const colWin = board[0].some((_, i) =>
    board.every((row) => row[i] === player)
  );

  // Check diagonals
  const diagWin = board.every((row, i) => row[i] === player);
  const antiDiagWin = board.every(
    (row, i) => row[row.length - 1 - i] === player
  );

  return rowWin || colWin || diagWin || antiDiagWin;
}

function checkBoardFull(board: Board) {
  return board.every((row) => row.every((square) => square !== null));
}

// The game store is initialized with an empty board and player 1
export const createGameSlice: StateCreator<
  GameSlice & MatchSlice,
  [["zustand/immer", never]],
  [],
  GameSlice
> = (set) => ({
  gameBoard: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  gameCurrentPlayer: 1,
  gameProgress: "ongoing",
  gamePlay: (row, col) =>
    set((state) => {
      // If the square is empty, set it to the current player
      if (state.gameBoard[row][col] === null) {
        state.gameBoard[row][col] = state.gameCurrentPlayer;
      }

      // Check for a win
      if (checkGameWin(state.gameBoard, state.gameCurrentPlayer)) {
        state.gameProgress = "current-player-win";
        return;
      }

      // Check for a draw
      if (checkBoardFull(state.gameBoard)) {
        state.gameProgress = "draw";
        return;
      }

      // Otherwise, switch to the other player
      state.gameCurrentPlayer = state.gameCurrentPlayer === 1 ? 2 : 1;
    }),
  gameReset: () =>
    set((state) => {
      // Reset the board to empty
      state.gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];
      state.gameProgress = "ongoing";
      // Reset the player to 1
      state.gameCurrentPlayer = 1;
    }),
});
