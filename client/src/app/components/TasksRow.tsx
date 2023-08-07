import React, { FC } from 'react';
import { Task } from 'app/types/types';
import { setStatusLabelColor } from '../utils/statusColor';
import { removeTask } from 'app/store/slices';
import { useAppDispatch } from 'app/custom-hooks';

interface ITasksRowProps {
  task: Task;
  onEditForm?: () => void;
  setEditTask?: (task: Task) => void;
}

const TasksRow: FC<ITasksRowProps> = ({
  task,
  onEditForm,
  setEditTask,
}) => {
  const dispatch = useAppDispatch();
  const deleteTask = () => dispatch(removeTask(task.id));

  const editTask = () => {
    onEditForm && onEditForm();
    setEditTask && setEditTask(task);
  };

  return (
    <>
      <tr key={task.id}>
        <td>
          <div className='overflow-x-auto'>
            <table className='w-full whitespace-nowrap'>
              <tbody>
                <tr className='focus:outline-none h-16 border border-gray-100 rounded'>
                  <td width='100'>
                    <div className='ml-5'>
                      <div className='bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative '>
                        <input
                          placeholder='checkbox'
                          type='checkbox'
                          className='focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full'
                        />
                        <div className='check-icon hidden bg-indigo-700 text-white rounded-sm'>
                          <svg
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
                  <td width='110' className='pl-10'>
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

                  <td width='70' className='px-6 py-4'>
                    <div className='flex justify-end gap-4 h-4'>
                      <button
                        onClick={deleteTask}
                        role='button'
                        aria-label='option'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='h-6 w-6'
                          x-tooltip='tooltip'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                          ></path>
                        </svg>
                      </button>
                      <button
                        onClick={editTask}
                        role='button'
                        aria-label='option'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='h-6 w-6'
                          x-tooltip='tooltip'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </>
  );
};
export default TasksRow;
