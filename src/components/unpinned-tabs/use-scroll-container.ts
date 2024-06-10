import { useEffect, useRef } from 'react';

export const useScrollContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const horizontalScrolling = (ev: WheelEvent) => {
      if (ev.deltaY === 0) return;
      ev.preventDefault();
      container.scrollLeft += ev.deltaY * 0.15;
    };

    container.addEventListener('wheel', horizontalScrolling);

    return () => container.removeEventListener('wheel', horizontalScrolling);
  }, [containerRef]);

  return containerRef;
};
