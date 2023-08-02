import React, { FC, Fragment, useState, useEffect } from 'react';
import TasksTable from './TasksTable';
import { Project, Task } from '../types/types';
// import { getTasksByProject } from '../api/projects';

interface IProjectsTableProps {
  projects: Project[];
}

const mockTasks: Task[] = [
  {
    id: 1,
    name: 'Task 1',
    description: 'Task 1 description',
    dateAdded: new Date(),
    timeSpent: '2h 30m',
  },
  {
    id: 2,
    name: 'Task 2',
    description: 'Task 2 description',
    dateAdded: new Date(),
    timeSpent: '2h',
  },
];

const ProjectsTable: FC<IProjectsTableProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [showTasks, setShowTasks] = useState<Boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowTasks(!showTasks);
  };

  const fetchTasks = async () => {
    if (selectedProject) {
      // const tasksData = await getTasksByProject(selectedProject.id);
      // setTasks(tasksData);
      setTasks(mockTasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedProject]);

  return (
    <div className='sm:px-6 w-full'>
      <table className='table-auto w-full'>
        <tbody>
          {projects.map((project) => (
            <Fragment key={project.id}>
              <tr>
                <td className=''>
                  <div
                    className='border-2 border-yellow-100 px-5 py-4 rounded bg-green-100 mb-5'
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className='flex space-x-2 mb-5'>
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
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        6 h 30 mins
                      </div>
                      <div>Due {project.deadline}</div>
                    </div>
                    <div className='flex'>
                      <div className='w-2/12 h-2 bg-green-400 rounded-l-2xl'></div>
                      <div className='w-7/12 h-2 bg-purple-500'></div>
                      <div className='w-3/5 h-2 bg-yellow-400 rounded-r-2xl'></div>
                    </div>

                    {showTasks && selectedProject?.id === project.id
                      ? selectedProject && (
                          <TasksTable tasks={tasks} />
                        )
                      : null}
                  </div>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ProjectsTable;
