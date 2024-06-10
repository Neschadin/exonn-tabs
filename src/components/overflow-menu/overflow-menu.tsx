import { TransitionGroup } from 'react-transition-group';
import { useOverflowMenu } from './use-overflow-menu';
import { Tab } from '../tab/tab';
import {
  Button,
  Box,
  SxProps,
  Divider,
  List,
  Paper,
  ListItemButton,
  Collapse,
  Popper,
  Grow,
} from '@mui/material';

import BtnArrowIcon from '../../assets/icons/btn-arrow-icon.svg?react';

type TProps = {
  pathname: string;
  trackingTabs: TTabItem[];
  stopObserving: boolean;
  removeTab: (id: string, type: 'pinnedTabs' | 'unpinnedTabs') => void;
  handlePinTab: (id: string) => (action: 'pin' | 'unpin') => void;
};

const btnSx: SxProps = {
  '& .MuiButton-icon': { m: 0 },
  height: '100%',
  minWidth: 0,
  borderRadius: 0,
  p: 0,
  transition: 'width 0.15s ease-in',
  overflow: 'hidden',
};

const OverflowMenu = (props: TProps) => {
  const { pathname, trackingTabs, stopObserving, removeTab, handlePinTab } =
    props;

  const { overflowTabs, anchorEl, containerRef, openMenu, closeTab } =
    useOverflowMenu(trackingTabs, stopObserving, removeTab);

  const renderBtn = (
    <Button
      variant='contained'
      disableElevation
      onClick={openMenu}
      sx={{
        width: overflowTabs.length > 0 ? '36px' : 0,
        ...btnSx,
      }}
      endIcon={
        <BtnArrowIcon
          style={{
            transform: anchorEl ? 'none' : 'rotate(180deg)',
            transition: 'transform 0.3s ease-in-out',
          }}
        />
      }
    />
  );

  return (
    <Box ref={containerRef} ml='auto' height='100%'>
      {renderBtn}

      <Popper
        open={!!anchorEl}
        anchorEl={anchorEl}
        placement='bottom-end'
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'right top' }}>
            <Paper
              sx={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                overflow: 'hidden',
                color: 'inherit',
              }}
            >
              <List>
                <TransitionGroup>
                  {overflowTabs.map((tab, i) => (
                    <Collapse key={tab.id}>
                      <ListItemButton>
                        <Tab
                          tab={tab}
                          showDivider={overflowTabs.length !== i + 1}
                          isActive={tab.url === pathname}
                          isDragging={false}
                          isOverflow
                          closeTab={() => closeTab(tab.id)}
                          handlePinTab={handlePinTab(tab.id)}
                        />
                      </ListItemButton>

                      {overflowTabs.length !== i + 1 && (
                        <Divider sx={{ width: '85%', mx: 'auto' }} />
                      )}
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export { OverflowMenu };
