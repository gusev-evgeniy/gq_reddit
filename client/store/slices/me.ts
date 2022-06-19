import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { MeQuery } from '../../generated/graphql';

const initialState = {
  data: null as MeQuery['me'] | null,
  loaded: false,
};

export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<MeQuery['me'] | null>) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setMe } = meSlice.actions;

export const selectMe = (state: AppState) => state.me;

export const meReducer = meSlice.reducer;
