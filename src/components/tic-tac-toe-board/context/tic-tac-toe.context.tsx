import React, { createContext, useContext, useMemo, useState } from 'react';
import { fill, filter, findIndex, partition, range, reduce, sumBy } from 'lodash';
import { Nullable, PlayerStats, TicTacToe } from 'app-types';

export interface TicTacToeGamesContextReturn {
  games: Nullable<TicTacToe>[];
  playedDuration: number;
  playedGames: number;
  players: PlayerStats[];
  winner?: string;
  updateGameMatch: (game: TicTacToe) => void;
}

export const TicTacToeGamesContext = createContext<TicTacToeGamesContextReturn>(undefined!);

export type TicTacToeGamesProviderProps = {
  children: React.ReactNode;
  games?: TicTacToe[];
  winsRequired?: number;
};

export const TicTacToeGamesProvider = ({
  children,
  games: gameHistory = [],
  winsRequired = 5
}: TicTacToeGamesProviderProps) => {
  const [games, setGames] = useState<Nullable<TicTacToe>[]>(range(9).map((index) => gameHistory[index] ?? null));
  const stats = useMemo(() => {
    const playedGames = filter(games, Boolean);
    const players = partition(playedGames, ({ winner }: TicTacToe) => winner === 'x');
    // Find the winner with the required total wins
    const winner = reduce(
      players,
      (player: undefined | string, arr, index) => {
        if (arr.length === winsRequired) return `Player ${index + 1}`;
        return player;
      },
      undefined
    );

    return {
      winner: winner,
      playedGames: playedGames.length,
      playedDuration: sumBy(playedGames, 'duration'),
      players: players.map((arr, index) => {
        const numOfWins = arr.length;
        return {
          username: `Player ${index + 1}`,
          wins: numOfWins,
          winRate: (numOfWins / playedGames.length) * 100,
          lossRate: ((playedGames.length - numOfWins) / playedGames.length) * 100
        };
      })
    };
  }, [games, winsRequired]);

  const updateGameMatch = (game: TicTacToe) => {
    const index = findIndex(games, (game) => game === null);
    if (index !== -1) {
      const nextGames = [...games];
      nextGames[index] = game;
      setGames(nextGames);
    }
  };

  return (
    <TicTacToeGamesContext.Provider
      value={{
        games,
        playedGames: stats.playedGames,
        playedDuration: stats.playedDuration,
        players: stats.players,
        winner: stats.winner,
        updateGameMatch
      }}>
      {children}
    </TicTacToeGamesContext.Provider>
  );
};

export const TicTacToeGamesConsumer = TicTacToeGamesContext.Consumer;

export const useTicTacToeGames = () => useContext(TicTacToeGamesContext);
