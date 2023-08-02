import { Project, Task } from "../types/types";

const BASE_URL = "http://localhost:3001/api";

export async function getAll(): Promise<Project[]> {
    const response = await fetch(`${BASE_URL}/projects`);
    return response.json();
}

export async function getTasksByProject(projectId: number): Promise<Task[]> {
    const response = await fetch(`${BASE_URL}/projects/${projectId}/tasks`);
    return response.json();
}
