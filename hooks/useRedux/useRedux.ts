import { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduceSelector, ReduceSelectors, ReduceSelectorState } from '@/redux/modules';

export type UseRedux = {
  state: ReduceSelectorState;
  dispatch: Dispatch<{ type: unknown }>;
};

export const useRedux = (selector?: ReduceSelector): UseRedux => {
  const state = useSelector((storeState) => storeState) as ReduceSelectors;
  const dispatch = useDispatch();

  return {
    state: selector ? (state[selector] as ReduceSelectorState) : state,
    dispatch
  };
};
