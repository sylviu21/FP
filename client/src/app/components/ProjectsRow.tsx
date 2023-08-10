import React, { FC, Fragment } from 'react';
import TasksTable from './TasksTable';
import { Project } from 'app/types/types';
import { formatTimeSpent } from 'app/utils';
import { useAppDispatch } from 'app/custom-hooks';
import { setSelectedProjectId } from 'app/store/slices';

interface IProjectsRowProps {
  project: Project;
  loadingTasks: Boolean;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  setIsModalOpen: () => void;
  setEditProject?: (project: Project) => void;
}

const ProjectsRow: FC<IProjectsRowProps> = ({
  project,
  loadingTasks,
  selectedProject,
  setSelectedProject,
  setIsModalOpen,
  setEditProject,
}) => {
  const dispatch = useAppDispatch();
  const targetDate = new Date(
    project.deadline.split('/').reverse().join('-')
  );
  const currentDate = new Date();

  const isPastDeadline = targetDate < currentDate;
  const deadlineText = isPastDeadline ? 'Overdue' : 'Due';

  const toggleProjectDetails = (project: Project) => {
    if (selectedProject?.id !== project.id) {
      setSelectedProject(project);
      dispatch(setSelectedProjectId(project.id!));
    } else {
      setSelectedProject(null);
    }
  };

  const updateProject = () => {
    setIsModalOpen && setIsModalOpen();
    setEditProject && setEditProject(project);
  };
  return (
    <Fragment key={project.id}>
      <tr>
        <td className=''>
          <div
            className={`${'border-2 border-yellow-100 px-5 py-4 rounded mb-5'} ${
              project.isComplete
                ? 'bg-gray-100'
                : isPastDeadline
                ? 'bg-red-100'
                : 'bg-green-100'
            }`}
          >
            <div className='flex space-x-2 mb-5 justify-between'>
              <div className='flex items-left'>
                <div
                  className='hover:cursor-pointer mb-5'
                  onClick={() => toggleProjectDetails(project)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                    ></path>
                  </svg>
                </div>
                <div
                  className='font-semibold text-2xl hover:cursor-pointer'
                  onClick={updateProject}
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
                    project.isComplete
                      ? ' text-green-500'
                      : isPastDeadline
                      ? ' text-red-500'
                      : ' text-grey-500'
                  }`}
                >
                  {project.isComplete
                    ? 'Complete'
                    : `${deadlineText}: ${
                        new Date(project.deadline)
                          .toISOString()
                          .split('T')[0]
                      }`}
                </div>
              </div>
            </div>

            <div className='flex justify-between mb-3'>
              <div className='flex font-semibold text-gray-600'>
                {project.timeSpent && project.timeSpent > 0 ? (
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
                ) : null}
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
