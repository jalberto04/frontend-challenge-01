import { useBoolean } from 'usehooks-ts';
import { Box, Container, Drawer, Stack, StackProps } from '@mui/material';
import { grey } from '@mui/material/colors';
import { AppBarMenu } from 'components/core';

export const MainLayout = ({ children, ...props }: StackProps) => {
  const openDrawer = useBoolean();

  return (
    <Stack
      data-testid="page[portal]"
      bgcolor={grey[100]}
      sx={{ width: '100%', height: '100vh', overflowX: 'hidden' }}
      {...props}>
      {/* App Header */}
      <AppBarMenu title={process.env.REACT_APP_TITLE} />

      {/* Side Menu Bar */}
      <Drawer
        open={openDrawer.value}
        onClose={openDrawer.toggle}
        PaperProps={{
          sx: {
            position: 'relative',
            width: 280,
            bgcolor: 'background.100'
          }
        }}>
        <Box role="presentation" pt={3} width="100%">
          {/* Do nothing */}
        </Box>
      </Drawer>

      {/* Page Content */}
      <Stack flex={1} position="relative" direction="row">
        <Box width="100%" height="100%">
          <Container component="main" maxWidth={false} disableGutters>
            {children}
          </Container>
        </Box>
      </Stack>
    </Stack>
  );
};
