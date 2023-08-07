import { BASE_URL } from "app/utils";
import { Project } from "../types/types";

export async function getAllProjects(): Promise<Project[]> {
    const response = await fetch(`${BASE_URL}/projects`);
    return response.json();
}

// export async function getProject(productId: number): Promise<Project> {
//     const response = await fetch(`${BASE_URL}/projects?productId=${productId}`);
//     return response.json();
// }

export async function getPageProjects(page: number): Promise<{projects: Project[], isLastPage: boolean}> {
    const response = await fetch(`${BASE_URL}/projects/page/${page}`);
    return response.json();
}

export async function searchProject(searchInput: string): Promise<Project[]> {
    const response = await fetch(`${BASE_URL}/projects/search/${searchInput}`);
    return response.json();
}