export interface Project {
  id: string;
  name: string;
  dateAdded: string;
  description?: string;
  client: string;
  deadline: string;
}

export interface Task {
  id: string;
  status: string;
  name: string;
  description?: string;
  dateAdded: string;
  timeSpent?: string;
}

export enum TASK_STATUS_TYPE {
  DONE = 'Done',
  INPROGRESS = 'In Progress',
  PENDING = 'Pending',
}
