import React, { FC, Fragment, useState, useEffect } from 'react';
import TasksTable from './TasksTable';
import { Project, Task } from '../types/types';
import { getAllTasks } from '../api/projects';
// import { getTasksByProject } from '../api/projects';

interface IProjectsTableProps {
  projectsData: Project[];
}

const ProjectsTable: FC<IProjectsTableProps> = ({ projectsData }) => {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>('latest');
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [loadingTasks, setLoadingTasks] = useState<Boolean>(false);

  useEffect(() => {
    setProjects(projectsData);
  }, [projectsData]);

  const handleProjectClick = (project: Project) => {
    // toggle Project selected
    if (selectedProject?.id !== project.id) {
      setSelectedProject(project);
    } else {
      setSelectedProject(null);
    }
  };

  const fetchTasks = async (): Promise<void> => {
    if (selectedProject) {
      setLoadingTasks(true);
      try {
        const tasksData = await getAllTasks();
        setTasks(tasksData);
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
          {projects.map((project) => {
            const targetDate = new Date(
              project.deadline.split('/').reverse().join('-')
            );
            const currentDate = new Date();

            const isPastDeadline = targetDate < currentDate;
            const deadlineText = isPastDeadline ? 'Ended' : 'Due';
            return (
              <Fragment key={project.id}>
                <tr>
                  <td className=''>
                    <div className='border-2 border-yellow-100 px-5 py-4 rounded bg-green-100 mb-5'>
                      <div
                        className='flex space-x-2 mb-5 hover:cursor-pointer'
                        onClick={() => handleProjectClick(project)}
                      >
                        <div className='font-semibold text-2xl'>
                          {project.name}
                        </div>
                        <div className='font-semibold text-gray-500 '>
                          {project.client}
                        </div>
                      </div>
                      <div className='flex justify-between mb-3'>
                        <div className='flex font-semibold text-gray-600'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6 mr-2'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                          </svg>
                          6 h 30 mins
                        </div>
                        <div
                          className={`flex font-semibold text-gray-600${
                            isPastDeadline ? ' text-red-500' : ''
                          }`}
                        >
                          {`${deadlineText}: ${project.deadline}`}
                        </div>
                      </div>
                      <div className='flex'>
                        <div className='w-2/12 h-2 bg-green-400 rounded-l-2xl'></div>
                        <div className='w-7/12 h-2 bg-purple-500'></div>
                        <div className='w-3/5 h-2 bg-yellow-400 rounded-r-2xl'></div>
                      </div>

                      {selectedProject?.id === project.id ? (
                        loadingTasks ? (
                          <div className='text-center font-semibold text-gray-600 py-4'>
                            Loading tasks...
                          </div>
                        ) : (
                          <TasksTable tasksData={tasks} />
                        )
                      ) : null}
                    </div>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ProjectsTable;
