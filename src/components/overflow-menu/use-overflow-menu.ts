import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { useClickOutside } from '../../hooks/use-click-outside';
import { findItem, removeItem } from '../../utils/utils';

const useOverflowMenu = (
  trackingTabs: TTabItem[],
  stopObserving: boolean,
  removeTab: (id: string, type: 'pinnedTabs' | 'unpinnedTabs') => void
) => {
  const [overflowTabs, setOverflowTabs] = useState<TTabItem[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const openMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(anchorEl ? null : event.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  const closeTab = (id: string) => {
    removeTab(id, 'unpinnedTabs');
    const newOverflowTabs = removeItem(overflowTabs, id);
    setOverflowTabs(newOverflowTabs);
  };

  useClickOutside(containerRef, closeMenu, !!anchorEl);

  useEffect(() => {
    if (stopObserving) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const setNewState = (prev: TTabItem[]) => {
        const newOverflowTabs = [...prev];

        entries.forEach((entry) => {
          const tabId = entry.target.getAttribute('data-tab-id') || '';
          const tab = findItem(trackingTabs, tabId);
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
      root: document.getElementById('unpinnedTabsContainer'),
      rootMargin: '0px',
      threshold: 0.5,
    });

    trackingTabs.forEach((tab) => {
      const tabElement = document.querySelector(`[data-tab-id="${tab.id}"]`);
      tabElement && observer.observe(tabElement);
    });

    return () => observer.disconnect();
  }, [trackingTabs, stopObserving]);

  return { overflowTabs, anchorEl, containerRef, openMenu, closeTab };
};

export { useOverflowMenu };
