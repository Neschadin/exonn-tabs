import { Stack, SxProps } from '@mui/material';
import { Droppable, Draggable } from '@hello-pangea/dnd';

import { Tab } from '../tab/tab';
import { useTabsCtx } from '../../hooks/use-tabs-ctx';

const pinnedTabsSx: SxProps = {
  flexDirection: 'row',
  flexWrap: 'nowrap',
  height: '100%',
  flexShrink: 0,
  borderColor: '#aeb6ce33',
};

export const PinnedTabs = () => {
  const { pathname, pinnedTabs, removeTab, handlePinTab } = useTabsCtx();

  return (
    <Droppable
      droppableId='pinnedTabs'
      direction='horizontal'
      type='pinnedTabs'
    >
      {(provided) => (
        <Stack
          {...provided.droppableProps}
          ref={provided.innerRef}
          sx={{
            borderRight: pinnedTabs.length > 0 ? 1 : 0,
            ...pinnedTabsSx,
          }}
        >
          {pinnedTabs.length > 0 &&
            pinnedTabs.map((tab, i) => (
              <Draggable key={tab.id} draggableId={tab.id} index={i}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Tab
                      tab={tab}
                      isPinned
                      showDivider={pinnedTabs.length !== i + 1}
                      isActive={tab.url === pathname}
                      isDragging={snapshot.isDragging}
                      handlePinTab={handlePinTab(tab.id)}
                      closeTab={() => removeTab(tab.id, 'pinnedTabs')}
                    />
                  </div>
                )}
              </Draggable>
            ))}

          {provided.placeholder}
        </Stack>
      )}
    </Droppable>
  );
};
