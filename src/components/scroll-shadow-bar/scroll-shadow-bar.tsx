import { Box, SxProps } from '@mui/material';
import { useScrollShadowBar } from './use-scroll-shadow-bar';

type TProps = { container: HTMLDivElement | null };

const shadowSx: SxProps = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 40,
  pointerEvents: 'none',
  transition: 'opacity 0.5s',
};

export const ScrollShadowBar = ({ container }: TProps) => {
  const { thumb, isVisible, leftShadow, rightShadow } =
    useScrollShadowBar(container);

  return (
    <>
      <Box
        sx={{
          left: container?.offsetLeft,
          opacity: leftShadow ? 1 : 0,
          background: 'linear-gradient(to right, #fefefe, transparent)',
          ...shadowSx,
        }}
      />

      <Box
        sx={{
          left:
            container && container?.offsetLeft + container?.clientWidth - 40,
          opacity: rightShadow ? 1 : 0,
          background: 'linear-gradient(to left, #fefefe, transparent)',
          ...shadowSx,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          height: 8,
          width: container?.offsetWidth,
          left: container?.offsetLeft,
          bottom: -12,
          bgcolor: '#fff',
          borderRadius: 8,
          placeContent: 'center',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: 4,
            bgcolor: 'rgba(127, 133, 141, 0.4)',
            borderRadius: 4,
            width: thumb.width - 4,
            transform: `translateX(${thumb.left + 2}px)`,
            transition: 'transform 0.1s',
          }}
        />
      </Box>
    </>
  );
};
