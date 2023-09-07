import { memo, useState } from 'react';
import { Grid, GridProps, Stack, Typography } from '@mui/material';
import { useBoolean } from 'usehooks-ts';
import { every, fill, includes, isEmpty, map, range } from 'lodash';

import { TicTacToe } from 'app-types';
import calculateWinner from 'utils/calculateWinner';
import durationText from 'utils/durationText';
import useDuration from 'hooks/useDuration';
import { Button } from 'components/primitives';
import { Square } from './components/square';

type TicTacToeBoardProps = {
  _container?: GridProps;
  autoStart?: boolean;
  board?: TicTacToe['board'];
  duration?: number;
  onFinished?: (data: TicTacToe) => void;
};

const TicTacToeBoard = ({ _container, autoStart = false, board: boardHistory = [], ...props }: TicTacToeBoardProps) => {
  const xIsNext = useBoolean(true);
  const isStarted = useBoolean(autoStart ?? !isEmpty(boardHistory));
  const isRestart = useBoolean();
  const [board, setBoard] = useState<TicTacToe['board']>(map(range(9), (i: number) => boardHistory[i] ?? null));
  const [lines, setLines] = useState<number[]>(calculateWinner(boardHistory)?.lines ?? []);
  const { duration, start, stop } = useDuration({ duration: props.duration ?? 0 });

  const handleClick = (index: number) => () => {
    if (!isStarted.value || !isEmpty(lines) || board[index]) return;

    const nextBoard = [...board];
    nextBoard[index] = xIsNext.value ? 'x' : 'o';

    // find the winner of this game
    const result = calculateWinner(nextBoard);
    const player = result ? result.value : every(nextBoard, (square) => square) ? 'draw' : undefined;

    if (player) {
      // Stop timer
      stop();

      if (player === 'draw') {
        // if the game result is a draw, show restart button
        isRestart.setTrue();
      } else {
        // remember the square lines
        setLines(result?.lines ?? []);

        // trigger callback action
        if (props.onFinished) {
          const payload: TicTacToe = {
            board: nextBoard,
            duration: duration,
            winner: player
          };
          props.onFinished(payload);
        }
      }
    }

    setBoard(nextBoard);
    xIsNext.setValue(!xIsNext.value);
  };

  const handleStart = () => {
    isStarted.setTrue();
    // Start timer
    start();
  };

  // restart the board if the result is 'Draw'
  const handleRestart = () => {
    isRestart.setFalse();
    // change back to default 'x' token
    xIsNext.setTrue();
    // Empty the board
    setBoard(fill(Array(9), null));
    // Start timer
    start();
  };

  return (
    <Stack alignItems="center" justifyContent="center">
      <Stack position="relative" alignItems="center" justifyContent="center">
        <Grid
          container
          spacing={1}
          gridRow={4}
          gridColumn={4}
          mb={1}
          width="100%"
          height="100%"
          overflow="hidden"
          data-testid="board"
          {..._container}
          sx={{
            opacity: !isRestart.value ? 1 : 0.5,
            ..._container?.sx
          }}>
          {map(board, (token, index) => (
            <Grid key={index} item xs={4}>
              <Square
                index={index}
                disabled={!isStarted.value || !isEmpty(lines)}
                highlight={isEmpty(lines) || includes(lines, index)}
                token={token}
                onClick={handleClick(index)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Display start button for a new game */}
        {!boardHistory.length && !isStarted.value && (
          <Button size="large" sx={{ position: 'absolute', borderRadius: 10 }} onClick={handleStart}>
            Start
          </Button>
        )}

        {/* Display restart button if the game result is "Draw" */}
        {isRestart.value && (
          <Button size="large" sx={{ position: 'absolute', borderRadius: 10 }} onClick={handleRestart}>
            Restart
          </Button>
        )}
      </Stack>

      <Typography data-testid="board-timer" variant="h5" fontWeight={600}>
        {durationText(duration)}
      </Typography>
    </Stack>
  );
};

export default memo(TicTacToeBoard);
