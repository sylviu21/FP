import React, { FC, useState, useEffect } from 'react';
import { Project } from '../types/types';
import { getAllTasks } from '../api/projects';
import { useAppDispatch } from 'app/custom-hooks';
import { setTasks } from 'app/store/slices';
import ProjectsRow from './ProjectsRow';
// import { getTasksByProject } from '../api/projects';

interface IProjectsTableProps {
  projectsData: Project[];
}

const ProjectsTable: FC<IProjectsTableProps> = ({ projectsData }) => {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>('latest');
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [loadingTasks, setLoadingTasks] = useState<Boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setProjects(projectsData);
  }, [projectsData]);

  const fetchTasks = async (): Promise<void> => {
    if (selectedProject) {
      setLoadingTasks(true);
      try {
        const tasksData = await getAllTasks();
        dispatch(setTasks(tasksData));
        setLoadingTasks(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedProject]);

  const handleSortChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedSortOption(event.target.value);

    const sortedProjects = [...projectsData];
    if (event.target.value === 'latest') {
      sortedProjects.sort((a, b) =>
        new Date(b.deadline).getTime() -
        new Date(a.deadline).getTime()
          ? -1
          : 1
      );
    } else if (event.target.value === 'oldest') {
      sortedProjects.sort((a, b) =>
        new Date(b.deadline).getTime() -
        new Date(a.deadline).getTime()
          ? 1
          : -1
      );
    }
    setProjects(sortedProjects);
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProjectsTable;
