import { Task } from "app/types/types";
import { convertToMinutes } from "./formatTimeSpent";

export const calculateProjectTimeSpent = (tasks: Task[]): number => {
  const totalTimeSpent = tasks.reduce((total, task: Task) => total + convertToMinutes(task.timeSpent!), 0);
  return totalTimeSpent;
};
