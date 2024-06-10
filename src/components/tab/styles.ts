import { SxProps } from '@mui/material';

export const getContainerSx = ({
  isOverflow,
  isDragging,
  isClosing,
  isActive,
}: {
  isOverflow: boolean | undefined;
  isDragging: boolean;
  isClosing: boolean;
  isActive: boolean;
}): SxProps => ({
  position: 'relative',
  height: '100%',
  gap: '10px',
  alignItems: 'center',
  flexDirection: 'row',
  transition: 'all 0.2s ease-in',
  width: isOverflow ? '196px' : 'fit-content',
  px: isOverflow ? 0 : '20px',
  cursor: isOverflow ? 'pointer' : 'grab',
  color: isDragging ? '#fff' : isActive ? '#343434' : '',
  bgcolor: isDragging ? '#7f858d' : isActive ? '#f1f5f8' : '',
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  borderBottomLeftRadius: isDragging ? 4 : 0,
  borderBottomRightRadius: isDragging ? 4 : 0,
  transform: isClosing
    ? isOverflow
      ? 'translateX(120%)'
      : 'translateY(100%)'
    : 'none',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    bgcolor: !isDragging && !isOverflow && isActive ? '#4690e2' : '',
  },
});

export const getDividerSx = ({
  isOverflow,
  showDivider,
}: {
  isOverflow: boolean | undefined;
  showDivider: boolean;
}): SxProps => ({
  visibility: showDivider && !isOverflow ? 'visible' : 'hidden',
  position: 'absolute',
  height: 16,
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  borderColor: '#f1f5f8',
  zIndex: -1,
});

export const getLabelSx = ({
  isPinned,
  isHovered,
  isClosing,
}: {
  isPinned: boolean | undefined;
  isHovered: boolean;
  isClosing: boolean;
}): SxProps => ({
  display: isPinned ? 'none' : 'inline-block',

  fontWeight: 500,
  fontSize: 14,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: isHovered || isClosing ? 'calc(100% - 34px)' : '100%',
  transition: 'width 0.15s ease-in',
  userSelect: 'none',
});

export const getBtnContainerSx = ({
  isPinned,
  isHovered,
  isOverflow,
}: {
  isPinned: boolean | undefined;
  isHovered: boolean;
  isOverflow: boolean | undefined;
}): SxProps => ({
  position: 'absolute',
  display: isPinned ? 'none' : 'grid',
  placeContent: 'center',
  right: 0,
  width: 34,
  height: '100%',
  opacity: isHovered || isOverflow ? 1 : 0,
  transition: 'opacity 0.2s ease-out',
});
