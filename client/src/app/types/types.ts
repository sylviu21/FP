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
  id: string;
  title: string;
  description: string;
  dateAdded: Date;
  timeSpent: number;
}