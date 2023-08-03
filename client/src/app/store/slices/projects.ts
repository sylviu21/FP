import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from '../../types/types';

const initialState = {
  projects: [],
}
const reducers = {
  addProject(state: {projects: Project[]}, { payload }: PayloadAction<Project>) {
    state.projects = [...state.projects, payload];
  },
  setProjects(state: {projects: Project[]}, { payload }: PayloadAction<Project[]>) {
    state.projects = payload;
  },
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers,
});

export const {
  addProject,
  setProjects,
} = projectsSlice.actions;

export const projects = projectsSlice.reducer;
