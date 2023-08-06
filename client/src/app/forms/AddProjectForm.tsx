import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { nanoid } from 'nanoid';
import { addProject } from 'app/store/slices';
import { Project } from 'app/types/types';
import { useAppDispatch } from 'app/custom-hooks';

interface AddProjectFormProps {
  onSubmit: () => void;
}

interface FormProjectValues
  extends Omit<Project, 'id' | 'dateAdded' | 'timeSpent'> {
  name: string;
  description?: string;
  client: string;
  deadline: string;
}

const AddProjectForm: FC<AddProjectFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormProjectValues>({
    name: '',
    description: '',
    client: '',
    deadline: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormProjectValues, string>>
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
    const newErrors: Partial<
      Record<keyof FormProjectValues, string>
    > = {};

    if (!formData.name) {
      newErrors.name = 'Project name is required.';
    }

    if (!formData.deadline) {
      newErrors.deadline = 'Select a deadline.';
    }

    const today = new Date();
    const selectedDeadline = new Date(formData.deadline);
    if (selectedDeadline < today) {
      newErrors.deadline = 'The deadline cannot be in the past.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    // Create a new Project object using the properties from the formData
    const newProject: Project = {
      id: nanoid(),
      dateAdded: new Date().toISOString(),
      ...formData,
      deadline: new Date(formData.deadline).toISOString(),
    };

    onSubmit();

    dispatch(addProject(newProject));

    setFormData({
      name: '',
      description: '',
      client: '',
      deadline: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='name'
        >
          Project Name
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
          htmlFor='client'
        >
          Client
        </label>
        <select
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
          id='client'
          name='client'
          value={formData.client}
          onChange={handleChange}
        >
          <option value='Client 1'>Client 1</option>
          <option value='Client 2'>Client 2</option>
          <option value='Client 3'>Client 3</option>
        </select>
        {errors.client && (
          <div className='text-red-600'>{errors.client}</div>
        )}
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='deadline'
        >
          Deadline
        </label>
        <input
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500'
          type='date'
          id='deadline'
          name='deadline'
          value={formData.deadline}
          onChange={handleChange}
        />
        {errors.deadline && (
          <div className='text-red-600'>{errors.deadline}</div>
        )}
      </div>

      <button
        className='w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300'
        type='submit'
      >
        Submit
      </button>
    </form>
  );
};

export default AddProjectForm;
