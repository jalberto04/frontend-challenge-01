import type { StateCreator, StoreApi } from "zustand";
import { DateTime } from "luxon";

import type { Player } from "./types";
import { createMatchSlice, type MatchSlice } from "./match";

import { produce, immerable } from "immer";

// Engine logic for a game of tic-tac-toe

// The game board is represented as a 3x3 array of numbers
type Empty = null;
type Square = Empty | Player;
type Board = Square[][];

type GameState = {
  gameBoard: Board;
  gameCurrentPlayer: Player;
  gameProgress: "ongoing" | "current-player-win" | "draw";
  gameStartDateTime: DateTime | null;
  gameStopDateTime: DateTime | null;
};

type GameActions = {
  gamePlay: (row: number, col: number) => void;
  gameStartTimer: () => void;
  gameStopTimer: () => void;
  gameReset: () => void;
};

export type GameSlice = GameState & GameActions;

const initalState: GameState = {
  gameBoard: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  gameCurrentPlayer: 1,
  gameProgress: "ongoing",
  gameStartDateTime: null,
  gameStopDateTime: null,
};

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
  [["zustand/devtools", never]],
  [],
  GameSlice
> = (set, get, ...a) => ({
  ...initalState,
  gamePlay: (row, col) => {
    const currentPlayer = get().gameCurrentPlayer;
    const gameBoard = produce(get().gameBoard, (draft) => {
      if (draft[row][col] === null) {
        draft[row][col] = currentPlayer;
      }
    });

    // Check for a win
    if (checkGameWin(gameBoard, currentPlayer)) {
      createMatchSlice(set, get, ...a).matchAddGame(currentPlayer);
      createGameSlice(set, get, ...a).gameStopTimer();
      set({
        gameBoard,
        gameProgress: "current-player-win",
      });
      return;
    }

    // Check for a draw
    if (checkBoardFull(gameBoard)) {
      createGameSlice(set, get, ...a).gameStopTimer();
      set({
        gameBoard,
        gameProgress: "draw",
      });
      return;
    }
    // Otherwise, continue the game and switch players
    set({
      gameBoard,
      gameCurrentPlayer: currentPlayer === 1 ? 2 : 1,
    });
  },
  gameReset: () => {
    set(initalState);
  },
  gameStartTimer: () => {
    const gameStartDateTime = DateTime.now();
    set({
      gameStartDateTime,
      gameStopDateTime: null,
    });
  },
  gameStopTimer: () => {
    const gameStopDateTime = DateTime.now();
    set({
      gameStopDateTime,
    });
  },
});
