import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import {
  addTask,
  editTask,
  updateProjectTimeSpent,
} from 'app/store/slices';
import { Config, Task } from 'app/types/types';
import { useAppDispatch, useAppSelector } from 'app/custom-hooks';
import { randomId } from 'app/utils/randomId';
import { convertToMinutes } from 'app/utils';

interface AddEditTaskFormProps {
  onSubmit: () => void;
  task?: Task;
}

interface FormTaskValues
  extends Omit<Task, 'id' | 'dateAdded' | 'dateAdded'> {
  name: string;
  description?: string;
  status: string;
  projectId: number;
}

const AddEditTaskForm: FC<AddEditTaskFormProps> = ({
  onSubmit,
  task,
}) => {
  const { selectedProject } = useAppSelector<Config>(
    (state) => state.config
  );
  const { id: projectId, timeSpent } = selectedProject;
  const [formData, setFormData] = useState<FormTaskValues | Task>(
    task
      ? { ...task }
      : {
          name: '',
          description: '',
          status: 'Pending',
          projectId: projectId,
        }
  );
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
    } else if (formData.status === 'Done' && !isTimeSpentValid()) {
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const newTask: Task = {
      id: randomId(),
      dateAdded: new Date().toISOString(),
      ...formData,
    };

    const updatedTask: Task | null = task
      ? {
          id: task.id,
          dateAdded: new Date().toISOString(),
          ...formData,
        }
      : null;

    onSubmit();

    task
      ? dispatch(editTask(updatedTask as Task))
      : dispatch(addTask(newTask));
    const time = isNaN(Number(timeSpent)) ? 0 : timeSpent;
    formData.timeSpent &&
      dispatch(
        updateProjectTimeSpent({
          projectId,
          timeSpent: convertToMinutes(formData.timeSpent) + time,
        })
      );

    setFormData({
      name: '',
      description: '',
      status: '',
      timeSpent: undefined,
      projectId: projectId,
    });
  };

  const handleTimeSpentChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      timeSpent: '',
    }));

    const { value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeSpent: value,
    }));
  };

  const isTimeSpentValid = (): boolean => {
    const timePattern = /^\s*(?:(\d+)h)?\s*(?:(\d+)m)?\s*$/;

    if (!formData.timeSpent) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        timeSpent: 'Time spent is required.',
      }));
      return false;
    }

    const matches = formData.timeSpent.match(timePattern);
    if (!matches) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        timeSpent: 'Invalid time format. Use "2h 30m" format.',
      }));
      return false;
    }

    const hours = parseInt(matches[1], 10) || 0;
    const minutes = parseInt(matches[2], 10) || 0;
    if (
      hours < 0 ||
      minutes < 0 ||
      minutes > 45 ||
      (hours === 0 && minutes < 30) ||
      minutes % 15 !== 0
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        timeSpent:
          'Invalid time value. Minimum 30 minutes with 15 minute increments.',
      }));
      return false;
    }

    return true;
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

      {formData.status === 'Done' ? (
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
            onChange={handleTimeSpentChange}
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

export default AddEditTaskForm;
