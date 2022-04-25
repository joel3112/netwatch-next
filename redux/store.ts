import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer, { onChangeState } from '@/redux/modules';
import { actions as themeActions, Theme } from '@/redux/modules/theme';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
  const storeState = store.getState();

  // scrollTo module
  onChangeState.scrollTo(storeState);
  // theme module
  onChangeState.theme(storeState);
});

if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
    const storeState = store.getState();

    if (storeState.theme.keyMode === Theme.AUTO) {
      store.dispatch(themeActions.change(Theme.AUTO, matches));
    }
  });
}

export default store;
