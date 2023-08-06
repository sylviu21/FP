import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Config } from 'app/types/types';

const initialState: Config = {
  projectOpen: false,
  selectedSortOption: 'latest'
};

const reducers = {
  toggleProjectOpen(state: Config, { payload }: PayloadAction<boolean>) {
    state.projectOpen = payload;
  },
  setSelectedSortOption: (state: Config, { payload }: PayloadAction<string>) => {
    state.selectedSortOption = payload;
  }
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers,
});

export const {
  toggleProjectOpen,
  setSelectedSortOption
} = configSlice.actions;

export const config = configSlice.reducer;
