import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './reducers'; // Your combined reducers

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { loadState, saveState } from '../../../utils/storage';

const preloadedState = loadState();

const persistConfig = {
  key: 'root',
  storage,
  // Only persist these reducers:
  whitelist: ['user', 'themeSetting', 'sidebarSlice', 'jobs'],
  preloadedState
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore redux-persist actions
      },
    }),
});

// Subscribe to store changes
store.subscribe(() => {
  saveState(store.getState());
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Typed useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;