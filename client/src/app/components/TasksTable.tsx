import React, { FC } from 'react';
import { Task } from '../types/types';

interface ITasksTableProps {
  tasks: Task[];
}
const TasksTable: FC<ITasksTableProps> = ({ tasks }) => {
  const dropdownFunction = () => {
    console.log('Dropdown function called');
  };

  return (
    <>
      <div className='sm:flex items-center justify-between bg-grey-500 mt-5'>
        <div className='flex'>
          <a
            className='focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800'
            href=' javascript:void(0)'
          >
            <div className='py-2 px-8 bg-white text-indigo-700'>
              <p>All</p>
            </div>
          </a>
          <a
            className='focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8'
            href='javascript:void(0)'
          >
            <div className='py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 '>
              <p>Done</p>
            </div>
          </a>
          <a
            className='focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8'
            href='javascript:void(0)'
          >
            <div className='py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 '>
              <p>In Progress</p>
            </div>
          </a>
          <a
            className='focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8'
            href='javascript:void(0)'
          >
            <div className='py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 '>
              <p>Pending</p>
            </div>
          </a>
        </div>
        <button
          // onClick={() => popuphandler(true)}
          className='focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded'
        >
          <p className='text-sm font-medium leading-none text-white'>
            Add Task
          </p>
        </button>
      </div>
      <table className='table-fixed w-full bg-white'>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td className='p-5'>
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
                                  stroke-width='1.5'
                                  stroke='currentColor'
                                  fill='none'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
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
                              {task.timeSpent ? task.timeSpent : '0'}
                            </p>
                          </div>
                        </td>

                        <td width='100' className='pl-4'>
                          <div className='flex justify-end'>
                            <button className='focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none'>
                              View
                            </button>
                          </div>
                        </td>
                        <td width='100'>
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
                                  stroke-width='1.25'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                ></path>
                                <path
                                  d='M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z'
                                  stroke='#9CA3AF'
                                  stroke-width='1.25'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
                                ></path>
                                <path
                                  d='M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z'
                                  stroke='#9CA3AF'
                                  stroke-width='1.25'
                                  stroke-linecap='round'
                                  stroke-linejoin='round'
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
    </>
  );
};
export default TasksTable;
