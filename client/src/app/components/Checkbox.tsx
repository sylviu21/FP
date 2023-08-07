import React from 'react';
import { Task } from 'app/types/types';

interface CheckboxProps {
  task: Task;
  onCheckboxChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  task,
  onCheckboxChange,
}) => {
  return (
    <div className='ml-5'>
      <div className='bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative '>
        <input
          placeholder='checkbox'
          type='checkbox'
          className='focus:opacity-100 checkbox absolute cursor-pointer w-full h-full'
          checked={task.status === 'Done'}
          onChange={onCheckboxChange}
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
            <path stroke='none' d='M0 0h24v24H0z'></path>
            <path d='M5 12l5 5l10 -10'></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
