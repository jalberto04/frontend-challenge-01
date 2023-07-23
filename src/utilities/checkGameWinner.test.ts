import { expect, describe, it } from "vitest";
import { checkGameWinner } from "./checkGameWinner";
import type { Player } from "@/components/Board/Board";

describe("gameWinner", () => {
  it("returns the winning player and winning indexes for a horizontal win", () => {
    const gridSize = 3;
    const board = ["X", "X", "X", null, "O", null, "O", null, "O"] as Player[];
    const result = checkGameWinner(gridSize, board);
    expect(result).toEqual({
      player: "X",
      winningIndexes: [0, 1, 2],
    });
  });
  it("returns the winning player and winning indexes for a vertical win", () => {
    const gridSize = 3;
    const board = ["X", null, "O", "X", "O", null, "X", null, "O"] as Player[];
    const result = checkGameWinner(gridSize, board);

    expect(result).toEqual({
      player: "X",
      winningIndexes: [0, 3, 6],
    });
  });
  it("returns the winning player and winning indexes for a right diagonal win", () => {
    const gridSize = 3;
    const board = ["X", null, "O", null, "X", null, "O", null, "X"] as Player[];
    const result = checkGameWinner(gridSize, board);
    expect(result).toEqual({
      player: "X",
      winningIndexes: [0, 4, 8],
    });
  });

  it("returns the winning player and winning indexes for a left diagonal win", () => {
    const gridSize = 3;
    const board = ["O", null, "X", null, "X", null, "X", null, "O"] as Player[];
    const result = checkGameWinner(gridSize, board);
    expect(result).toEqual({
      player: "X",
      winningIndexes: [2, 4, 6],
    });
  });
  it("returns null if there is no winner", () => {
    const gridSize = 3;
    const board = ["X", "O", "X", "X", "O", "O", "O", "X", "O"] as Player[];
    const result = checkGameWinner(gridSize, board);
    expect(result).toBe(null);
  });
});
