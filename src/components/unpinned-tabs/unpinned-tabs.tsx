import { Stack, SxProps } from '@mui/material';
import { Droppable, Draggable } from '@hello-pangea/dnd';

import { useScrollContainer } from './use-scroll-container';
import { OverflowMenu } from '../overflow-menu/overflow-menu';
import { Tab } from '../tab/tab';
import { ScrollShadowBar } from '../scroll-shadow-bar/scroll-shadow-bar';
import { useTabsCtx } from '../../hooks/use-tabs-ctx';

const unpinnedTabsSx: SxProps = {
  flexDirection: 'row',
  flexWrap: 'nowrap',
  height: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollbarWidth: 'none',
};

export const UnpinnedTabs = () => {
  const { pathname, unpinnedTabs, removeTab, handlePinTab } = useTabsCtx();

  const containerRef = useScrollContainer();

  return (
    <Droppable
      droppableId='unpinnedTabs'
      direction='horizontal'
      type='unpinnedTabs'
    >
      {(provided, snapshot) => (
        <>
          <Stack
            id='unpinnedTabsContainer'
            ref={(el) => {
              containerRef.current = el;
              provided.innerRef(el);
            }}
            sx={unpinnedTabsSx}
            {...provided.droppableProps}
          >
            {unpinnedTabs.map((tab, i) => (
              <Draggable key={tab.id} draggableId={tab.id} index={i}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Tab
                      tab={tab}
                      showDivider={unpinnedTabs.length !== i + 1}
                      isActive={tab.url === pathname}
                      isDragging={snapshot.isDragging}
                      handlePinTab={handlePinTab(tab.id)}
                      closeTab={() => removeTab(tab.id, 'unpinnedTabs')}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </Stack>

          <ScrollShadowBar container={containerRef.current} />

          <OverflowMenu
            observableContainer={containerRef.current}
            pauseObserving={!!snapshot.draggingFromThisWith}
          />
        </>
      )}
    </Droppable>
  );
};
