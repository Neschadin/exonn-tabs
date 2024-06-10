import { useEffect, useRef, useState } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';

import { findItem } from '../../utils/utils';

import PinTabIcon from '../../assets/icons/pin-tab-icon.svg?react';

type TProps = {
  unpinnedTabs: TTabItem[];
  pinnedTabs: TTabItem[];
  handlePinTab: (id: string) => (action: 'pin' | 'unpin') => void;
};

const PinCtxMenu = ({ unpinnedTabs, pinnedTabs, handlePinTab }: TProps) => {
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const tabIdRef = useRef<string | null>(null);
  const action = isPinned ? 'unpin' : 'pin';

  const closeCtxMenu = () => {
    setCtxMenu(null);
    tabIdRef.current = null;
  };

  const onClick = () => {
    tabIdRef.current && handlePinTab(tabIdRef.current)(action);
    closeCtxMenu();
  };

  useEffect(() => {
    const handleRightClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;
      const tabId = target
        .closest('[data-tab-id]')
        ?.getAttribute('data-tab-id');

      if (tabId) {
        ev.preventDefault();
        const mouseXY = { x: ev.clientX - 2, y: ev.clientY + 6 };
        tabIdRef.current = tabId;

        if (findItem(unpinnedTabs, tabId)) {
          setCtxMenu(mouseXY);
          setIsPinned(false);
        } else if (findItem(pinnedTabs, tabId)) {
          setCtxMenu(mouseXY);
          setIsPinned(true);
        }
      }
    };

    document.addEventListener('contextmenu', handleRightClick);

    return () => document.removeEventListener('contextmenu', handleRightClick);
  }, [unpinnedTabs, pinnedTabs]);

  return (
    <Menu
      sx={{ '& .MuiList-root': { py: '4px' } }}
      open={!!ctxMenu}
      onClose={closeCtxMenu}
      anchorReference='anchorPosition'
      anchorPosition={ctxMenu ? { top: ctxMenu.y, left: ctxMenu.x } : undefined}
    >
      <MenuItem sx={{ color: '#7F858D', gap: '8px' }} onClick={onClick}>
        <PinTabIcon
          style={{ transform: isPinned ? 'rotate(45deg)' : 'none' }}
        />

        <Typography
          sx={{
            fontSize: 14,
            '&::first-letter': { textTransform: 'uppercase' },
          }}
        >
          {action + ' tab'}
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export { PinCtxMenu };
