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
  editTask(state: {tasks: Task[]}, { payload }: PayloadAction<Task>) {
    state.tasks = state.tasks.map((task) => {
      if (task.id === payload.id) {
        return payload;
      }
      return task;
    });
  },
  removeTask(state: {tasks: Task[]}, { payload }: PayloadAction<number>) {
    state.tasks = state.tasks.filter((task) => task.id !== payload);
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers,
});

export const {
  addTask,
  setTasks,
  editTask,
  removeTask,
} = tasksSlice.actions;

export const tasks = tasksSlice.reducer;
