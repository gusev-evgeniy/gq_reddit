import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { commentsReducer } from './slices/comments';
import { dialogReducer } from './slices/dialog';

import { meReducer } from './slices/me';
import { openPostReducer } from './slices/openPost';
import { postsReducer } from './slices/posts';
import { profileReducer } from './slices/profile';

export function makeStore() {
  return configureStore({
    reducer: {
      me: meReducer,
      dialog: dialogReducer,
      posts: postsReducer,
      openPost: openPostReducer,
      comments: commentsReducer,
      profile: profileReducer
    },
  });
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export const wrapper = createWrapper<AppStore>(makeStore);
