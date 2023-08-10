import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import {
  addTask,
  updateProjectTimeSpent,
  updateTask,
} from 'app/store/slices';
import { Config, Task } from 'app/types/types';
import { useAppDispatch, useAppSelector } from 'app/custom-hooks';
import { randomId } from 'app/utils/randomId';
import TimeSpentField from 'app/components/TimeSpentField';
import { calculateProjectTimeSpent } from 'app/utils/';

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
  const { tasks } = useAppSelector<{ tasks: Task[] }>(
    (state) => state.tasks
  );
  const { selectedProjectId: projectId } = useAppSelector<Config>(
    (state) => state.config
  );

  const [formData, setFormData] = useState<FormTaskValues>(() => {
    if (task) {
      return { ...task };
    }
    return {
      name: '',
      description: '',
      status: 'Pending',
      projectId: projectId,
    };
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

    const addEditask: Task = {
      id: task ? task.id : randomId(),
      dateAdded: new Date().toISOString(),
      ...formData,
    };

    onSubmit();

    if (task) {
      dispatch(updateTask(addEditask));
    } else {
      dispatch(addTask(addEditask));
    }

    const updatedTasks = task
      ? tasks.map((t) => (t.id === task.id ? addEditask : t))
      : [...tasks, addEditask];

    const updatedTimeSpent = calculateProjectTimeSpent(updatedTasks);

    dispatch(
      updateProjectTimeSpent({
        projectId: tasks[0].projectId!,
        timeSpent: updatedTimeSpent,
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

      {formData.status === 'Done' && (
        <TimeSpentField
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
      )}

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
