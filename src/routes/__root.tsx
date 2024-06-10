import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TabsBar } from '../components/tabs-bar/tabs-bar';
import { Box } from '@mui/material';
import { TabsProvider } from '../providers/tabs-provider';

export const Route = createRootRoute({
  component: () => (
    <TabsProvider>
      <TabsBar />

      <Box flexGrow={1} p='20px' border={20} borderColor='#f1f5f8'>
        <Outlet />
      </Box>
    </TabsProvider>
  ),
});
