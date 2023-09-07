declare module 'app-types' {
  type Nullable<T> = T | null;

  type TicTacToeToken = 'x' | 'o';
  type TicTacToeWinner = TicTacToeToken | 'draw';

  interface TicTacToe {
    board: Nullable<TicTacToeToken>[];
    duration: number;
    winner?: TicTacToeWinner;
  }

  interface Player {
    username: string;
  }

  interface PlayerStats extends Player {
    wins: number;
    winRate: number;
    lossRate: number;
  }
}
