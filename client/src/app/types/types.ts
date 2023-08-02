export interface Project {
  id: number;
  name: string;
  date: string;
  timeSpent: {
    hours: number;
    minutes: number;
  };
  description: string;
  client: string;
  deadline: string;
}

export interface Task {
  id: number;
  status: string;
  name: string;
  description: string;
  dateAdded: Date;
  timeSpent: string | null;
}

export enum TASK_STATUS_TYPE {
  DONE = 'Done',
  INPROGRESS = 'In Progress',
  PENDING = 'Pending',
}
