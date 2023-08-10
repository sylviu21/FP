export interface Project {
  id?: number;
  name: string;
  dateAdded: string;
  description?: string;
  client: string;
  deadline: string;
  timeSpent?: number;
  isComplete?: boolean;
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
  selectedProjectId: number;
}
