import { useEffect, useRef, useState } from 'react';

export const useScrollShadowBar = (container: HTMLDivElement | null) => {
  const [thumb, setThumb] = useState({ width: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [leftShadow, setLeftShadow] = useState(false);
  const [rightShadow, setRightShadow] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const updScrollbar = () => {
    const { scrollWidth, clientWidth, scrollLeft } = container!;
    setThumb({
      width: (clientWidth / scrollWidth) * clientWidth,
      left: (scrollLeft / scrollWidth) * clientWidth,
    });
  };

  const updShadows = () => {
    const { scrollLeft, scrollWidth, clientWidth } = container!;
    setLeftShadow(scrollLeft > 0);
    setRightShadow(scrollLeft + clientWidth < scrollWidth);
  };

  const updVisibility = () => {
    const { scrollWidth, clientWidth, scrollLeft } = container!;
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    if (!isVisible && scrollLeft && scrollLeft + clientWidth < scrollWidth) {
      setIsVisible(true);
    }
  };

  const handleScroll = () => {
    updScrollbar();
    updShadows();
    updVisibility();
  };

  useEffect(() => {
    if (!container) return;

    const resizeObserver = new ResizeObserver(
      (entries) => entries[0] && handleScroll()
    );

    updShadows();
    container.addEventListener('scroll', handleScroll);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [container]);

  return { thumb, isVisible, leftShadow, rightShadow };
};
