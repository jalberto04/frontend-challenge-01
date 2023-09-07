import { Box, Stack, Typography } from '@mui/material';
import { PlayerStats } from 'app-types';

type PlayerWinLossProps = {
  player: PlayerStats;
};

export const PlayerWinLoss = ({ player }: PlayerWinLossProps) => {
  return (
    <Box>
      <Typography variant="body1" fontWeight={700} textAlign="center">
        {player.username}
      </Typography>

      <Stack direction="row" columnGap={3}>
        <Box>
          <Stack width={48} height={48} justifyContent="center" alignItems="center" bgcolor="grey" borderRadius="50%">
            <Typography data-testid="win-rate" variant="body1" textAlign="center" color="white">
              {`${isNaN(player.winRate) ? 0 : player.winRate.toFixed(0)}%`}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="center">
            V
          </Typography>
        </Box>
        <Box>
          <Stack width={48} height={48} justifyContent="center" alignItems="center" bgcolor="grey" borderRadius="50%">
            <Typography data-testid="loss-rate" variant="body1" textAlign="center" color="white">
              {`${isNaN(player.lossRate) ? 0 : player.lossRate.toFixed(0)}%`}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="center">
            L
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
