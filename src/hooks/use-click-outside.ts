import { MutableRefObject, useEffect } from 'react';

export const useClickOutside = (
  ref: MutableRefObject<HTMLDivElement | null>,
  onClickOut: () => void,
  isMounted: boolean
) => {
  useEffect(() => {
    if (!ref || !isMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOut();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('contextmenu', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('contextmenu', handleClickOutside);
    };
  }, [ref, isMounted]);
};
