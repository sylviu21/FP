import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { nanoid } from 'nanoid';
import { addTask } from 'app/store/slices';
import { Task } from 'app/types/types';
import { useAppDispatch } from 'app/custom-hooks';

interface AddTaskFormProps {
  onSubmit: () => void;
}

interface FormTaskValues
  extends Omit<Task, 'id' | 'dateAdded' | 'dateAdded'> {
  name: string;
  description?: string;
  status: string;
}

const AddTaskForm: FC<AddTaskFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormTaskValues>({
    name: '',
    description: '',
    status: 'Pending',
    timeSpent: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormTaskValues, string>>
  >({});
  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setErrors({});
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isFormValid = (): boolean => {
    const newErrors: Partial<Record<keyof FormTaskValues, string>> =
      {};

    if (!formData.name) {
      newErrors.name = 'Task name is required.';
    }

    if (formData.status === 'Done' && !formData.timeSpent) {
      newErrors.timeSpent = 'Add time spent on task.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      dateAdded: new Date().toDateString(),
      ...formData,
    };

    console.log(onsubmit);
    onSubmit();

    dispatch(addTask(newTask));

    setFormData({
      name: '',
      description: '',
      status: '',
      timeSpent: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='name'
        >
          Task Name
        </label>
        <input
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <div className='text-red-600'>{errors.name}</div>
        )}
      </div>

      {/* Add the missing form inputs */}
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
          id='description'
          name='description'
          value={formData.description}
          rows={2}
          onChange={handleChange}
        />
        {errors.description && (
          <div className='text-red-600'>{errors.description}</div>
        )}
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='status'
        >
          Status
        </label>
        <select
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
          id='status'
          name='status'
          value={formData.status}
          onChange={handleChange}
        >
          <option value='Pending'>Pending</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>
        {errors.status && (
          <div className='text-red-600'>{errors.status}</div>
        )}
      </div>

      {formData.status !== 'Pending' ? (
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
            value={formData.timeSpent}
            onChange={handleChange}
          />
          {errors.timeSpent && (
            <div className='text-red-600'>{errors.timeSpent}</div>
          )}
        </div>
      ) : null}
      <button
        className='w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300'
        type='submit'
      >
        Submit
      </button>
    </form>
  );
};

export default AddTaskForm;
