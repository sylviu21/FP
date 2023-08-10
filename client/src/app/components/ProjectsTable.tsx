import React, { FC, useState, useEffect } from 'react';
import { Config, Project } from '../types/types';
import { useAppDispatch, useAppSelector } from 'app/custom-hooks';
import {
  setProjects,
  setSelectedSortOption,
  setTasks,
} from 'app/store/slices';
import ProjectsRow from './ProjectsRow';
import { sortArray } from 'app/utils/sortArray';
import { getTasksByProject } from 'app/api/tasks';

interface IProjectsTableProps {
  projectsData: Project[];
  isLoading: boolean;
  isLastPage: boolean;
  error: string;
  handleSubmitProject: () => void;
  setEditProject?: (project: Project) => void;
}

const ProjectsTable: FC<IProjectsTableProps> = ({
  isLoading,
  isLastPage,
  error,
  handleSubmitProject,
  setEditProject,
}) => {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const { selectedSortOption } = useAppSelector<Config>(
    (state) => state.config
  );

  const { projects } = useAppSelector<{ projects: Project[] }>(
    (state) => state.projects
  );

  const [loadingTasks, setLoadingTasks] = useState<Boolean>(false);
  const dispatch = useAppDispatch();

  const fetchTasks = async (projectId: number): Promise<void> => {
    if (selectedProject) {
      setLoadingTasks(true);
      try {
        const tasksData = await getTasksByProject(projectId);
        dispatch(setTasks(tasksData));
        setLoadingTasks(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    selectedProject?.id && fetchTasks(selectedProject.id);
  }, [selectedProject]);

  const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch(setSelectedSortOption(event.target.value));

    const sortedProjects = sortArray(
      event.target.value,
      projects,
      'deadline'
    );

    dispatch(setProjects(sortedProjects));
  };

  return (
    <div className='sm:px-6 w-full'>
      <div className='px-4 md:px-10 py-4 md:py-7'>
        <div className='flex justify-end'>
          <div className='py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded'>
            <p>Sort By:</p>
            <select
              aria-label='select'
              className='focus:text-indigo-600 focus:outline-none bg-transparent ml-1'
              value={selectedSortOption}
              onChange={handleSortChange}
            >
              <option
                value='latest'
                className='text-sm text-indigo-800'
              >
                Latest
              </option>
              <option
                value='oldest'
                className='text-sm text-indigo-800'
              >
                Oldest
              </option>
            </select>
          </div>
        </div>
      </div>
      <table className='table-auto w-full'>
        <tbody>
          {projects.map((project) => (
            <ProjectsRow
              key={project.id}
              project={project}
              loadingTasks={loadingTasks}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              setIsModalOpen={handleSubmitProject}
              setEditProject={setEditProject}
            />
          ))}
        </tbody>
      </table>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {isLastPage && <p>No more projects to display.</p>}
    </div>
  );
};
export default ProjectsTable;
