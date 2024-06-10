import { useState } from 'react';
import { useStore } from '../../hooks/use-store';
import { findItem, removeItem } from '../../utils/utils';
import { DropResult } from '@hello-pangea/dnd';
import { useRouterState } from '@tanstack/react-router';

export const useTabsBar = () => {
  const [unpinnedTabs, setUnpinnedTabs] = useState<TTabItem[]>([]);
  const [pinnedTabs, setPinnedTabs] = useState<TTabItem[]>([]);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useStore(pathname, unpinnedTabs, pinnedTabs, setPinnedTabs, setUnpinnedTabs);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    const newOrder =
      type === 'pinnedTabs' ? [...pinnedTabs] : [...unpinnedTabs];
    const [moved] = newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, moved);

    type === 'pinnedTabs' ? setPinnedTabs(newOrder) : setUnpinnedTabs(newOrder);
  };

  const removeTab = (id: string, type: 'pinnedTabs' | 'unpinnedTabs') =>
    type === 'pinnedTabs'
      ? setPinnedTabs((prev) => removeItem(prev, id))
      : setUnpinnedTabs((prev) => removeItem(prev, id));

  const handlePinTab = (id: string) => (action: 'pin' | 'unpin') => {
    if (action === 'pin') {
      const tabToPin = findItem(unpinnedTabs, id);
      tabToPin && setPinnedTabs((prev) => [...prev, tabToPin]);
      tabToPin && removeTab(id, 'unpinnedTabs');
    } else if (action === 'unpin') {
      const tabToUnpin = findItem(pinnedTabs, id);
      tabToUnpin && setUnpinnedTabs((prev) => [...prev, tabToUnpin]);
      tabToUnpin && removeTab(id, 'pinnedTabs');
    }
  };

  return {
    unpinnedTabs,
    pinnedTabs,
    pathname,
    onDragEnd,
    removeTab,
    handlePinTab,
  };
};
