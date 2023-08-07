import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Config } from 'app/types/types';

const initialState: Config = {
  projectOpen: false,
  selectedSortOption: 'latest',
  selectedProject: { id: 0, timeSpent: 0 },
};

const reducers = {
  toggleProjectOpen(state: Config, { payload }: PayloadAction<boolean>) {
    state.projectOpen = payload;
  },
  setSelectedSortOption: (state: Config, { payload }: PayloadAction<string>) => {
    state.selectedSortOption = payload;
  },
  setSelectedProjectDetails: (state: Config, { payload }: PayloadAction<{ id: number; timeSpent: number }>) => {
    state.selectedProject = payload;
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
  setSelectedProjectDetails,
} = configSlice.actions;

export const config = configSlice.reducer;
