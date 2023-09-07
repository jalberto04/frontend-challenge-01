import { AppBar, Stack, Toolbar, Typography } from '@mui/material';

type AppBarMenuProps = {
  title?: string;
};

export const AppBarMenu = ({ title }: AppBarMenuProps) => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center" columnGap={1}>
          {!!title && <Typography variant="h4">{title}</Typography>}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
