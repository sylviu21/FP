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
  updateProjectTimeSpent(state: { projects: Project[] }, { payload }: PayloadAction<{ projectId: number; timeSpent: number }>) {
    const { projectId, timeSpent } = payload;
    state.projects = state.projects.map((project) => {
      if (project.id === projectId) {
        return {
          ...project,
          timeSpent,
        };
      }
      return project;
    });
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
  updateProjectTimeSpent,
} = projectsSlice.actions;

export const projects = projectsSlice.reducer;
