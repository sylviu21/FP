import React, { ChangeEvent, FC } from 'react';
import { Task } from 'app/types/types';

interface FormTaskValues extends Omit<Task, 'id' | 'dateAdded'> {
  name: string;
  description?: string;
  status: string;
  projectId: number;
  timeSpent?: string;
}

const TimeSpentField: FC<{
  formData: FormTaskValues;
  errors: Partial<Record<keyof FormTaskValues, string>>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ formData, errors, handleChange }) => {
  return (
    <div className='mb-4'>
      <label
        className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor='timeSpent'
      >
        Time Spent
      </label>
      <input
        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
        type='text'
        id='timeSpent'
        name='timeSpent'
        value={formData.timeSpent || ''}
        onChange={handleChange}
      />
      {errors.timeSpent && (
        <div className='text-red-600'>{errors.timeSpent}</div>
      )}
    </div>
  );
};
export default TimeSpentField;
