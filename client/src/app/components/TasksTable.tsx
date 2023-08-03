import React, { FC, useState } from 'react';
import { Task, TASK_STATUS_TYPE } from '../types/types';
import Pagination from './Pagination';
import { setStatusLabelColor } from '../utils/statusColor';

interface ITasksTableProps {
  tasksData: Task[];
}
const TasksTable: FC<ITasksTableProps> = ({ tasksData }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 4; // Number of tasks to display per page

  const dropdownFunction = () => {
    console.log('Dropdown function called');
  };

  const filterTasks = (status: string) => {
    setSelectedFilter(status);
    let filteredTasks = [...tasksData];
    switch (status) {
      case TASK_STATUS_TYPE.DONE:
        filteredTasks = tasksData.filter(
          (task) => task.status === TASK_STATUS_TYPE.DONE
        );
        break;
      case TASK_STATUS_TYPE.INPROGRESS:
        filteredTasks = tasksData.filter(
          (task) => task.status === TASK_STATUS_TYPE.INPROGRESS
        );
        break;
      case TASK_STATUS_TYPE.PENDING:
        filteredTasks = tasksData.filter(
          (task) => task.status === TASK_STATUS_TYPE.PENDING
        );
        break;
      default:
        filteredTasks = [...tasksData];
        break;
    }
    setTasks(filteredTasks);
    setCurrentPage(1);
  };

  // const getTotalPages = () => {
  //   return Math.ceil(tasks.length / tasksPerPage);
  // };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // const totalPages = getTotalPages();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalFilteredTasks = tasks.length;
  const total = Math.ceil(totalFilteredTasks / tasksPerPage);

  return (
    <>
      <div className='sm:flex items-center justify-between bg-grey-500 mt-5'>
        <div className='flex'>
          <button className='' onClick={() => filterTasks('All')}>
            <div
              className={
                selectedFilter === 'All'
                  ? 'selected'
                  : 'py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-white hover:bg-100 '
              }
            >
              <p>All</p>
            </div>
          </button>
          <button
            className='ml-4 sm:ml-8'
            onClick={() => filterTasks('Done')}
          >
            <div
              className={
                selectedFilter === 'Done'
                  ? 'selected'
                  : 'py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-green-200 '
              }
            >
              <p>Done</p>
            </div>
          </button>
          <button
            className='ml-4 sm:ml-8'
            onClick={() => filterTasks('In Progress')}
          >
            <div
              className={
                selectedFilter === 'In Progress'
                  ? 'selected'
                  : 'py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 '
              }
            >
              <p>In Progress</p>
            </div>
          </button>
          <button
            className='ml-4 sm:ml-8'
            onClick={() => filterTasks('Pending')}
          >
            <div
              className={
                selectedFilter === 'Pending'
                  ? 'selected'
                  : 'py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-yellow-100 '
              }
            >
              <p>Pending</p>
            </div>
          </button>
        </div>
        <button
          // onClick={() => popuphandler(true)}
          className='mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded'
        >
          <p className='text-sm font-medium leading-none text-white'>
            Add Task
          </p>
        </button>
      </div>
      <div className='bg-white p-5'>
        <table className='table-fixed w-full'>
          <tbody>
            {currentTasks.map((task, index) => (
              <tr key={index}>
                <td>
                  <div className='overflow-x-auto'>
                    <table className='w-full whitespace-nowrap'>
                      <tbody>
                        <tr className='focus:outline-none h-16 border border-gray-100 rounded'>
                          <td width='100'>
                            <div className='ml-5'>
                              <div className='bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative'>
                                <input
                                  placeholder='checkbox'
                                  type='checkbox'
                                  className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full'
                                />
                                <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                                  <svg
                                    className='icon icon-tabler icon-tabler-check'
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    strokeWidth='1.5'
                                    stroke='currentColor'
                                    fill='none'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  >
                                    <path
                                      stroke='none'
                                      d='M0 0h24v24H0z'
                                    ></path>
                                    <path d='M5 12l5 5l10 -10'></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='flex items-center pl-5'>
                              <p className='text-base font-medium leading-none text-gray-700 mr-2'>
                                {task.name}
                              </p>
                            </div>
                          </td>
                          <td width='100'>
                            <div className='flex justify-end pl-5'>
                              <p className='text-base font-medium leading-none text-gray-700 mr-2'>
                                {task?.timeSpent}
                              </p>
                            </div>
                          </td>
                          <td width='150' className='pl-10'>
                            <div className='flex space-x-2 md:justify-end md:items-center items-center justify-end'>
                              <p className='text-base leading-4 dark:text-gray-300 text-gray-600 font-normal'>
                                {task.status}
                              </p>
                              <div
                                className={
                                  'w-3 h-3 rounded-full shadow ' +
                                  setStatusLabelColor(task.status)
                                }
                              ></div>
                            </div>
                          </td>
                          <td width='100' className='pl-4'>
                            <div className='flex justify-end'>
                              <button className='focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none'>
                                View
                              </button>
                            </div>
                          </td>
                          <td width='70'>
                            <div className='flex justify-end relative px-5 pt-2'>
                              <button
                                className='focus:ring-2 rounded-md focus:outline-none'
                                onClick={dropdownFunction}
                                role='button'
                                aria-label='option'
                              >
                                <svg
                                  className='dropbtn'
                                  onClick={dropdownFunction}
                                  xmlns='http://www.w3.org/2000/svg'
                                  width='20'
                                  height='20'
                                  viewBox='0 0 20 20'
                                  fill='none'
                                >
                                  <path
                                    d='M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z'
                                    stroke='#9CA3AF'
                                    strokeWidth='1.25'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  ></path>
                                  <path
                                    d='M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z'
                                    stroke='#9CA3AF'
                                    strokeWidth='1.25'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  ></path>
                                  <path
                                    d='M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z'
                                    stroke='#9CA3AF'
                                    strokeWidth='1.25'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  ></path>
                                </svg>
                              </button>
                              <div className='dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden'>
                                <div className='focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white'>
                                  <p>Edit</p>
                                </div>
                                <div className='focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white'>
                                  <p>Delete</p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex full-width justify-end'>
        {total > 1 && (
          <Pagination
            total={total}
            current={currentPage}
            onSelect={handlePageChange}
          />
        )}
      </div>
    </>
  );
};
export default TasksTable;
