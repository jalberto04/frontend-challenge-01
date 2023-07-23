import { Player } from "@/components/Board/Board";

function getIndex(gridSize: number, x: number, y: number): number {
  return x * gridSize + y;
}

export function checkGameWinner(gridSize: number, board: Player[]) {
  let winningIndexes: number[] = [];
  const directions = [
    { dx: 0, dy: 1 }, // Check horizontal
    { dx: 1, dy: 0 }, // Check vertical
    { dx: 1, dy: 1 }, // Check right diagonal
    { dx: 1, dy: -1 }, // Check left diagonal
  ];

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (const direction of directions) {
        let index = getIndex(gridSize, x, y);
        let player: Player = board[index];
        if (player === null) continue;

        let win = true;
        winningIndexes = [index];
        for (let i = 1; i < gridSize; i++) {
          let nx = x + direction.dx * i;
          let ny = y + direction.dy * i;

          if (nx < 0 || nx >= gridSize || ny < 0 || ny >= gridSize) {
            win = false;
            break;
          }
          let nextIndex = getIndex(gridSize, nx, ny);
          if (board[nextIndex] !== player) {
            win = false;
            break;
          }
          winningIndexes = [...winningIndexes, nextIndex];
        }

        if (win)
          return {
            player,
            winningIndexes,
          };
      }
    }
  }
  return null;
}
