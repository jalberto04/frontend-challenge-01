import { Modal as BaseModal, Box, ModalProps, Paper } from '@mui/material';

export const Modal = ({ children, ...props }: ModalProps) => {
  return (
    <BaseModal disableAutoFocus {...props}>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
        <Paper>{children}</Paper>
      </Box>
    </BaseModal>
  );
};
