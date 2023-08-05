import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Engine logic for a game of tic-tac-toe

// The game board is represented as a 3x3 array of numbers
// 0 = empty, 1 = X, 2 = O
type Empty = null;
type Player = 1 | 2;
type Square = Empty | Player;
type Board = Square[][];

type GameState = {
  board: Board;
  currentPlayer: Player;
  progress: "ongoing" | "current-player-win" | "draw";
};

type GameActions = {
  play: (row: number, col: number) => void;
  reset: () => void;
};

function checkWin(board: Board, player: Player) {
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
export const useGameStore = create(
  immer<GameState & GameActions>((set) => ({
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    currentPlayer: 1,
    progress: "ongoing",
    play: (row, col) =>
      set((state) => {
        // If the square is empty, set it to the current player
        if (state.board[row][col] === null) {
          state.board[row][col] = state.currentPlayer;
        }

        // Check for a win
        if (checkWin(state.board, state.currentPlayer)) {
          state.progress = "current-player-win";
          return;
        }

        // Check for a draw
        if (checkBoardFull(state.board)) {
          state.progress = "draw";
          return;
        }

        // Otherwise, switch to the other player
        state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
      }),
    reset: () =>
      set((state) => {
        // Reset the board to empty
        state.board = [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ];
        // Reset the player to 1
        state.currentPlayer = 1;
      }),
  }))
);
