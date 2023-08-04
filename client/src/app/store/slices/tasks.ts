import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types/types';

const initialState = {
  tasks: [],
}
const reducers = {
  addTask(state: {tasks: Task[]}, { payload }: PayloadAction<Task>) {
    state.tasks = [...state.tasks, payload];
  },
  setTasks(state: {tasks: Task[]}, { payload }: PayloadAction<Task[]>) {
    state.tasks = payload;
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers,
});

export const {
  addTask,
  setTasks,
} = tasksSlice.actions;

export const tasks = tasksSlice.reducer;
