import { combineReducers } from 'redux';
import userReducer, { UserState } from './userReducer';
import themeSettingSlice from '../themeSettingSlice';
import sidebarSlice from '../sidebarSlice';
import jobReducer from './jobReducer';

// The top-level state object
export interface RootState {
  user: UserState;
  // Add other state slices here
}

const rootReducer = combineReducers<any>({
  user: userReducer,
  themeSetting: themeSettingSlice,
  sidebarSlice: sidebarSlice,
  jobs: jobReducer,
  // Add other reducers here
});

export default rootReducer;