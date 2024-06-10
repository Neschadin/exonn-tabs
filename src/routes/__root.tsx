import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TabsBar } from '../components/tabs-bar/tabs-bar';
import { Box } from '@mui/material';

export const Route = createRootRoute({
  component: () => (
    <>
      <TabsBar />

      <Box flexGrow={1} p='20px' border={20} borderColor='#f1f5f8'>
        <Outlet />
      </Box>
    </>
  ),
});
