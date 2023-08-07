import React, { FC, Fragment } from 'react';

import TasksTable from './TasksTable';
import { Project } from 'app/types/types';
import { formatTimeSpent } from 'app/utils';
import { useAppDispatch } from 'app/custom-hooks';
import { setSelectedProjectDetails } from 'app/store/slices';

interface IProjectsRowProps {
  project: Project;
  loadingTasks: Boolean;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

const ProjectsRow: FC<IProjectsRowProps> = ({
  project,
  loadingTasks,
  selectedProject,
  setSelectedProject,
}) => {
  console.log('====================================');
  console.log(project);
  console.log('====================================');
  const dispatch = useAppDispatch();
  const targetDate = new Date(
    project.deadline.split('/').reverse().join('-')
  );
  const currentDate = new Date();

  const isPastDeadline = targetDate < currentDate;
  const deadlineText = isPastDeadline ? 'Ended' : 'Due';

  const handleProjectClick = (project: Project) => {
    if (selectedProject?.id !== project.id) {
      setSelectedProject(project);
      dispatch(
        setSelectedProjectDetails({
          id: project.id!,
          timeSpent: project.timeSpent!,
        })
      );
    } else {
      setSelectedProject(null);
    }
  };

  return (
    <Fragment key={project.id}>
      <tr>
        <td className=''>
          <div className='border-2 border-yellow-100 px-5 py-4 rounded bg-green-100 mb-5'>
            <div className='flex space-x-2 mb-5 hover:cursor-pointer justify-between'>
              <div className='flex items-left'>
                <div
                  className='font-semibold text-2xl'
                  onClick={() => handleProjectClick(project)}
                >
                  {project.name}
                </div>
                <div className='font-semibold text-gray-500 '>
                  {project.client}
                </div>
              </div>

              <div className='flex justify-end'>
                <div
                  className={`flex font-semibold text-gray-600${
                    isPastDeadline ? ' text-red-500' : ''
                  }`}
                >
                  {`${deadlineText}: ${
                    new Date(project.deadline)
                      .toISOString()
                      .split('T')[0]
                  }`}
                </div>
              </div>
            </div>
            <div className='flex justify-between mb-3'>
              <div className='flex font-semibold text-gray-600'>
                {project.timeSpent && project.timeSpent > 0 && (
                  <>
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
                    {formatTimeSpent(project.timeSpent)}
                  </>
                )}
              </div>
            </div>
            {project.timeSpent ? (
              <div className='flex'>
                <div className='w-2/12 h-2 bg-green-400 rounded-l-2xl'></div>
                <div className='w-7/12 h-2 bg-purple-500'></div>
                <div className='w-3/5 h-2 bg-yellow-400 rounded-r-2xl'></div>
              </div>
            ) : null}

            {selectedProject?.id === project.id ? (
              loadingTasks ? (
                <div className='text-center font-semibold text-gray-600 py-4'>
                  Loading tasks...
                </div>
              ) : (
                <TasksTable />
              )
            ) : null}
          </div>
        </td>
      </tr>
    </Fragment>
  );
};
export default ProjectsRow;
