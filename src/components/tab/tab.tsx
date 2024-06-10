import { useState, useRef, type MouseEvent } from 'react';
import { Box, Divider, IconButton, Stack, Tooltip } from '@mui/material';
import { Link } from '@tanstack/react-router';

import { icons } from '../../assets/icons';

import {
  getBtnContainerSx,
  getContainerSx,
  getDividerSx,
  getLabelSx,
} from './styles';

type TProps = {
  tab: TTabItem;
  showDivider: boolean;
  isPinned?: true;
  isActive: boolean;
  isOverflow?: boolean;
  isDragging: boolean;
  closeTab: () => void;
  handlePinTab: (action: 'pin' | 'unpin') => void;
};

export const Tab = (props: TProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const ctxMenuRef = useRef<CtxMenuRef>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  const {
    tab,
    showDivider,
    isOverflow,
    isPinned,
    isDragging,
    isActive,
    closeTab,
  } = props;
  const { label, icon, id, url } = tab;
  const TabIcon = icons[icon];
  const CloseIcon = icons.CloseIcon;

  const handleMouseEnter = () => {
    const t = isOverflow ? 200 : 1000;
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, t);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current && clearTimeout(hoverTimeoutRef.current);
    setIsHovered(false);
  };

  const handleCloseBtn = () => {
    setIsClosing(true);
    setTimeout(() => closeTab(), 500);
  };

  const handleCtxMenu = (ev: MouseEvent) => {
    ev.preventDefault();
    ctxMenuRef.current?.openCtxMenu(ev);
  };

  const renderContent = (
    <Link to={url} style={{ color: 'inherit', textDecoration: 'none' }}>
      <Stack
        data-tab-id={id}
        sx={getContainerSx({ isOverflow, isDragging, isClosing, isActive })}
        onContextMenu={handleCtxMenu}
      >
        <Divider
          orientation='vertical'
          sx={getDividerSx({ isOverflow, showDivider })}
        />

        <TabIcon style={{ flexShrink: 0 }} />

        <Box
          component='span'
          sx={getLabelSx({ isPinned, isHovered, isClosing })}
        >
          {label}
        </Box>

        <Box sx={getBtnContainerSx({ isPinned, isHovered, isOverflow })}>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <IconButton
              color='error'
              sx={{
                cursor: isOverflow || isHovered ? 'pointer' : 'grab',
                pointerEvents: isHovered ? 'auto' : 'none',
              }}
              onClick={handleCloseBtn}
            >
              <CloseIcon
                style={{
                  color: isHovered ? '#ee3f3e' : '#aeb6ce33',
                  transition: 'color 0.15s ease-out',
                }}
              />
            </IconButton>
          </div>
        </Box>
      </Stack>
    </Link>
  );

  return isPinned ? (
    <Tooltip title={label} enterDelay={1000}>
      {renderContent}
    </Tooltip>
  ) : (
    renderContent
  );
};
