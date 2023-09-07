import { Stack, Typography } from '@mui/material';

import { ReactComponent as Trophy } from 'assets/trophy.svg';
import { Button } from 'components/primitives';

type CongratulationsProps = {
  player: string;
  onClose?: () => void;
};

export const Congratulation = ({ player, ...props }: CongratulationsProps) => {
  return (
    <Stack data-testid="prompt-congratulation" minWidth={500} p={3} pt={5} alignItems="center">
      <Trophy height={120} />

      <Typography variant="h5" fontWeight={700} textAlign="center" color="GrayText">
        Congratulations!!
      </Typography>
      <Typography data-testid="grand-winner" variant="h4" fontWeight={700} textAlign="center">
        {player}
      </Typography>

      {!!props.onClose && (
        <Button outlined sx={{ mt: 3, maxWidth: 90 }} onClick={props.onClose}>
          Close
        </Button>
      )}
    </Stack>
  );
};
