import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { useClickOutside } from '../../hooks/use-click-outside';
import { findItem, removeItem } from '../../utils/utils';
import { useTabsCtx } from '../../hooks/use-tabs-ctx';

const useOverflowMenu = (
  observableContainer: HTMLDivElement | null,
  pauseObserving: boolean
) => {
  const { unpinnedTabs, removeTab } = useTabsCtx();
  const [overflowTabs, setOverflowTabs] = useState<TTabItem[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);

  const openMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(anchorEl ? null : event.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  const closeTab = (id: string) => {
    removeTab(id, 'unpinnedTabs');
    const newOverflowTabs = removeItem(overflowTabs, id);
    setOverflowTabs(newOverflowTabs);
  };

  useClickOutside(menuContainerRef, closeMenu, !!anchorEl);

  useEffect(() => {
    if (!observableContainer || pauseObserving) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const setNewState = (prev: TTabItem[]) => {
        const newOverflowTabs = [...prev];

        entries.forEach((entry) => {
          const tabId = entry.target.getAttribute('data-tab-id') || '';
          const tab = findItem(unpinnedTabs, tabId);
          if (tab && !entry.isIntersecting) {
            const exist = prev.some((t) => t.id === tabId);
            !exist && newOverflowTabs.push(tab);
          } else if (tab && entry.isIntersecting) {
            const i = newOverflowTabs.findIndex((t) => t.id === tab.id);
            i !== -1 && newOverflowTabs.splice(i, 1);
          }
        });

        return newOverflowTabs;
      };

      setOverflowTabs(setNewState);
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: observableContainer,
      rootMargin: '0px',
      threshold: 0.5,
    });

    unpinnedTabs.forEach((tab) => {
      const tabElement = document.querySelector(`[data-tab-id="${tab.id}"]`);
      tabElement && observer.observe(tabElement);
    });

    return () => observer.disconnect();
  }, [observableContainer, unpinnedTabs, pauseObserving]);

  return { overflowTabs, anchorEl, menuContainerRef, openMenu, closeTab };
};

export { useOverflowMenu };
