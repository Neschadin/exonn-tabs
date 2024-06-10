import { createContext, useState, ReactNode } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { findItem, removeItem } from '../utils/utils';
import { useStore } from '../hooks/use-store';
import { useRouterState } from '@tanstack/react-router';

interface TabsContextType {
  pathname: string;
  unpinnedTabs: TTabItem[];
  pinnedTabs: TTabItem[];
  setPinnedTabs: Dispatch<SetStateAction<TTabItem[]>>;
  setUnpinnedTabs: Dispatch<SetStateAction<TTabItem[]>>;
  removeTab: (id: string, type: 'pinnedTabs' | 'unpinnedTabs') => void;
  handlePinTab: (id: string) => (action: 'pin' | 'unpin') => void;
}

export const TabsCtx = createContext<TabsContextType | undefined>(undefined);

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [unpinnedTabs, setUnpinnedTabs] = useState<TTabItem[]>([]);
  const [pinnedTabs, setPinnedTabs] = useState<TTabItem[]>([]);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useStore(pathname, unpinnedTabs, pinnedTabs, setPinnedTabs, setUnpinnedTabs);

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

  return (
    <TabsCtx.Provider
      value={{
        pathname,
        unpinnedTabs,
        pinnedTabs,
        setPinnedTabs,
        setUnpinnedTabs,
        removeTab,
        handlePinTab,
      }}
    >
      {children}
    </TabsCtx.Provider>
  );
};
