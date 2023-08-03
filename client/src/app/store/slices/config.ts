import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type Config = {
  projectOpen: boolean;
}
const initialState: Config = {
  projectOpen: false,
};

const reducers = {
  toggleProjectOpen(state: Config, { payload }: PayloadAction<boolean>) {
    state.projectOpen = payload;
  },
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers,
});

export const {
  toggleProjectOpen,
} = configSlice.actions;

export const config = configSlice.reducer;
