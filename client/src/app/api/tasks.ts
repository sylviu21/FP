import { Task } from "app/types/types";
import { BASE_URL } from "app/utils";

export async function getAllTasks(): Promise<Task[]> {
    const response = await fetch(`${BASE_URL}/projects/tasks`);
    return response.json();
}

export async function getTasksByProject(projectId: number): Promise<Task[]> {
    const response = await fetch(`${BASE_URL}/projects/${projectId}/tasks`);
    return response.json();
}
