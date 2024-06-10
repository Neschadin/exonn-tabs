import { useContext } from 'react';
import { TabsCtx } from '../providers/tabs-provider';

export const useTabsCtx = () => {
  const context = useContext(TabsCtx);
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }
  return context;
};
