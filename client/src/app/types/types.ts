export interface Project {
  id?: number;
  name: string;
  dateAdded: string;
  description?: string;
  client: string;
  deadline: string;
  timeSpent?: number;
}

export interface Task {
  id: number;
  status: string;
  name: string;
  description?: string;
  dateAdded: string;
  timeSpent?: string;
  projectId: number;
}

export enum TASK_STATUS_TYPE {
  DONE = 'Done',
  INPROGRESS = 'In Progress',
  PENDING = 'Pending',
}

export type Config = {
  projectOpen: boolean;
  selectedSortOption: string;
  selectedProject: { id: number; timeSpent: number };
}
