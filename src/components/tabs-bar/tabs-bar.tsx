import { Stack } from '@mui/material';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

import { PinCtxMenu } from '../pin-ctx-menu/pin-ctx-menu';
import { UnpinnedTabs } from '../unpinned-tabs/unpinned-tabs';
import { PinnedTabs } from '../pinned-tabs/pinned-tabs';
import { useTabsCtx } from '../../hooks/use-tabs-ctx';

export const TabsBar = () => {
  const { unpinnedTabs, pinnedTabs, setPinnedTabs, setUnpinnedTabs } =
    useTabsCtx();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    const newOrder =
      type === 'pinnedTabs' ? [...pinnedTabs] : [...unpinnedTabs];
    const [moved] = newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, moved);

    type === 'pinnedTabs' ? setPinnedTabs(newOrder) : setUnpinnedTabs(newOrder);
  };

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
        <PinnedTabs />
        <UnpinnedTabs />
      </DragDropContext>

      <PinCtxMenu />
    </Stack>
  );
};
