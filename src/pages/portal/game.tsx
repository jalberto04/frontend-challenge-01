import { useEffect, useMemo, useState } from 'react';
import { useBoolean } from 'usehooks-ts';
import { Alert, Box, Grid, Stack, Typography } from '@mui/material';
import { Circle as CircleIcon } from '@mui/icons-material';
import { findIndex, map } from 'lodash';

import { ReactComponent as Trophy } from 'assets/trophy.svg';
import durationText from 'utils/durationText';
import { MainLayout } from 'components/layout/main-layout';
import { Button, Modal } from 'components/primitives';
import { Congratulation, PlayerWinLoss } from 'components/shared';
import TicTacToeBoard, { useTicTacToeGames } from 'components/tic-tac-toe-board';

const GamePage = () => {
  const isOpenDialog = useBoolean();
  const [step, setStep] = useState<number>(0);
  const { games, players, playedDuration, playedGames, winner, updateGameMatch } = useTicTacToeGames();
  const previewGame = useMemo(() => games[step], [step, games]);

  // Action to preview the game history
  const handleChangeGame = (index: number) => () => {
    setStep(index);
  };

  // Action to continue the next game
  const handleNextGame = () => {
    const index = findIndex(games, (game) => game === null);
    if (index !== -1) setStep(index);
  };

  // Detect the winner and prompt the message
  useEffect(() => isOpenDialog.setValue(!!winner), [winner]);

  return (
    <MainLayout>
      <Box py={3} bgcolor="white">
        <Grid container>
          {/* Player 1 */}
          <Grid item md={3} alignItems="center" justifyContent="center">
            <Stack alignItems="center" justifyContent="center" height="100%">
              <Typography variant="h5" fontWeight={600} color="primary.dark">
                {players[0]?.username ?? ''}
              </Typography>
              <Typography data-testid="player-1-scores" variant="h3" fontWeight={500}>
                {players[0]?.wins ?? '1'}
              </Typography>
            </Stack>
          </Grid>

          {/* Game board */}
          <Grid item md={6}>
            <Stack alignItems="center">
              {/* Display the winner */}
              {winner && (
                <Alert
                  severity="warning"
                  icon={<Trophy height={32} />}
                  sx={{ alignItems: 'center', mb: 2, py: 0, width: 460 }}>
                  <Typography variant="h6">{`The winner is ${winner}`}</Typography>
                </Alert>
              )}

              <TicTacToeBoard
                key={step}
                _container={{ width: 500, height: 500 }}
                board={previewGame?.board}
                duration={previewGame?.duration}
                onFinished={updateGameMatch}
              />

              {/* show button "Next Game" to continue the game */}
              {!winner && !!previewGame && playedGames < games.length && (
                <Button size="large" variant="contained" sx={{ mt: 2, borderRadius: 10 }} onClick={handleNextGame}>
                  Next Game
                </Button>
              )}
            </Stack>
          </Grid>

          {/* Player 2 */}
          <Grid item md={3}>
            <Stack alignItems="center" justifyContent="center" height="100%">
              <Typography variant="h5" fontWeight={600} color="secondary.dark">
                {players[1]?.username ?? ''}
              </Typography>
              <Typography data-testid="player-2-scores" variant="h3" fontWeight={500}>
                {players[1]?.wins ?? '1'}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Grid container>
        {/* Preview Player Win or Lost Percentage */}
        <Grid item xs={12} md={6}>
          <Stack rowGap={1} py={2}>
            <Typography variant="body1" fontWeight={700} textAlign="center">
              Victories %
            </Typography>

            <Stack direction="row" columnGap={5} justifyContent="center" alignItems="center" width="100%">
              {map(players, (player) => (
                <PlayerWinLoss key={player.username} player={player} />
              ))}
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack rowGap={1} py={2}>
            <Typography variant="body2" fontWeight={700} textAlign="center">
              Played Games
            </Typography>
            <Stack direction="row" justifyContent="center" columnGap={1}>
              {map(games, (game, index) => (
                <CircleIcon
                  key={index}
                  data-testid="played-marking"
                  fontSize="small"
                  color={game ? (game.winner === 'x' ? 'primary' : 'secondary') : 'disabled'}
                />
              ))}
            </Stack>

            <Typography variant="body1" fontWeight={700} textAlign="center">
              Game History
            </Typography>
            <Stack direction="row" justifyContent="center" columnGap={1}>
              {map(games, (game, index) => (
                <Button
                  key={index}
                  disabled={!game}
                  data-testid="game-page"
                  color={game?.winner === 'x' ? 'primary' : 'secondary'}
                  outlined={!game || index !== step}
                  sx={{ px: 0, minWidth: 32, height: 32 }}
                  onClick={handleChangeGame(index)}>
                  {game?.winner ? (game?.winner === 'x' ? 'P1' : 'P2') : ''}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Grid>

        <Grid item xs={12} py={2}>
          <Typography variant="body1" fontWeight={700} textAlign="center">
            Total Play Time
          </Typography>

          <Typography data-testid="total-play-time" variant="h5" fontWeight={700} textAlign="center">
            {durationText(playedDuration)}
          </Typography>
        </Grid>
      </Grid>

      <Modal open={!!winner && isOpenDialog.value} disableAutoFocus>
        <Congratulation player={winner ?? ''} onClose={isOpenDialog.setFalse} />
      </Modal>
    </MainLayout>
  );
};

export default GamePage;
