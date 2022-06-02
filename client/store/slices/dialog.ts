import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../store';
import { DialogType } from '../../types/dialog';

export interface DialogState {
  data: DialogType | null;
}

const initialState: DialogState = {
  data: null,
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<DialogState['data']>) => {
      state.data = action.payload;
    },
  }
});

export const { setDialog } = dialogSlice.actions;

export const selectDialog = (state: AppState) => state.dialog.data;

export const dialogReducer = dialogSlice.reducer;
