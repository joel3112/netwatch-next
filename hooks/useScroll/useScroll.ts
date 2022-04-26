import { UIEvent, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { actions, ScrollToState } from '@/redux/modules/scrollTo';
import { useRedux } from '@/hooks/useRedux';

export type UseScroll = {
  scrollPosition: number;
  forceTop: boolean;
  onScroll: (event: UIEvent<HTMLDivElement>) => void;
  onResetScroll: () => void;
};

export type UseScrollHook = (container: HTMLDivElement) => UseScroll;

export const useScroll: UseScrollHook = (container) => {
  const { events } = useRouter() || { events: {} };
  const { state, dispatch } = useRedux('scrollTo');
  const { scrollPosition, forceTop } = state as ScrollToState;

  const handleReset = useCallback(() => dispatch(actions.reset(container)), [container, dispatch]);

  useEffect(() => {
    events.on('routeChangeComplete', () => {
      if (container) {
        handleReset();
      }
    });
  }, [container, events, handleReset]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    dispatch(actions.scroll(container, e.currentTarget.scrollTop));
  };

  return { scrollPosition, forceTop, onScroll: handleScroll, onResetScroll: handleReset };
};
