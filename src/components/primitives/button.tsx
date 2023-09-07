import { Button as BaseButton, ButtonProps as BaseButtonProps, CircularProgress } from '@mui/material';

type ButtonProps = BaseButtonProps & {
  loading?: boolean;
  outlined?: boolean;
};

export const Button = ({ children, disabled, loading = false, outlined, ...props }: ButtonProps) => {
  return (
    <BaseButton
      disableElevation
      disabled={loading || disabled}
      disableRipple={loading || disabled}
      variant={outlined ? 'outlined' : 'contained'}
      color="primary"
      size="medium"
      {...props}
      endIcon={loading ? <CircularProgress size={16} sx={{ color: 'gray' }} /> : props.endIcon}>
      {children}
    </BaseButton>
  );
};
