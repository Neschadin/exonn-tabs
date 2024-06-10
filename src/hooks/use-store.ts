import { useEffect, useLayoutEffect } from 'react';
import localforage from 'localforage';
import { TAB_LIST } from '../config';
import { findItem } from '../utils/utils';
import { useNavigate } from '@tanstack/react-router';

const tabList: TTabItem[] = TAB_LIST.slice();

export const useStore = (
  pathname: string,
  unpinnedTabs: TTabItem[],
  pinnedTabs: TTabItem[],
  setPinnedTabs: (tabs: TTabItem[]) => void,
  setUnpinnedTabs: (tabs: TTabItem[]) => void
) => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const findTabsByIds = (ids: string[]) =>
      ids.map((id) => findItem(tabList, id)).filter(Boolean) as TTabItem[];

    localforage.getItem<string[]>('pinnedTabs').then((ids) => {
      ids && setPinnedTabs(findTabsByIds(ids));
    });

    localforage.getItem<string[]>('unpinnedTabs').then((ids) => {
      if (ids) {
        setUnpinnedTabs(findTabsByIds(ids));
      } else {
        setUnpinnedTabs(tabList);
      }
    });
  }, []);

  useEffect(() => {
    const pinned = pinnedTabs.map((item) => item.id);
    pinned && localforage.setItem('pinnedTabs', pinned);

    const unpinned = unpinnedTabs.map((item) => item.id);
    unpinned && localforage.setItem('unpinnedTabs', unpinned);
  }, [unpinnedTabs, pinnedTabs]);

  useEffect(() => {
    localforage.getItem<string>('activePath').then((activePath) => {
      if (activePath === pathname) return;
      navigate({ to: activePath || '/lagerverwaltung' });
    });
  }, []);

  useEffect(() => {
    const existPath = tabList.find((tab) => tab.url === pathname);
    if (!existPath) return;
    localforage.setItem('activePath', pathname);
  }, [pathname]);
};
