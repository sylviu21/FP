import React, { FC } from 'react';
import { useAppSelector } from 'app/custom-hooks';
import { Config } from 'app/types/types';
import useSelectedProject from 'app/custom-hooks/useSelectedProject';

interface ITasksHeaderProps {
  filterTasks: (status: string) => void;
  showSort: () => void;
  handleAddForm: () => void;
  selectedFilter: string;
}

const TasksHeader: FC<ITasksHeaderProps> = ({
  filterTasks,
  showSort,
  handleAddForm,
  selectedFilter,
}) => {
  const { selectedProjectId: projectId } = useAppSelector<Config>(
    (state) => state.config
  );
  const selectedProject = useSelectedProject(projectId);

  return (
    <div className='sm:flex items-center justify-between bg-grey-500 mt-5'>
      <div className='flex'>
        <button onClick={() => filterTasks('All')}>
          <div
            className={`flex  ${
              selectedFilter === 'All'
                ? 'selected'
                : 'py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-white hover:bg-100 '
            }`}
          >
            <span>All</span>
          </div>
        </button>
        {selectedFilter === 'All' && showSort()}
        <button
          className='ml-4 sm:ml-8'
          onClick={() => filterTasks('Done')}
        >
          <div
            className={`flex  ${
              selectedFilter === 'Done'
                ? 'selected'
                : 'py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-green-200 hover:bg-100 '
            }`}
          >
            <p>Done</p>
          </div>
        </button>
        {selectedFilter === 'Done' && showSort()}

        <button
          className='ml-4 sm:ml-8'
          onClick={() => filterTasks('In Progress')}
        >
          <div
            className={`flex  ${
              selectedFilter === 'In Progress'
                ? 'selected'
                : 'py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-200 hover:bg-100 '
            }`}
          >
            <p>In Progress</p>
          </div>
        </button>
        {selectedFilter === 'In Progress' && showSort()}

        <button
          className='ml-4 sm:ml-8'
          onClick={() => filterTasks('Pending')}
        >
          <div
            className={`flex  ${
              selectedFilter === 'Pending'
                ? 'selected'
                : 'py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-yellow-100 hover:bg-100 '
            } `}
          >
            <p>Pending</p>
          </div>
        </button>
        {selectedFilter === 'Pending' && showSort()}
      </div>
      {selectedProject.isComplete ? (
        <div className='flex justtify-end'>
          <button
            onClick={handleAddForm}
            className='mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded ml-5'
          >
            <p className='text-sm font-medium leading-none text-white'>
              Add Task
            </p>
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default TasksHeader;
