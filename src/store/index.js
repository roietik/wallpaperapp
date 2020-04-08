import { createStore } from 'redux';
import rootReducer from 'reducers';
import { loadState, saveState } from 'store/localStorage';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState, composeWithDevTools());

// const store = createStore(rootReducer, composeWithDevTools());

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
