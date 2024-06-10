import { Stack } from '@mui/material';
import { DragDropContext } from '@hello-pangea/dnd';

import { PinCtxMenu } from '../pin-ctx-menu/pin-ctx-menu';
import { UnpinnedTabs } from '../unpinned-tabs/unpinned-tabs';
import { PinnedTabs } from '../pinned-tabs/pinned-tabs';
import { useTabsBar } from './use-tabs-bar';

export const TabsBar = () => {
  const {
    unpinnedTabs,
    pinnedTabs,
    pathname,
    onDragEnd,
    removeTab,
    handlePinTab,
  } = useTabsBar();

  return (
    <Stack
      component='nav'
      position='relative'
      direction='row'
      flexWrap='nowrap'
      height='48px'
      border={1}
      borderColor='#f1f5f8'
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <PinnedTabs {...{ pathname, pinnedTabs, removeTab, handlePinTab }} />

        <UnpinnedTabs
          {...{ pathname, unpinnedTabs, removeTab, handlePinTab }}
        />
      </DragDropContext>

      <PinCtxMenu {...{ pathname, unpinnedTabs, pinnedTabs, handlePinTab }} />
    </Stack>
  );
};
