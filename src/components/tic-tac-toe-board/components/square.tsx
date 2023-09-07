import { Button, ButtonProps, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

import { Nullable, TicTacToeToken } from 'app-types';
import { ReactComponent as XMark } from 'assets/x.svg';
import { ReactComponent as OMark } from 'assets/o.svg';

type SquareProps = ButtonProps & {
  index: number;
  highlight?: boolean;
  token: Nullable<TicTacToeToken>;
};

export const Square = ({ highlight = false, index, token, ...props }: SquareProps) => {
  const theme = useTheme();
  const fill = token === 'x' ? theme.palette.primary.dark : theme.palette.secondary.dark;
  const style: React.CSSProperties = {
    position: 'absolute',
    width: '70%',
    height: '70%',
    fill: highlight ? fill : grey[700]
  };

  return (
    <Button
      variant="text"
      disableFocusRipple
      disableRipple
      disableTouchRipple
      data-testid={`cell-${index}`}
      sx={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        bgcolor: grey[200]
      }}
      {...props}>
      {token ? (
        token === 'o' ? (
          <OMark title="o-token" data-testid={`o-token-${index}`} style={style} />
        ) : (
          <XMark title="x-token" data-testid={`x-token-${index}`} style={style} />
        )
      ) : null}
    </Button>
  );
};
