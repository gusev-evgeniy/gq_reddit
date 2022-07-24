import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';
import { HYDRATE } from 'next-redux-wrapper';
import { MeQuery } from '../../generated/graphql';

const initialState = {
  data: null as MeQuery['me'] | null,
  loaded: false,
};

type State = typeof initialState;

export const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<State['data']>) => {
      state.data = action.payload;
    },
    updateMe: (state, action: PayloadAction<Partial<State['data']>>) => {
      state = {...state, ...action.payload };
    }
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
