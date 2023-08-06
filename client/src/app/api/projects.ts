import { Project, Task } from "../types/types";

const BASE_URL = "http://localhost:3001/api";

export async function getAllProjects(): Promise<Project[]> {
    const response = await fetch(`${BASE_URL}/projects`);
    return response.json();
}

export async function getPageProjects(page: number): Promise<{projects: Project[], isLastPage: boolean}> {
    const response = await fetch(`${BASE_URL}/projects/${page}`);
    return response.json();
}


export async function getAllTasks(): Promise<Task[]> {
    const response = await fetch(`${BASE_URL}/projects/tasks`);
    return response.json();
}

export async function getTasksByProject(projectId: number): Promise<Task[]> {
    const response = await fetch(`${BASE_URL}/projects/${projectId}/tasks`);
    return response.json();
}
