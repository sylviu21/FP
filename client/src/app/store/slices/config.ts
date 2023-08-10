import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Config } from 'app/types/types';

const initialState: Config = {
  projectOpen: false,
  selectedSortOption: 'latest',
  selectedProjectId: 0,
};

const reducers = {
  toggleProjectOpen(state: Config, { payload }: PayloadAction<boolean>) {
    state.projectOpen = payload;
  },
  setSelectedSortOption: (state: Config, { payload }: PayloadAction<string>) => {
    state.selectedSortOption = payload;
  },
  setSelectedProjectId: (state: Config, { payload }: PayloadAction<number>) => {
    state.selectedProjectId = payload;
  },
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers,
});

export const {
  toggleProjectOpen,
  setSelectedSortOption,
  setSelectedProjectId,
} = configSlice.actions;

export const config = configSlice.reducer;
