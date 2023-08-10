import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project } from 'app/types/types';

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
  updateProject(state: {projects: Project[]}, { payload }: PayloadAction<Project>) {
    state.projects = state.projects.map((project) => {
      if (project.id === payload.id) {
        return payload;
      }
      return project;
    });
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
  updateProject,
  updateProjectTimeSpent,
} = projectsSlice.actions;

export const projects = projectsSlice.reducer;
