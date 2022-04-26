import { MutableRefObject, useEffect, useState } from 'react';

export type UseResize = DOMRect;

export type UseResizeHook = (x: MutableRefObject<HTMLElement>) => UseResize;

export const useResize: UseResizeHook = (elementRef: MutableRefObject<HTMLElement>) => {
  const [sizes, setSizes] = useState<DOMRect>({} as DOMRect);
  const container = document.body;

  useEffect(() => {
    function handleResize() {
      if (elementRef && elementRef.current) {
        setSizes(elementRef.current.getBoundingClientRect());
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [container, elementRef]);

  return sizes;
};
